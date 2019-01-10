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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { dispatch, NgRedux } from '@angular-redux/store';
import { fetchGroups } from '../../actions/group.actions';
import { Group } from '../../models/group.model';
import { AppState } from '../../classes/app-state.interface';
import { Query } from '../../models/query';
import { ListingView } from '../../classes/listing-view.class';

@Component({
  selector: 'std-groups',
  styleUrls: ['./groups.component.scss'],
  template: ListingView.createTemplate({
    listTemplate: `
      <mat-card class="pad all" max="readability">
        <div class="ui link divided items">
          <div class="item" *ngFor="let group of entities" (click)="edit(group)">
            <div class="content">
              <div class="header">{{group.name}}</div>
              <div class="meta">{{group.description}}</div>
            </div>
          </div>
        </div>
      </mat-card>
    `
  })
})
export class GroupsComponent extends ListingView<Group> {

  titleBarIcon: string = 'group';
  titleBarTitle: string = 'Groups';

  constructor(store: NgRedux<AppState>, private router: Router) {
    super(store, 'groups', 'groupsList');
  }

  @dispatch()
  fetch(query: Query = this.query, forceUpdate = false) {
    return fetchGroups(query, forceUpdate);
  }

  create(): void {
    this.router.navigate(['/groups/create']);
  }

  edit(group: Group): void {
    this.router.navigate(['/groups/edit', group.id]);
  }

}
