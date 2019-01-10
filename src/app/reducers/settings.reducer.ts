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
import { Settings } from '../classes/app-state.interface';
import { Actions } from '../enums/actions.enum';

// TODO: Should this really be in the state?
const DEFAULTS: Settings = {
  metaClickOpenTabInBackground: true,
  layout: 'contained',
  containedLayoutMax: 2000,
  nativeScrollbars: false,
  viewAnimation: 'fadeIn',
  topBarTheme: 'white',
  topBarThemeHue: '500',
  topBarPosition: 'top',
  topBarShown: false,
  navBarTheme: 'main',
  navBarThemeHue: '500',
  navBarShown: true,
  navBarPosition: 'left',
  navBarMinimised: false,
  footerShown: false,
  footerTheme: 'mat-black-500-bg',
  footerPosition: 'inline'
};

export const settings: Reducer<Settings> = (state = DEFAULTS, action) => {
  switch (action.type) {
    case Actions.UPDATE_SETTINGS:
      return {
        ...state,
        ...action.payload
      };
    case Actions.UPDATE_SETTING:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    case Actions.TOGGLE_SIDEBAR:
      return {
        ...state,
        navBarShown: !state.navBarShown
      };
    case Actions.TOGGLE_SIDEBAR_FOLD:
      return {
        ...state,
        navBarMinimised: !state.navBarMinimised
      };
    default:
      return state;
  }
};
