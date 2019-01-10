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

import { Component, OnInit } from '@angular/core';
import { AppState, LookupTable } from '../../classes/app-state.interface';
import { NgRedux } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ContentService } from '../../services/content.service';
import { AssetActions } from '../../actions/asset.actions';
import { DependencyReviewBase } from '../../classes/dependency-review-base.class';
import { Asset } from '../../models/asset.model';

@Component({
  selector: 'std-publish-review',
  templateUrl: './publish-review.component.html',
  styleUrls: ['./publish-review.component.scss']
})
export class PublishReviewComponent extends DependencyReviewBase implements OnInit {

  max = 'comfort';

  submission = {
    now: true,
    channel: null,
    comment: ''
  };

  constructor(store: NgRedux<AppState>, route: ActivatedRoute, actions: AssetActions,
              private contentService: ContentService) {
    super(store, route, actions);

    this.data$
      .pipe(this.filterNulls())
      .subscribe((data) => this.submission.channel = data.channels[0].name);

  }

  switchAndMap() {
    return switchMap((ids: string[]) => this.contentService.prePublishReport(ids));
  }

  getAssetLookupTable(): LookupTable<Asset> {
    return this.data.dependencies.assetLookup;
  }

  schedulingChanged() {

  }

}
