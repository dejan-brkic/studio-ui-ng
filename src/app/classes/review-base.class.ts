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

import { ComponentBase } from './component-base.class';
import { ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './app-state.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ReviewBase extends ComponentBase {

  data;
  empty = false;
  loading = false;
  finished = false;

  ids$: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(store: NgRedux<AppState>, route: ActivatedRoute) {
    super();

    route.parent.params
      .subscribe((params) => {
        if (params.asset === 'selected') {
          store.select(['workspaceRef', 'selectedItems'])
            .pipe(this.untilDestroyed())
            .subscribe((selected) => {
              this.ids$.next(Object.keys(selected));
            });
        } else {
          this.ids$.next(['editorial:/site/website/index.xml']); // [params.asset];
        }
      });

    this.ids$
      .pipe(this.untilDestroyed())
      .subscribe(ids => {
        this.empty = !ids.length;
      });

  }

}
