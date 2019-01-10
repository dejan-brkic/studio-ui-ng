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

import { Asset } from '../models/asset.model';
import { SignedAction } from '../classes/signed-action.interface';
import { Actions } from '../enums/actions.enum';
import { AppState } from '../classes/app-state.interface';

const affects: Array<keyof AppState> = ['workspaces'];

export class SelectedItemsActions {
  static affects = affects;

  static select(id: string, projectCode: string): SignedAction {
    return {
      type: Actions.SELECT_ITEM,
      affects,
      projectCode,
      id
    };
  }

  static deselect(id: string, projectCode: string): SignedAction {
    return {
      type: Actions.DESELECT_ITEM,
      affects,
      projectCode,
      id
    };
  }

  static selectMany(ids: string[], projectCode: string): SignedAction {
    return {
      type: Actions.SELECT_ITEMS,
      affects,
      projectCode,
      ids
    };
  }

  static deselectMany(ids: string[], projectCode: string): SignedAction {
    return {
      type: Actions.DESELECT_ITEMS,
      affects,
      projectCode,
      ids
    };
  }
}
