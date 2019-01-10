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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../classes/app-state.interface';
import { PreviewTabsActions } from '../../actions/preview-tabs.actions';
import { NgRedux } from '@angular-redux/store';
import { AssetActions } from '../../actions/asset.actions';
import { AssetDisplayComponent } from './asset-display.component';
import { Asset } from '../../models/asset.model';

@Component({
  selector: 'std-simple-asset-display',
  templateUrl: './asset-display.component.html',
  styleUrls: ['./asset-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleAssetDisplayComponent extends AssetDisplayComponent implements OnChanges {

  @Input() asset: Asset;

  constructor(store: NgRedux<AppState>,
              router: Router,
              assetActions: AssetActions,
              previewTabsActions: PreviewTabsActions,
              detector: ChangeDetectorRef) {
    super(
      store,
      router,
      assetActions,
      previewTabsActions,
      detector);
  }

  ngOnChanges(changes: SimpleChanges) {
    let { ngOnChanges$ } = this;
    ngOnChanges$.next(changes);

    this.setMenuVisibility();
    this.setLabelLeftClear();
    this.setIsNavigable();
    this.setIconDescription();
    this.setLockedByCurrent();
    this.setTypeClass();
    this.setStatusClass();
    this.setLabel();

  }

}
