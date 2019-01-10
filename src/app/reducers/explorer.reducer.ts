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

import { AnyAction, Reducer } from 'redux';
import { Actions } from '../enums/actions.enum';
import { ExplorerState } from '../classes/app-state.interface';
import { Project } from '../models/project.model';
import { Asset } from '../models/asset.model';
import { notNullOrUndefined } from '../app.utils';
import { AssetTypeEnum } from '../enums/asset-type.enum';

export const explorer: Reducer<ExplorerState> = (state = {
  activeProjectCode: null,
  byProject: {}
}, action: AnyAction) => {
  switch (action.type) {

    case Actions.EXPLORER_SELECT_PROJECT: {
      let code = action.payload.projectCode;
      let container = state.byProject[code] || {};
      return {
        activeProjectCode: code,
        byProject: {
          ...state.byProject,
          [code]: {
            asset: notNullOrUndefined(container.asset) ? container.asset : null,
            paths: ((notNullOrUndefined(container) && notNullOrUndefined(container.paths))
              ? container.paths
              : [`${code}:${action.payload.root}`])
          }
        }
      };
    }

    case Actions.EXPLORER_SELECT_PATH:
    case Actions.EXPLORER_SELECT_ASSET: {

      let asset: Asset = action.payload.asset;
      let code = state.activeProjectCode;
      let container = state.byProject[code] || {};

      let id = asset.id;
      let pathId = id.replace('/index.xml', '');
      let paths = container.paths;
      let parent = pathId.substr(0, pathId.lastIndexOf('/'));

      let isFolder = asset.type === AssetTypeEnum.FOLDER;

      if (parent === `${asset.projectCode}:`) {
        parent = `${asset.projectCode}:/`;
      }

      let index = paths.findIndex((path) => path === parent);
      paths = paths.slice(0, (index + 1)).concat(pathId);

      if (!isFolder) {
        paths.pop();
      }

      return {
        ...state,
        byProject: {
          ...state.byProject,
          [code]: {
            ...container,
            paths: paths,
            asset: isFolder ? null : id
          }
        }
      };

    }

    default:
      return state;

  }
};
