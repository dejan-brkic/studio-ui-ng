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
import { User } from '../models/user.model';
import { ModelState } from '../classes/app-state.interface';
import { FetchUserPayload, FetchUsersPayload } from '../models/service-payloads';
import { AppAction } from '../models/app-action';
import { popActionResult, createLookupTable, createKey } from '../utils/state.utils';
import { getDefaultModelState, isSuccessResponse } from '../app.utils';

export const users: Reducer<ModelState<User>> = (state = getDefaultModelState(), action: AppAction) => {
  const payload = action.payload;
  switch (action.type) {
    case Actions.CLEAR_ACTION_RESULT:
      return popActionResult(state, payload.key);
    case Actions.UPDATE_USER:
    case Actions.CREATE_USER: {
      const
        { user } = payload,
        operation = createKey(action.type, user.username);
      return {
        ...state,
        loading: {
          ...state.loading,
          [operation]: true
        }
      };
    }
    case Actions.CREATE_USER_COMPLETE:
    case Actions.UPDATE_USER_COMPLETE: {
      const
        { user } = payload,
        operation = createKey(action.type.replace('_COMPLETE', ''), user.username);
      return {
        ...state,
        byId: {
          ...state.byId,
          [user.username]: user
        },
        loading: {
          ...state.loading,
          [operation]: false
        },
        results: {
          ...state.results,
          [operation]: payload
        }
      };
    }
    case Actions.DELETE_USER: {
      const operation = createKey(action.type, payload.id);
      return {
        ...state,
        loading: {
          ...state.loading,
          [operation]: true
        }
      };
    }
    case Actions.DELETE_USER_COMPLETE: {
      const nextById = { ...state.byId };
      const operation = createKey(Actions.DELETE_USER, payload.id);
      delete nextById[payload.id];
      return {
        ...state,
        byId: nextById,
        loading: {
          ...state.loading,
          [operation]: false
        },
        results: {
          ...state.results,
          [operation]: payload
        }
      };
    }
    case Actions.FETCH_USER:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.id]: true
        }
      };
    case Actions.FETCH_USER_COMPLETE: {
      const { user, response } = <FetchUserPayload>payload;
      return {
        ...state,
        byId: isSuccessResponse(response) ? {
          ...state.byId,
          [user.username]: user
        } : state.byId,
        loading: {
          ...state.loading,
          [user.username]: false
        },
        results: {
          ...state.results,
          [user.username]: payload
        }
      };
    }
    // case Actions.FETCH_USERS:
    //   When a page has been preloaded the FETCH_USERS_COMPLETE
    //   wouldn't get dispatched. Getting rid of this action handler since
    //   wouldn't have means of setting the loading to false.
    //   return {
    //       ...state,
    //       loading: {
    //         ...state.loading,
    //         PAGE: true
    //       }
    //     };
    case Actions.FETCH_USERS_COMPLETE: {
      const data: FetchUsersPayload = payload;
      return {
        ...state,
        // See explanation above
        // loading: {
        //   ...state.loading,
        //   PAGE: false
        // },
        byId: {
          ...state.byId,
          ...createLookupTable<User>(data.users, 'username')
        }
      };
    }
    default:
      return state;
  }
};
