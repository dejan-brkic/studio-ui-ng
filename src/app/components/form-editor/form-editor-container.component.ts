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

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Asset } from '../../models/asset.model';
import { filter, take, takeUntil } from 'rxjs/operators';
import { notNullOrUndefined } from '../../app.utils';
import { AssetTypeEnum } from '../../enums/asset-type.enum';
import { WithNgRedux } from '../../classes/with-ng-redux.class';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../classes/app-state.interface';

@Component({
  selector: 'std-form-editor-container',
  templateUrl: './form-editor-container.component.html',
  styleUrls: ['./form-editor-container.component.scss']
})
export class FormEditorContainerComponent extends WithNgRedux implements OnInit, OnChanges {

  @Input() assetId: string;

  asset: Asset = null;

  constructor(store: NgRedux<AppState>) {
    super(store);
  }

  ngOnInit() {

  }

  ngOnChanges({ assetId }: SimpleChanges) {
    if (assetId && (assetId.previousValue !== assetId.currentValue)) {
      this.select<Asset>([
        'entities', 'assets', 'byId', assetId.currentValue
      ]).pipe(
        filter(x => notNullOrUndefined(x)),
        take(1),
        takeUntil(this.ngOnDestroy$)
      ).subscribe((asset) => {
        this.asset = asset;
      });
    }
  }

}
