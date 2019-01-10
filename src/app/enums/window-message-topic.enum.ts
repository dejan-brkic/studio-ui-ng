
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

export enum WindowMessageTopicEnum {

  ALL = 'ALL',

  GUEST_CHECK_IN = 'GUEST_CHECK_IN',
  GUEST_LOAD_EVENT = 'GUEST_LOAD_EVENT',

  HOST_ICE_START_REQUEST = 'HOST_ICE_START_REQUEST',
  HOST_END_ICE_REQUEST = 'HOST_END_ICE_REQUEST',
  HOST_RELOAD_REQUEST = 'HOST_RELOAD_REQUEST',
  HOST_NAV_REQUEST = 'HOST_NAV_REQUEST',

  NAV_REQUEST = 'NAV_REQUEST',

  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_UPDATED = 'PROJECT_UPDATED',
  PROJECT_DELETED = 'PROJECT_DELETED'

}
