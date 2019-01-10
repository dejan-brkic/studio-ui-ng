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

import { AppState, Settings } from '../classes/app-state.interface';
import { SignedAction } from '../classes/signed-action.interface';
import { Actions } from '../enums/actions.enum';

const affects: Array<keyof AppState> = ['settings'];

export class SettingsActions {

  static updateOne(key: keyof Settings, value: any): SignedAction {
    return { affects, type: Actions.UPDATE_SETTINGS, payload: { key, value } };
  }

  static updateMany(nextSettings): SignedAction {
    return { affects, type: Actions.UPDATE_SETTINGS, payload: nextSettings };
  }

  static toggleSideBar(): SignedAction {
    return { affects, type: Actions.TOGGLE_SIDEBAR };
  }

  static toggleSideBarFolded(): SignedAction {
    return { affects, type: Actions.TOGGLE_SIDEBAR_FOLD };
  }

}
