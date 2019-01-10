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
import { Actions } from '../enums/actions.enum';
import { Group } from '../models/group.model';
import {
  CreateGroupPayload,
  DeletePayload,
  FetchGroupPayload,
  FetchGroupsPayload,
  FetchGroupUsersPayload
} from '../models/service-payloads';
import { Query } from '../models/query';
import { getDefaultQuery } from '../app.utils';

export function createGroup(group: Group): AppAction {
  return {
    type: Actions.CREATE_GROUP,
    payload: { group }
  };
}

export function createGroupComplete(response: CreateGroupPayload): AppAction {
  return {
    type: Actions.CREATE_GROUP_COMPLETE,
    payload: response
  };
}

export function updateGroup(group: Group): AppAction {
  return {
    type: Actions.UPDATE_GROUP,
    payload: { group }
  };
}

export function updateGroupComplete(response: CreateGroupPayload): AppAction {
  return {
    type: Actions.UPDATE_GROUP_COMPLETE,
    payload: response
  };
}

export function deleteGroup(id: number): AppAction {
  return {
    type: Actions.DELETE_GROUP,
    payload: { id }
  };
}

export function deleteGroupComplete(response: DeletePayload): AppAction {
  return {
    type: Actions.DELETE_GROUP_COMPLETE,
    payload: response
  };
}

export function fetchGroup(id: number): AppAction {
  return {
    type: Actions.FETCH_GROUP,
    payload: { id }
  };
}

export function fetchGroupComplete(response: FetchGroupPayload): AppAction {
  return {
    type: Actions.FETCH_GROUP_COMPLETE,
    payload: response
  };
}

export function fetchGroups(query: Query = getDefaultQuery(), forceUpdate: boolean = false): AppAction {
  return {
    type: Actions.FETCH_GROUPS,
    payload: { query, forceUpdate }
  };
}

export function fetchGroupsComplete(response: FetchGroupsPayload): AppAction {
  return {
    type: Actions.FETCH_GROUPS_COMPLETE,
    payload: response
  };
}

export function fetchGroupMembers(id: number): AppAction {
  return {
    type: Actions.FETCH_GROUP_MEMBERS,
    payload: { id }
  };
}

export function fetchGroupMembersComplete(response: FetchGroupUsersPayload): AppAction<FetchGroupUsersPayload> {
  return {
    type: Actions.FETCH_GROUP_MEMBERS_COMPLETE,
    payload: response
  };
}

export function addGroupMember(groupId: number, username: string): AppAction {
  return {
    type: Actions.ADD_GROUP_MEMBER,
    payload: { id: groupId, username }
  };
}

export function addGroupMemberComplete(response: FetchGroupUsersPayload): AppAction {
  return {
    type: Actions.ADD_GROUP_MEMBER_COMPLETE,
    payload: response
  };
}

export function addGroupMembers(groupId: number, usernames: string[]): AppAction {
  return {
    type: Actions.ADD_GROUP_MEMBERS,
    payload: { id: groupId, usernames }
  };
}

export function addGroupMembersComplete(response: FetchGroupUsersPayload): AppAction {
  return {
    type: Actions.ADD_GROUP_MEMBERS_COMPLETE,
    payload: response
  };
}

export function deleteGroupMember(groupId: number, username: string): AppAction {
  return {
    type: Actions.DELETE_GROUP_MEMBER,
    payload: { id: groupId, username }
  };
}

export function deleteGroupMemberComplete(response: FetchGroupUsersPayload): AppAction {
  return {
    type: Actions.DELETE_GROUP_MEMBER_COMPLETE,
    payload: response
  };
}

export function deleteGroupMembers(groupId: number, usernames: string[]): AppAction {
  return {
    type: Actions.DELETE_GROUP_MEMBERS,
    payload: { id: groupId, usernames }
  };
}

export function deleteGroupMembersComplete(response: FetchGroupUsersPayload): AppAction {
  return {
    type: Actions.DELETE_GROUP_MEMBERS_COMPLETE,
    payload: response
  };
}
