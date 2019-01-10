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

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProjectService} from './project.service';
import { tap } from 'rxjs/operators';
import { AppState } from '../classes/app-state.interface';
import { NgRedux } from '@angular-redux/store';
import { ProjectActions } from '../actions/project.actions';

@Injectable()
export class ProjectsResolver implements Resolve<any> {

  constructor(private projectService: ProjectService,
              private projectActions: ProjectActions,
              private store: NgRedux<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot) {
    return this.projectService
      .all()
      .pipe(tap(projects => this.store.dispatch(this.projectActions.fetched(projects))));
  }

}
