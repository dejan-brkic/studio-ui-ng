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

import { take } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { NgRedux } from '@angular-redux/store';
import { WithNgRedux } from './with-ng-redux.class';
import { PAGE_SIZE_OPTIONS } from '../app.utils';
import { AppState, ListingViewState, LookupTable } from './app-state.interface';
import { Query } from '../models/query';
import { createKey } from '../utils/state.utils';
import { AppAction } from '../models/app-action';
import { ContentChild, TemplateRef } from '@angular/core';

export abstract class ListingView<T> extends WithNgRedux {

  query: Query;
  entities: T[] = [];
  loading: boolean = true;
  totalRecords: number = 0;

  pageSizeOptions = PAGE_SIZE_OPTIONS;

  abstract titleBarTitle: string;
  abstract titleBarIcon: string;

  @ContentChild('listTemplate') listTemplate: TemplateRef<any>;

  constructor(
    store: NgRedux<AppState>,
    entityStateKey: string,
    listStateKey: string) {

    super(store);

    combineLatest(
      store.select(['entities', entityStateKey, 'byId']),
      store.select(listStateKey)
    ).pipe(
      this.untilDestroyed()
    ).subscribe((values: any[]) => {
      const
        byId: LookupTable<T> = values[0],
        state: ListingViewState = values[1],
        index = state.query.pageIndex;
      this.query = state.query;
      this.loading = !!state.loading[createKey('PAGE', index)];
      this.totalRecords = state.total;
      this.entities = (state.page[index])
        ? Array.prototype.map.call(state.page[index], (id) => byId[id])
        : [];
    });

    store.select(listStateKey).pipe(
      take(1),
      this.untilDestroyed(),
    ).subscribe((state: ListingViewState) => this.fetch(state.query));

  }

  static createTemplate({ listTemplate }) {
    return `
      <div class="sticky header view layout">
        <std-view-title-bar
          class="pad all"
          childMax="comfort"
          [title]="titleBarTitle"
          [icon]="titleBarIcon">
          <div>
            <button (click)="fetch(undefined, true)" color="default" mat-fab
                    [attr.aria-label]="'Refresh' | translate">
              <mat-icon aria-hidden="true">refresh</mat-icon>
            </button>
            <button theme="green" hue="600" color="inherit" mat-fab
                    (click)="create()"
                    [attr.aria-label]="'Create' | translate">
              <mat-icon aria-hidden="true">add</mat-icon>
            </button>
          </div>
        </std-view-title-bar>
        <section class="view body">
      
          <div class="pad all">
            <std-spinner class="absolute position full with height cover" *ngIf="loading">
              Retrieving&hellip;
            </std-spinner>
            <ng-container *ngIf="!loading" [ngTemplateOutlet]="listTemplate"></ng-container>
          </div>
      
        </section>
        <footer>
          <mat-paginator class="responsive-tight"
                         (page)="fetch($event)"
                         [length]="totalRecords"
                         [pageIndex]="query.pageIndex"
                         [pageSize]="query.pageSize"
                         [pageSizeOptions]="pageSizeOptions">
          </mat-paginator>
        </footer>
      </div>
      <ng-template #listTemplate>
        ${listTemplate}
      </ng-template>`;
  }

  abstract fetch(query: Query, forceUpdate?: boolean): AppAction;

  abstract create(): void;

  abstract edit(entity: T): void;

}
