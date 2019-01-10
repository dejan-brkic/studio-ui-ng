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
import { isNullOrUndefined } from 'util';

const addOne = (state, key) => {
  return isNullOrUndefined(state[key])
    ? { ...state, [key]: true }
    : state;
};

const removeOne = (state, key) => {
  let newState = {
    ...state
  };
  delete newState[key];
  return newState;
};

// export const reducer: Reducer<Array<ExpansionPanelIdentifierKeys>> = (state = [], action) => {
export const expandedPanels: Reducer<{ [key: string]: boolean }> = (state = {}, action) => {
  switch (action.type) {

    case Actions.EXPAND_PANEL:
      return addOne(state, action.key);

    case Actions.COLLAPSE_PANEL:
      return removeOne(state, action.key);

    case Actions.EXPAND_PANELS:
      return action.keys.reduce((nextState, key) => {
        nextState[key] = true;
        return nextState;
      }, { ...state });

    case Actions.COLLAPSE_PANELS: {
      return action.keys.reduce((nextState, key) => {
        delete nextState[key];
        return nextState;
      }, { ...state });
    }

    default:
      return state;

  }
};
