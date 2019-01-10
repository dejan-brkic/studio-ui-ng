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
import { v4 } from 'uuid';
import { Actions } from '../enums/actions.enum';
import { EditSessions } from '../classes/app-state.interface';
import { isNullOrUndefined } from 'util';

export const editSessions: Reducer<EditSessions> = (state = {
  activeId: null,
  order: [],
  byId: {}
}, action) => {
  switch (action.type) {

    case Actions.EDIT_ASSETS: {

      break;
    }

    case Actions.EDIT_ASSET: {
      let assetId = action.payload.assetId;
      let projectCode = action.payload.projectCode;
      let existing = Object.values(state.byId).find(session => (
        session.assetId === assetId &&
        session.projectCode === projectCode
      ));
      if (existing) {
        if (state.activeId === existing.id) {
          return state;
        }
        return {
          ...state,
          activeId: existing.id
        };
      } else {
        let sessionUUID = v4();
        return {
          ...state,
          activeId: sessionUUID,
          order: state.order.concat(sessionUUID),
          byId: {
            ...state.byId,
            [sessionUUID]: {
              id: sessionUUID,
              data: null,
              fetchPayload: null,
              status: 'void',
              projectCode,
              assetId
            }
          }
        };
      }
    }

    case Actions.FETCH_ASSET_FOR_EDIT: {
      let sessionUUID = action.payload.sessionUUID;
      if (isNullOrUndefined(sessionUUID)) {
        return state;
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          [sessionUUID]: {
            ...state.byId[sessionUUID],
            status: 'fetching'
          }
        }
      };
    }

    case Actions.ASSET_FETCHED_FOR_EDIT: {
      let sessionUUID = action.payload.sessionUUID;
      return {
        ...state,
        byId: {
          ...state.byId,
          [sessionUUID]: {
            ...state.byId[sessionUUID],
            fetchPayload: action.payload.data,
            status: 'fetched'
          }
        }
      };
    }

    case Actions.UPDATE_EDIT_SESSION: {
      let session = state.byId[action.payload.id];
      return updateOne(state, {
        ...session,
        status: (action.payload.hasChanges ? 'dirty' : 'fetched'),
        data: { ...action.payload.data }
      });
    }

    case Actions.PERSIST_SESSION_CHANGES: {
      return updateOne(state, { ...action.payload.session, status: 'saving' });
    }

    case Actions.SESSION_CHANGES_PERSISTED: {
      return updateOne(state, { ...action.payload.session, status: 'fetched' });
    }

    case Actions.CHANGE_ACTIVE_EDIT_SESSION: {
      let next = action.payload.next;
      return {
        ...state,
        activeId: next.id
      };
    }

    case Actions.CLOSE_EDIT_SESSION: {
      let id = action.payload.session.id;
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            status: 'closing'
          }
        }
      };
    }

    case Actions.EDIT_SESSION_CLOSED: {
      let id = action.payload.session.id;
      let index = state.order.findIndex(sid => sid === id);
      let nextOrder = state.order.slice(0, index).concat(state.order.slice(index + 1));
      let nextActiveId;
      if (state.activeId !== id) {
        nextActiveId = state.activeId;
      } else if (nextOrder.length === 0) {
        nextActiveId = null;
      } else {
        if (index === -1) {
          // This should never happen, really. The session ID
          // sent should always be found
          console.error(`Invalid session id '${id}' sent to edit sessions reducer`);
          return state;
        }
        nextActiveId = nextOrder[index === 0 ? 0 : (index - 1)];
      }
      let sessions = { ...state.byId };
      delete sessions[id];
      return {
        ...state,
        activeId: nextActiveId,
        byId: sessions,
        order: nextOrder
      };
    }

    default:
      return state;

  }
};

function updateOne(state, session) {
  let id = session.id;
  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...session,
        data: { ...session.data }
      }
    }
  };
}
