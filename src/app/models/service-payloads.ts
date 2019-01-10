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

import { User } from './user.model';
import { Group } from './group.model';
import { Project } from './project.model';

export interface APIResponse {
  code: number;
  message: string;
  remedialAction: string;
  documentationURL: string;
}

export interface APIResponsePayload {
  response: APIResponse;
}

export interface DeletePayload {
  id: number | string;
  response: APIResponse;
}

export interface BulkDeletePayload {
  ids: Array<number | string>;
  response: APIResponse;
}

export interface PagedPayload {
  total: number;
  pageSize: number;
  pageIndex: number;
}

export interface BasicUsersPayload {
  users: User[];
  response: APIResponse;
}

export interface FetchUsersPayload extends BasicUsersPayload, PagedPayload {

}

export interface FetchUserPayload {
  id: number | string;
  user: User;
  response: APIResponse;
}

export interface CreateUserPayload {
  user: User;
  response: APIResponse;
}

export interface CreateGroupPayload {
  group: Group;
  response: APIResponse;
}

export interface BasicGroupsPayload {
  groups: Group[];
  response: APIResponse;
}

export interface FetchGroupsPayload extends PagedPayload, BasicGroupsPayload {

}

export interface FetchGroupPayload {
  id: number;
  group: Group;
  response: APIResponse;
}

export interface FetchGroupUsersPayload extends APIResponsePayload {
  id: number;
  users: User[];
}

export interface FetchProjectPayload {
  code: string;
  project: Project;
  response: APIResponse;
}
