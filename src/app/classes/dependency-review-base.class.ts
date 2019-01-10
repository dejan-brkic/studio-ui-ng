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
import { dispatch, NgRedux } from '@angular-redux/store';
import { AppState, LookupTable } from './app-state.interface';
import { Asset } from '../models/asset.model';
import { ReviewBase } from './review-base.class';
import { filter, tap } from 'rxjs/operators';
import { AssetActions } from '../actions/asset.actions';
import { MonoTypeOperatorFunction } from 'rxjs/interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export abstract class DependencyReviewBase extends ReviewBase {

  checked = {};
  data$ = new BehaviorSubject(null);

  abstract getAssetLookupTable(): LookupTable<Asset>;
  abstract switchAndMap(): MonoTypeOperatorFunction<any>;

  constructor(store: NgRedux<AppState>, route: ActivatedRoute, private actions: AssetActions) {
    super(store, route);
  }

  ngOnInit() {
    this.ids$
      .pipe(
        filter(x => !!x.length),
        tap(() => this.loading = true),
        this.switchAndMap(),
        this.untilDestroyed()
      )
      .subscribe(this.dataGotten.bind(this));
  }

  selectAll() {
    let { checked } = this;
    Object.keys(this.getAssetLookupTable())
      .forEach(id => checked[id] = true);
  }

  selectNone() {
    this.checked = {};
  }

  dataGotten(data) {
    this.data = data;
    this.loading = false;
    this.notifyAssetLoaded(Object.values(this.getAssetLookupTable()));
    this.data$.next(data);
  }

  @dispatch()
  notifyAssetLoaded(assets: Asset[]) {
    return this.actions.fetchedMany(assets);
  }

}
