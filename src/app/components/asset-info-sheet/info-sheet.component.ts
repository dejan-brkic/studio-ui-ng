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

import { Subject } from 'rxjs/Subject';
import { NgRedux } from '@angular-redux/store';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Asset } from '../../models/asset.model';
import { WithNgRedux } from '../../classes/with-ng-redux.class';
import { AppState } from '../../classes/app-state.interface';
import { fullName, notNullOrUndefined } from '../../app.utils';
import { filter, takeUntil } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

// under systemjs, moment is actually exported as the default export, so we account for that
const m: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Component({
  selector: 'std-info-sheet',
  templateUrl: './info-sheet.component.html',
  styleUrls: ['./info-sheet.component.scss']
})
export class InfoSheetComponent extends WithNgRedux implements OnChanges {

  @Input() id;
  @Input() showGeneral = true;
  @Input() showPermissions = true;
  @Input() closed = { general: false, permissions: false };

  asset: Asset;
  assetChanged$ = new Subject();

  properties = [];

  constructor(store: NgRedux<AppState>,
              private translate: TranslateService) {
    super(store);
  }

  ngOnChanges(changes: SimpleChanges) {
    let { ngOnDestroy$, assetChanged$, translate, id } = this;
    if (changes.id.previousValue !== changes.id.currentValue) {
      assetChanged$.next();
      if (notNullOrUndefined(id)) {
        let now = (key, interpolate?) => translate.instant(key, interpolate);
        this.select<Asset>(['entities', 'assets', 'byId', id])
          .pipe(
            filter(x => notNullOrUndefined(x)),
            takeUntil(merge(ngOnDestroy$, assetChanged$))
          )
          .subscribe(asset => {
            this.asset = asset;
            this.properties = [
              { label: now('Type'), value: asset.type },
              { label: now('Children'), value: asset.numOfChildren ? now('Yes ({{num}})', { num: asset.numOfChildren }) : 'No' },
              { label: now('Url'), value: asset.url },
              { label: now('State'), value: asset.workflowStatus },
              asset.lastEditedOn ? { label: now('Last Edit On'), value: m(<any>asset.lastEditedOn).from(m()) } : null,
              asset.lastEditedBy ? { label: now('Last Edit by'), value: fullName(asset.lastEditedBy) } : null,
              asset.contentModelId ? { label: now('Content Model'), value: asset.contentModelId } : null,
              asset.publishedOn ? { label: now('Published on'), value: m(<any>asset.publishedOn).from(m()) } : null
            ].filter(x => notNullOrUndefined(x));
          });
      }
    }
  }

}
