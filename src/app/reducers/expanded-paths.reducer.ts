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

import { Reducer } from 'redux';
import { Actions } from '../enums/actions.enum';

const cleanse =
  (state) => Object.keys(state)
    .filter(key => !state[key])
    .forEach(key => delete state[key]);

export const expandedPaths: Reducer<any> = (state: any = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case Actions.EXPAND_PATH: {
      nextState[action.key] = true;
      break;
    }
    case Actions.COLLAPSE_PATH: {
      delete nextState[action.key];
      break;
    }
    case Actions.EXPAND_PATHS: {
      action.keys.forEach(key => nextState[key] = true);
      break;
    }
    case Actions.COLLAPSE_PATHS: {
      action.keys.forEach(key => delete nextState[key]);
      break;
    }
    default:
      return state;
  }
  return nextState;
};
