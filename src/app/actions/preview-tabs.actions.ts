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

import { AnyAction } from 'redux';
import { Injectable } from '@angular/core';
import { Actions } from '../enums/actions.enum';
import { AppState, PreviewTabCore } from '../classes/app-state.interface';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { notNullOrUndefined } from '../app.utils';

const affects: Array<keyof AppState> = ['workspaces'];

@Injectable()
export class PreviewTabsActions {

  constructor(private store: NgRedux<AppState>) {

  }

  private process(action) {
    let state = this.store.getState();
    if (notNullOrUndefined(state.activeProjectCode)) {
      action.projectCode = state.activeProjectCode;
    }
    return action;
  }

  nav(tab: PreviewTabCore): AnyAction {
    return this.process({
      type: Actions.NAVIGATE_ON_ACTIVE,
      affects,
      tab
    });
  }

  open(tab: PreviewTabCore): AnyAction {
    return this.process({
      type: Actions.OPEN_TAB,
      affects,
      tab
    });
  }

  openMany(tabs: PreviewTabCore[]): AnyAction {
    return this.process({
      type: Actions.OPEN_TABS,
      payload: tabs,
      affects
    });
  }

  openInBackground(tab: PreviewTabCore): AnyAction {
    return this.process({
      type: Actions.OPEN_TAB_BACKGROUND,
      affects,
      tab
    });
  }

  openManyInBackground(tabs: PreviewTabCore[]): AnyAction {
    return this.process({
      type: Actions.OPEN_TABS_BACKGROUND,
      payload: tabs,
      affects
    });
  }

  close(id: string): AnyAction {
    return this.process({
      type: Actions.CLOSE_TAB,
      affects,
      id
    });
  }

  select(id: string): AnyAction {
    return this.process({
      type: Actions.SELECT_TAB,
      affects,
      id
    });
  }

  checkIn(tab: PreviewTabCore): AnyAction {
    return this.process({
      type: Actions.GUEST_CHECK_IN,
      tab
    });
  }

  back(id: string) {
    return this.process({
      type: Actions.TAB_NAVIGATE_BACK,
      id
    });
  }

  forward(id: string) {
    return this.process({
      type: Actions.TAB_NAVIGATE_FORWARD,
      id
    });
  }

}
