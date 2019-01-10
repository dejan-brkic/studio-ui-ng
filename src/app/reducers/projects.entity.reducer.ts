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
import { StateEntity } from '../classes/app-state.interface';
import { Project } from '../models/project.model';
import { createEntityState, createLookupTable } from '../utils/state.utils';

export const projects: Reducer<StateEntity<Project>> =
  (state = createEntityState({}), action: AnyAction): StateEntity<Project> => {
    switch (action.type) {

      case Actions.FETCH_PROJECTS:
        return ({
          ...state,
          loading: { ...state.loading, all: true },
          byId: state.byId
        });

      case Actions.PROJECTS_FETCHED:
        return ({
          ...state,
          loading: { ...state.loading, all: false },
          byId: createLookupTable(action.projects, 'code')
        });

      case Actions.PROJECTS_FETCH_ERROR:
        return {
          ...state,
          error: { ...state.error, all: new Error('') }
        };

      case Actions.FETCH_PROJECT:
        return state;

      case Actions.CREATE_PROJECT:
        return state;

      case Actions.UPDATE_PROJECT:
        return state;

      case Actions.DELETE_PROJECT:
        return state;

      case Actions.PROJECT_CREATED:
        return state;

      case Actions.PROJECT_UPDATED:
        return state;

      case Actions.PROJECT_DELETED:
        return state;

      default:
        return state;

    }
  };
