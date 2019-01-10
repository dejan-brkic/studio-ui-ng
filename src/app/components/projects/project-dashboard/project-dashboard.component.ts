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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchType } from './item-list-dashlet.component';
import { Project } from '../../../models/project.model';
import { AssetActionEnum, AssetMenuOption, WorkflowService } from '../../../services/workflow.service';
import { AppState } from '../../../classes/app-state.interface';
import { WithNgRedux } from '../../../classes/with-ng-redux.class';
import { NgRedux } from '@angular-redux/store';
import { ProjectActions } from '../../../actions/project.actions';

@Component({
  selector: 'std-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent extends WithNgRedux implements OnInit {

  project: Project;

  activity: FetchType = 'activity';
  published: FetchType = 'published';
  scheduled: FetchType = 'scheduled';
  pending: FetchType = 'pending';

  constructor(store: NgRedux<AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private workflowService: WorkflowService,
              private projectActions: ProjectActions) {
    super(store);
  }

  ngOnInit() {

    this.route.data
      .subscribe(data => {
        let project = data.project;
        if (this.state.projectRef.code !== project.code) {
          this.store.dispatch(
            this.projectActions.select(project.code));
        }
        this.project = project;
      });

    // this.store.select(['workspaceRef', 'selectedItems'])
    //   .pipe(...this.noNullsAndUnSubOps)
    //   .subscribe((selectedItems) => this.updateAvailableActions(selectedItems));

  }

}
