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
import { Actions } from '../enums/actions.enum';
import { RootEpic } from './root.epic';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewTabCore } from '../classes/app-state.interface';
import { BaseEpic } from './base-epic';
import { never } from 'rxjs/observable/never';

@Injectable()
export class InterceptorEpics extends BaseEpic {

  protected manifest: string[] = [
    'navigation',
    'editAsset'
  ];

  constructor(private router: Router,
              private route: ActivatedRoute) {
    super();
  }

  private navigation = RootEpic.createEpic(
    [
      Actions.NAVIGATE_ON_ACTIVE,
      Actions.OPEN_TAB,
      Actions.OPEN_TABS
    ],
    (tab: PreviewTabCore) => {
      let router = this.router;
      if (!router.url.includes('/preview')) {
        router.navigate([`/preview`]);
      }
      return never();
    });

  private editAsset = RootEpic.createEpic(
    Actions.EDIT_ASSET,
    () => {
      let router = this.router;
      if (!router.url.includes('/edit')) {
        router.navigate([`/edit`]);
      }
      return never();
    });

}

// Could do something like below but don't really need to
// do anything with the router's navigation promise resolution
// return PromiseObservable
//   .create(router.navigate([`/preview`]))
//   .pipe(ignoreElements());
