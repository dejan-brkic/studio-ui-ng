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

import { NgRedux } from '@angular-redux/store';
import { AppState } from './app-state.interface';
import { ComponentBase } from './component-base.class';

export class WithNgRedux extends ComponentBase {

  get state(): AppState {
    return this.store.getState();
  }

  constructor(protected store: NgRedux<AppState>) {
    super();
  }

  protected select<T>(...args) {
    return this.store.select<T>(...args);
  }

  protected dispatch(action) {
    this.store.dispatch(action);
  }

}
