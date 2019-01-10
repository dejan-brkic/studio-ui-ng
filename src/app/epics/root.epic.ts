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
import { ProjectEpics } from './project.epics';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, switchMap } from 'rxjs/operators';
import { isArray } from 'util';
import { InterceptorEpics } from './interceptor.epics';
import { AssetEpics } from './asset.epics';
import { UserEpics } from './user.epics';
import { GroupEpics } from './group.epics';

@Injectable()
export class RootEpic {

  static createEpic(type, mapProject, useSwitchMap = true) {
    type = isArray(type) ? type : [type];
    return (action$, store, dependencies) => action$.pipe(
      ofType(...type),
      useSwitchMap
        ? switchMap((action) => mapProject(action, store, dependencies, action$))
        : mergeMap((action) => mapProject(action, store, dependencies, action$))
    );
  }

  constructor(private projectEpics: ProjectEpics,
              private interceptor: InterceptorEpics,
              private assetEpics: AssetEpics,
              private userEpics: UserEpics,
              private groupEpics: GroupEpics) {

  }

  epic() {
    return combineEpics(...[].concat(
      this.projectEpics.epics(),
      this.assetEpics.epics(),
      this.userEpics.epics(),
      this.groupEpics.epics(),
      this.interceptor.epics()
    ));
  }

}
