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

import { Component, ViewChild } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';
import { ReviewBase } from '../../classes/review-base.class';
import { AppState } from '../../classes/app-state.interface';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ContentService } from '../../services/content.service';
import { MatMenu, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'std-history-review',
  templateUrl: './history-review.component.html',
  styleUrls: ['./history-review.component.scss']
})
export class HistoryReviewComponent extends ReviewBase {

  selectedEntry;
  dataSources = {};
  columns = ['check', 'comment', 'modifiedBy', 'modifiedOn', 'version', 'actions'];

  @ViewChild(MatMenu) historyItemMenu: MatMenu;

  constructor(store: NgRedux<AppState>,
              route: ActivatedRoute,
              private contentService: ContentService) {
    super(store, route);

    this.ids$
      .pipe(
        tap(() => this.loading = true),
        filter(x => !!x.length),
        switchMap(ids => this.contentService.history(ids))
      )
      .subscribe(data => {

        data.entries.forEach(entry => {
          this.dataSources[entry.assetId] = new MatTableDataSource(entry.versions);
        });

        this.data = data;
        this.loading = false;

      });

  }

  historyItemClicked(version, entry) {
    this.selectedEntry = { version, assetId: entry.assetId };
  }

  viewVersion() {
    let {selectedEntry} = this;
  }

  compareVersions() {
    let {selectedEntry} = this;
  }

  makeCurrentVersion() {
    let {selectedEntry} = this;
  }
}
