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

import { AppAction } from '../models/app-action';
import { Reducer } from 'redux';
import { GroupState } from '../classes/app-state.interface';
import { FetchGroupPayload, FetchGroupsPayload, FetchGroupUsersPayload } from '../models/service-payloads';
import { createKey, createLookupTable, popActionResult } from '../utils/state.utils';
import { Actions } from '../enums/actions.enum';
import { Group } from '../models/group.model';
import { getDefaultModelState } from '../app.utils';

export const groups: Reducer<GroupState> = (
  state = (<GroupState>getDefaultModelState({ members: {} })),
  action: AppAction
) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.CLEAR_ACTION_RESULT:
      return popActionResult<GroupState>(state, payload.key);
    case Actions.CREATE_GROUP:
    case Actions.UPDATE_GROUP: {
      const
        { group } = payload,
        operation = createKey(
          type,
          (type === Actions.CREATE_GROUP)
            ? group.name
            : group.id);
      return {
        ...state,
        loading: {
          ...state.loading,
          [operation]: true
        }
      };
    }
    case Actions.CREATE_GROUP_COMPLETE:
    case Actions.UPDATE_GROUP_COMPLETE: {
      const
        { group } = payload,
        operation = createKey(
          type.replace('_COMPLETE', ''),
          (type === Actions.CREATE_GROUP_COMPLETE)
            ? group.name
            : group.id);
      return {
        ...state,
        byId: {
          ...state.byId,
          [group.id]: group
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
    case Actions.DELETE_GROUP_COMPLETE: {
      const
        nextById = { ...state.byId },
        operation = createKey(Actions.DELETE_GROUP, payload.id);
      delete nextById[payload.id];
      return {
        ...state,
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
    case Actions.FETCH_GROUP:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.id]: true
        }
      };
    case Actions.FETCH_GROUP_COMPLETE: {
      const data: FetchGroupPayload = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [data.group.id]: data.group
        },
        loading: {
          ...state.loading,
          [payload.id]: false
        }
      };
    }
    case Actions.FETCH_GROUPS:
      return {
        ...state,
        loading: {
          ...state.loading,
          PAGE: true
        }
      };
    case Actions.FETCH_GROUPS_COMPLETE: {
      const data: FetchGroupsPayload = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          ...createLookupTable<Group>(data.groups)
        },
        loading: {
          ...state.loading,
          PAGE: false
        }
      };
    }
    case Actions.FETCH_GROUP_MEMBERS_COMPLETE: {
      const data = <FetchGroupUsersPayload>payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [createKey(Actions.FETCH_GROUP_MEMBERS, data.id)]: false
        },
        members: {
          ...state.members,
          [data.id]: data.users.map(u => u.username)
        },
        results: {
          ...state.results,
          [data.id]: data
        }
      };
    }
    case Actions.ADD_GROUP_MEMBER:
    case Actions.DELETE_GROUP_MEMBER:
      return {
        ...state,
        loading: {
          ...state.loading,
          [createKey(type, payload.id, payload.username)]: true
        }
      };
    case Actions.DELETE_GROUP:
    case Actions.ADD_GROUP_MEMBERS:
      return {
        ...state,
        loading: {
          ...state.loading,
          [createKey(type, payload.id)]: true
        }
      };
    case Actions.FETCH_GROUP_MEMBERS:
    case Actions.DELETE_GROUP_MEMBERS:
      return {
        ...state,
        loading: {
          ...state.loading,
          [createKey(type, payload.id)]: true
        }
      };
    case Actions.ADD_GROUP_MEMBER_COMPLETE:
    case Actions.ADD_GROUP_MEMBERS_COMPLETE: {
      const
        data = <FetchGroupUsersPayload>payload,
        operation = (Actions.ADD_GROUP_MEMBER_COMPLETE === type)
            ? createKey(type.replace('_COMPLETE', ''), payload.id, payload.users[0].username)
            : createKey(type.replace('_COMPLETE', ''), payload.id);
      return {
        ...state,
        loading: {
          ...state.loading,
          [operation]: false
        },
        members: {
          ...state.members,
          [data.id]: (state.members[data.id] || []).concat(data.users.map(u => u.username))
        },
        results: {
          ...state.results,
          [operation]: data
        }
      };
    }
    case Actions.DELETE_GROUP_MEMBER_COMPLETE:
    case Actions.DELETE_GROUP_MEMBERS_COMPLETE: {
      const
        data = <FetchGroupUsersPayload>payload,
        operation = (Actions.DELETE_GROUP_MEMBER_COMPLETE === type)
          ? createKey(type.replace('_COMPLETE', ''), payload.id, payload.users[0].username)
          : createKey(type.replace('_COMPLETE', ''), payload.id),
        deletedUsers = data.users.map(u => u.username);
      return {
        ...state,
        loading: {
          ...state.loading,
          [operation]: false
        },
        members: {
          ...state.members,
          [data.id]: (state.members[data.id] || []).filter(username => !deletedUsers.includes(username))
        },
        results: {
          ...state.results,
          [operation]: data
        }
      };
    }
    default:
      return state;
  }
};
