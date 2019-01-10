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

import { Injectable } from '@angular/core';
import { AnyAction } from 'redux';
import { Actions } from '../enums/actions.enum';
import { Project } from '../models/project.model';
import { FetchProjectPayload } from '../models/service-payloads';

@Injectable()
export class ProjectActions {

  select(code): AnyAction {
    return {
      type: Actions.SELECT_PROJECT,
      code
    };
  }

  deselect(code): AnyAction {
    return {
      type: Actions.DESELECT_PROJECT,
      code
    };
  }

  fetch(query?): AnyAction {
    return {
      type: Actions.FETCH_PROJECTS,
      query
    };
  }

  fetched(projects): AnyAction {
    return {
      type: Actions.PROJECTS_FETCHED,
      projects
    };
  }

  create(project: Project): AnyAction {
    return {
      type: Actions.CREATE_PROJECT,
      project
    };
  }

  created(project: Project): AnyAction {
    return {
      type: Actions.PROJECT_CREATED,
      project
    };
  }

  update(project: Project): AnyAction {
    return {
      type: Actions.UPDATE_PROJECT,
      project
    };
  }

  updated(project: Project): AnyAction {
    return {
      type: Actions.PROJECT_UPDATED,
      project
    };
  }

  delete(project: Project): AnyAction {
    return {
      type: Actions.DELETE_PROJECT,
      project
    };
  }

  deleted(project: Project): AnyAction {
    return {
      type: Actions.PROJECT_DELETED,
      project
    };
  }

}

export function fetchProject(code: string) {
  return {
    type: Actions.FETCH_PROJECT
  };
}

export function fetchProjectComplete(data: FetchProjectPayload) {
  return {
    type: Actions.PROJECT_FETCHED,
    payload: data
  };
}
