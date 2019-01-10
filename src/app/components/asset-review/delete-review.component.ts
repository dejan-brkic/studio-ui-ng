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

import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { NgRedux } from '@angular-redux/store';
import { AppState, LookupTable } from '../../classes/app-state.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { notNullOrUndefined } from '../../app.utils';
import { AssetActions } from '../../actions/asset.actions';
import { showSnackBar } from '../../utils/material.utils';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { WorkflowStatusEnum } from '../../enums/workflow-status.enum';
import { DependencyReviewBase } from '../../classes/dependency-review-base.class';
import { Asset } from '../../models/asset.model';

@Component({
  selector: 'std-delete-review',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.scss']
})
export class DeleteReviewComponent extends DependencyReviewBase implements OnInit {

  constructor(store: NgRedux<AppState>,
              route: ActivatedRoute,
              actions: AssetActions,
              private contentService: ContentService,
              private snackBar: MatSnackBar,
              private translate: TranslateService) {
    super(store, route, actions);
  }

  switchAndMap() {
    return switchMap((ids: string[]) => this.contentService.dependants(ids, true));
  }

  assetChecked($event, assetId) {
    let { checked, data } = this;
    checked[assetId] = $event;
    if ($event) {
      let dependants = data.dependantIdsLookup;
      if (notNullOrUndefined(dependants[assetId])) {
        this.parentChecked($event, assetId);
      }
    } else {

      let entries = data.entries;
      let deselected = [];

      entries.forEach((entry) => {
        if (
          entry.dependantIds.includes(assetId) &&
          checked[entry.assetId]) {
          checked[entry.assetId] = false;
          deselected.push({
            parent: data.assetLookup[entry.assetId].label,
            child: data.assetLookup[assetId].label
          });
          if (assetId in data.dependantIdsLookup) {
            data.dependantIdsLookup[assetId].forEach((id) => {
              checked[id] = false;
            });
          }
        }
      });

      let message = deselected.map(desc => this.translate.instant('{{parent}} has been deselected', desc));
      message.length && message.push('You may delete children without their parent but not vise-versa.');

      showSnackBar(
        this.snackBar,
        this.translate.instant(message.join('. ')),
        this.translate.instant('Ok'));

    }
  }

  parentChecked($event, assetId) {
    this.checked[assetId] = $event;
    if ($event) {
      let dependants = this.data.dependantIdsLookup;
      dependants[assetId]
        .forEach((id) => {
          this.checked[id] = true;
        });
    }
  }

  getAssetLookupTable(): LookupTable<Asset> {
    return this.data.assetLookup;
  }

  submit() {
    let { checked, translate, data } = this;
    let ids = Object.keys(checked).filter(id => checked[id]);
    if (ids.length) {
      this.loading = true;
      this.contentService.delete(ids)
        .subscribe((result) => {

          let assets = data.assetLookup;

          ids
          // TODO: need the socket working to do this right. Other wise need to request again :(
            .forEach(id => {
              if (assets[id].workflowStatus.indexOf('EXISTING')) {
                assets[id].workflowStatus = WorkflowStatusEnum.EXISTING_DELETED;
              } else {
                assets[id].workflowStatus = WorkflowStatusEnum.NEW_DELETED;
              }
            });

          this.notifyAssetLoaded(Object.values(assets));

          showSnackBar(this.snackBar, result.message);
          this.finished = true;
          this.loading = false;

        });
    } else {
      showSnackBar(this.snackBar, translate.instant('Nothing selected'));
    }
  }

}
