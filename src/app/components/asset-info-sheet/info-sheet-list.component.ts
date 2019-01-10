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

import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../classes/app-state.interface';
import { ReviewBase } from '../../classes/review-base.class';

@Component({
  selector: 'std-info-sheet-list',
  template: `
    <ng-container *ngIf="ids$ | async as ids">
      <div class="pad all full height scrollable">
        <ng-container *ngFor="let id of ids; let isLast=last">
          <std-info-sheet [id]="id"></std-info-sheet>
          <div class="ui divider" *ngIf="!isLast"></div>
        </ng-container>
      </div>
      <div class="pad all lg text muted center" *ngIf="!ids.length">
        <span translate>Nothing selected for displaying.</span>
      </div>
    </ng-container>`,
  styles: [`
    .ui.divider:last-child {
      display: none;
    }
  `]
})
export class InfoSheetListComponent extends ReviewBase {

  constructor(store: NgRedux<AppState>,
              route: ActivatedRoute) {
    super(store, route);
  }

}
