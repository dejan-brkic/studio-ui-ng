/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Injectable } from '@angular/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions } from '../enums/actions.enum';
import { WorkflowService } from '../services/workflow.service';
import { AssetActions } from '../actions/asset.actions';
import { RootEpic } from './root.epic';
import { ContentService } from '../services/content.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Asset } from '../models/asset.model';
import { isArray } from 'util';
import { BaseEpic } from './base-epic';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AssetEpics extends BaseEpic {

  protected manifest = [
    'get',
    'some',
    'recallForEdit',
    'closeEditSession',
    'persistSessionChanges'
  ];

  constructor(private workflow: WorkflowService,
              private content: ContentService,
              private actions: AssetActions) {
    super();
  }

  private get = RootEpic.createEpic(
    Actions.FETCH_ASSET,
    ({ payload }) => {
      return this.content
        .byId(payload.id)
        .pipe(
          map(this.actions.gotten),
          catchError((error, caught) => of(this.actions.getError(payload.id)))
        );
    }, false);

  private recallForEdit = RootEpic.createEpic(
    Actions.FETCH_ASSET_FOR_EDIT,
    ({ payload }) => {
      let { assetId, sessionUUID } = payload;
      return forkJoin([
          this.content.read(assetId, true),
          this.content.byId(assetId)
        ])
        .pipe(
          switchMap((responses: any[]) => {
            let asset: Asset = responses[1];
            let { content } = responses[0];
            return [
              this.actions.gotten(asset),
              this.actions.fetchedForEdit(sessionUUID, content)
            ];
          })
        );
    });

  private closeEditSession = RootEpic.createEpic(
    Actions.CLOSE_EDIT_SESSION,
    ({ payload }) => {
      if (payload.content) {
        return this.content
          .write(payload.asset, payload.content, true)
          .pipe(map(_ => this.actions.editSessionClosed(payload.session)));
      } else {
        return this.content
          .unlock(payload.asset)
          .pipe(switchMap(asset => [
            this.actions.editSessionClosed(payload.session),
            this.actions.gotten(asset)
          ]));
      }
    });

  private some = RootEpic.createEpic(
    Actions.FETCH_SOME_ASSETS,
    ({ payload }) => {
      if (isArray(payload)) {
        return forkJoin(payload.map(obj => this.content.byId(obj.assetId)))
          .pipe(map((results: Asset[]) => this.actions.fetchedMany(<Asset[]>results)));
      }
    });

  private persistSessionChanges = RootEpic.createEpic(
    Actions.PERSIST_SESSION_CHANGES,
    ({ payload }) => {
      return this.content
        .write(payload.asset, payload.content)
        .pipe(
          switchMap((asset) => [
            this.actions.gotten(asset),
            this.actions.sessionChangesPersisted({ ...payload.session, fetchPayload: payload.content })
          ])
        );
    });

}
