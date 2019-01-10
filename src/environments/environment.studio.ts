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

import { Environment } from './environment.interface';

export const environment: Environment = {

  production: false,

  url: {
    app: '/studio/static-assets/alpha',
    api: '/studio/api/1/services/api/1',
    assets: '/studio/static-assets/alpha/assets',
    preview: 'http://localhost:8080'
  },

  cfg: {
    timeout: 600000 // ten minutes
  },

  // TODO: change all references to use environment.url
  appUrl: '/app',
  assetsUrl: '/assets',
  // http://docs.craftercms.org/en/latest/developers/projects/studio/api/index.html
  apiUrl: '/studio/api/1/services/api/1',

  apiVersion: 'v3',

  preview: {
    cookie: 'crafterSite'
  },

  auth: {
    header: 'X-XSRF-TOKEN',
    cookie: 'XSRF-TOKEN'
  }

}
