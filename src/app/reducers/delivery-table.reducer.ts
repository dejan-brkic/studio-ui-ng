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

import { AnyAction, Reducer } from 'redux';
import { isNullOrUndefined } from 'util';
import { Actions } from '../enums/actions.enum';

export const deliveryTable: Reducer<{ [key: string]: any }> = (state = {}, action: AnyAction) => {
  if (isNullOrUndefined(action.spaceUID)) {
    return state;
  } else {
    if (isNullOrUndefined(state[action.spaceUID]) || !action.isResponse) {
      return { ...state, [action.spaceUID]: '@@PENDING' };
    } else {
      switch (action.type) {
        case Actions.FETCH_SOME_ASSETS: {
          let assets = action.resultSelector ? action.resultSelector(action.payload) : action.payload;
          return { ...state, [action.spaceUID]: assets };
        }
        default:
          return { ...state, [action.spaceUID]: action.payload };
      }

    }
  }
};
