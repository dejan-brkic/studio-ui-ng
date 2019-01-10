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

import { AppState } from '../classes/app-state.interface';
import { AVATARS } from '../app.utils';

export const initialState: AppState = {
  explorer: undefined,
  activeProjectCode: 'editorial',
  auth: 'validated',
  user: {
    avatarUrl: AVATARS[9],
    username: 'admin',
    email: 'roy.art@craftersoftware.com',
    firstName: 'Roy',
    lastName: 'Art',
    externallyManaged: false,
    enabled: true,
    projects: null,
    groups: []
  },
  previewTabs: undefined,
  workspaces: {
    'editorial': {
      previewTabs: {
        activeId: 'TEST_TAB_ID',
        order: ['TEST_TAB_ID'],
        byId: {
          'TEST_TAB_ID': {
            id: 'TEST_TAB_ID',
            url: '/',
            title: 'Media Launcher',
            projectCode: 'launcher',
            assetId: '/site/website/index.xml',
            pending: true,
            history: null
          }
        }
      },
      selectedItems: {
        'editorial:/site/website/index.xml': true
      },
      expandedPanels: {
        'pending.panel.pages': true,
        'sidebar.projectnav.pages': true,
        'sidebar.projectnav.assets': true,
        'sidebar.appnav.panel': true,
        'pending.panel.assets': true,
        'pending.panel.templates': true
      },
      expandedPaths: {
        '/site/website/index.xml': true,
        '/static-assets/js': true
      }
    }
  },
  editSessions: {
    activeId: 'TEST_SESSION_ID_3',
    order: ['TEST_SESSION_ID_3', 'TEST_SESSION_ID_5'],
    byId: {
      'TEST_SESSION_ID_3': {
        id: 'TEST_SESSION_ID_3',
        status: 'void',
        data: null,
        assetId: 'editorial:/site/website/index.xml',
        projectCode: 'editorial',
        fetchPayload: null
      },
      'TEST_SESSION_ID_5': {
        id: 'TEST_SESSION_ID_5',
        status: 'void',
        data: {  },
        assetId: 'editorial:/static-assets/js/main.js',
        projectCode: 'editorial',
        fetchPayload: null
      }
    }
  },
  usersList: undefined,
  groupsList: undefined,
};
