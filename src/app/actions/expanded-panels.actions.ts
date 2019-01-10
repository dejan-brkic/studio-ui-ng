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

import { AppState } from '../classes/app-state.interface';
import { SignedAction } from '../classes/signed-action.interface';
import { Actions } from '../enums/actions.enum';

const affects: Array<keyof AppState> = ['workspaces'];

export class ExpandedPanelsActions {
  static affects = affects;

  static expand(key: string, projectCode: string): SignedAction {
    return { type: Actions.EXPAND_PANEL, affects, key, projectCode };
  }

  static collapse(key: string, projectCode: string): SignedAction {
    return { type: Actions.COLLAPSE_PANEL, affects, key, projectCode };
  }

  static expandMany(keys: Array<string>, projectCode: string): SignedAction {
    return { type: Actions.EXPAND_PANELS, affects, keys, projectCode };
  }

  static collapseMany(keys: Array<string>, projectCode: string): SignedAction {
    return { type: Actions.COLLAPSE_PANELS, affects, keys, projectCode };
  }
}
