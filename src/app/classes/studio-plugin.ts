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

import { AnyAction, Store } from 'redux';
import { AppState } from './app-state.interface';
import { NgRedux } from '@angular-redux/store';

export class StudioPluginHost {
  constructor(private store: Store<AppState>) {

  }

  getState(): AppState {
    return this.store.getState();
  }

  dispatch(action: AnyAction) {
    this.store.dispatch(action);
  }

  subscribe(subscriber: () => void) {
    return this.store.subscribe(subscriber);
  }

  select<T>(selector, comparator) {
    return (<NgRedux<AppState>>this.store).select<T>(selector, comparator);
  }
}
