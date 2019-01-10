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
import { map } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';
import { ProjectActions } from '../actions/project.actions';
import { Actions } from '../enums/actions.enum';
import { Project } from '../models/project.model';
import { RootEpic } from './root.epic';
import { BaseEpic } from './base-epic';

@Injectable()
export class ProjectEpics extends BaseEpic {

  protected manifest: string[] = [
    'all',
    'edit',
    'create',
    'update',
    'delete'
  ];

  constructor(private projectService: ProjectService,
              private projectActions: ProjectActions) {
    super();
  }

  private edit = RootEpic.createEpic(
    Actions.EDIT_PROJECT,
    (query?) => {
      return this.projectService.all().pipe(
        map(this.projectActions.fetched)
      );
    });

  private all = RootEpic.createEpic(
    Actions.FETCH_PROJECTS,
    (query?) => {
      return this.projectService
        .all()
        .pipe(
          map(this.projectActions.fetched)
        );
    });

  private create = RootEpic.createEpic(
    Actions.CREATE_PROJECT,
    (project: Project) => {
      return this.projectService
        .create(project)
        .pipe(
          map(postResponse => this.projectActions.created(postResponse.entity))
        );
    });

  private update = RootEpic.createEpic(
    Actions.UPDATE_PROJECT,
    (project: Project) => {
      return this.projectService
        .update(project)
        .pipe(
          map(postResponse => this.projectActions.updated(postResponse.entity))
        );
    });

  private delete = RootEpic.createEpic(
    Actions.DELETE_PROJECT,
    (project: Project) => {
      return this.projectService
        .delete(project)
        .pipe(
          map(postResponse => this.projectActions.deleted(postResponse.entity))
        );
    });

}
