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
import { Actions } from '../enums/actions.enum';

export const selectedItems: Reducer<{ [key: string]: boolean }> = (state = {}, action: AnyAction) => {
  switch (action.type) {

    case Actions.SELECT_ITEM:
      return {
        ...state,
        [action.id]: true
      };

    case Actions.DESELECT_ITEM: {
      let nextState = { ...state };
      delete nextState[action.id];
      return nextState;
    }

    case Actions.SELECT_ITEMS: {
      let nextState =  { ...state };
      action.ids.forEach(id => nextState[id] = true);
      return nextState;
    }

    case Actions.DESELECT_ITEMS: {
      return Object.keys(state).reduce((nextState, key) => {
        delete nextState[key];
        return nextState;
      }, { ...state });
    }

    default:
      return state;
  }
};
