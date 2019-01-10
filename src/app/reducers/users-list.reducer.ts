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
import { ListingViewState } from '../classes/app-state.interface';
import { FetchUsersPayload } from '../models/service-payloads';
import { AppAction } from '../models/app-action';
import { createKey } from '../utils/state.utils';
import { isNullOrUndefined } from 'util';
import { getDefaultListingViewState } from '../app.utils';

export const usersList: Reducer<ListingViewState> = (
  state = getDefaultListingViewState(),
  action: AppAction<any>
) => {
  const payload = action.payload;
  switch (action.type) {
    case Actions.FETCH_USERS: {
      const nextPage = (
        (state.query.pageSize !== payload.query.pageSize) ||
        (payload.forceUpdate)
      ) ? {} : state.page;
      return {
        ...state,
        query: payload.query,
        // If page size changed, the cached pages are no longer applicable.
        page: nextPage,
        loading: (isNullOrUndefined(nextPage[payload.query.pageIndex])) ? {
          ...state.loading,
          PAGE: true,
          [createKey('PAGE', payload.query.pageIndex)]: true
        } : state.loading
      };
    }
    case Actions.FETCH_USERS_COMPLETE: {
      const data = <FetchUsersPayload>payload;
      return {
        ...state,
        total: data.total,
        page: {
          ...state.page,
          [data.pageIndex]: data.users.map(u => u.username)
        },
        loading: {
          ...state.loading,
          PAGE: false,
          [createKey('PAGE', data.pageIndex)]: false
        }
      };
    }
    default:
      return state;
  }
};
