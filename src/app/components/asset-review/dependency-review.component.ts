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
import { AppState, LookupTable } from '../../classes/app-state.interface';
import { NgRedux } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';
import { AssetActions } from '../../actions/asset.actions';
import { Asset } from '../../models/asset.model';
import { DeleteReviewComponent } from './delete-review.component';

@Component({
  selector: 'std-dependency-review',
  templateUrl: './dependency-review.component.html',
  styleUrls: ['./dependency-review.component.scss']
})
export class DependencyReviewComponent extends DeleteReviewComponent {

}
