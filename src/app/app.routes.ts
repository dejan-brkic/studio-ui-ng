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

import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { ProjectResolver } from './services/project.resolver';
import { ProjectsResolver } from './services/projects.resolver';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectDashboardComponent } from './components/projects/project-dashboard/project-dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { NotImplementedComponent } from './components/not-implemented/not-implemented.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PreviewComponent } from './components/preview/preview.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { WorkflowStatesComponent } from './components/workflow-states/workflow-states.component';
import { EditComponent } from './components/edit/edit.component';
import { EntryComponent } from './components/entry/entry.component';
import { AssetOverviewComponent } from './components/asset-review/asset-overview.component';
import { InfoSheetListComponent } from './components/asset-info-sheet/info-sheet-list.component';
import { DeleteReviewComponent } from './components/asset-review/delete-review.component';
import { HistoryReviewComponent } from './components/asset-review/history-review.component';
import { PublishReviewComponent } from './components/asset-review/publish-review.component';
import { ScheduleReviewComponent } from './components/asset-review/schedule-review.component';
import { DependencyReviewComponent } from './components/asset-review/dependency-review.component';
import { AssetBrowserComponent } from './components/asset-browser/asset-browser.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupFormComponent } from './components/groups/group-form/group-form.component';

// Not having as a route requires for it to be added as entry component on AppModule
// import {ProjectCrUDComponent} from './components/project-management/project-crud/project-crud.component';

export const routes: Routes = [
  {
    path: '',
    resolve: { projects: ProjectsResolver },
    data: { title: 'Crafter Studio' },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'login',
        component: EntryComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'settings',
        component: NotImplementedComponent
      },
      {
        path: 'about',
        component: NotImplementedComponent
      },
      {
        path: 'assets',
        component: AssetBrowserComponent,
      },
      {
        path: 'users/create',
        component: UserFormComponent
      },
      {
        path: 'users/edit/:username',
        component: UserFormComponent
      },
      {
        path: 'groups/create',
        component: GroupFormComponent
      },
      {
        path: 'groups/edit/:id',
        component: GroupFormComponent
      },
      {
        path: 'organizations',
        component: NotImplementedComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        resolve: { projects: ProjectsResolver },
        children: [
          {
            path: 'create',
            component: ProjectsComponent
          },
          {
            path: ':projectCode',
            component: ProjectsComponent
          }
        ]
      },
      {
        path: 'project/:project',
        resolve: { project: ProjectResolver },
        children: [
          {
            path: '',
            component: ProjectComponent
          },
          {
            path: 'dashboard',
            component: ProjectDashboardComponent
          },
          {
            path: 'review',
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'selected/info'
              },
              {
                path: ':asset',
                component: AssetOverviewComponent,
                children: [
                  {
                    path: 'info',
                    data: { label: 'Info' },
                    component: InfoSheetListComponent
                  },
                  {
                    path: 'delete',
                    data: { label: 'Delete' },
                    component: DeleteReviewComponent
                  },
                  {
                    path: 'history',
                    data: { label: 'History' },
                    component: HistoryReviewComponent
                  },
                  {
                    path: 'publish',
                    data: { label: 'Publish' },
                    component: PublishReviewComponent
                  },
                  {
                    path: 'schedule',
                    data: { label: 'Schedule' },
                    component: ScheduleReviewComponent
                  },
                  {
                    path: 'dependencies',
                    data: { label: 'Dependencies' },
                    component: DependencyReviewComponent
                  }
                ]
              }
            ]
          },
          {
            path: 'preview',
            component: PreviewComponent
          },
          {
            path: 'edit',
            component: EditComponent
          },{
            path: 'search',
            component: NotImplementedComponent
          },
          {
            path: 'server-log',
            component: NotImplementedComponent
          },
          {
            path: 'content-models',
            component: NotImplementedComponent
          },
          {
            path: 'configuration-files',
            component: NotImplementedComponent
          },
          {
            path: 'user-groups',
            component: NotImplementedComponent
          },
          {
            path: 'workflow-states',
            component: WorkflowStatesComponent
          },
          {
            path: 'bulk-publishing',
            component: NotImplementedComponent
          },
          {
            path: 'audit',
            component: NotImplementedComponent
          },
          {
            path: 'logging-levels',
            component: NotImplementedComponent
          },
          {
            path: 'configuration-files',
            component: NotImplementedComponent
          }
        ]
      },
      {
        path: 'config',
        component: NotImplementedComponent
      },
      {
        path: 'help',
        component: NotImplementedComponent
      },
      {
        path: 'market',
        component: NotImplementedComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'preview',
        component: PreviewComponent
      },
      {
        path: 'edit',
        component: EditComponent
      }
    ]
  }
];

export const studioRoutes = RouterModule.forRoot(routes);
