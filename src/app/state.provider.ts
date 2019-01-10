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

import { InjectionToken } from '@angular/core';
import { SubjectStore } from './classes/subject-store.class';
import { StudioHttpService } from './services/http.service';
import { AppState } from '../app/classes/app-state.interface';
import { fromState} from './app.store';
import { Actions } from './enums/actions.enum';
import { combineReducers } from 'redux';
import { initialState } from './utils/initial-state.utils';
import { reducerMap } from './reducers/root.reducer';

export const appStoreFactory = (http: StudioHttpService): SubjectStore<AppState> => {
  let helper = combineReducers<any>(reducerMap);
  let store = fromState(helper(initialState, { type: Actions.STUDIO_INIT }));
  return new SubjectStore(store);
};

// export const appStoreFactory = (http: StudioHttpService): Store<AppState> => {
//     return fromState(initialState);
// };

export const AppStore = new InjectionToken('App.store');

export const AppStoreProvider = [
  {
    provide: AppStore,
    useFactory: appStoreFactory,
    deps: [StudioHttpService]
  }
];
