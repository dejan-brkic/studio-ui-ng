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

import { Observable } from 'rxjs/Observable';
import { BulkPostResponse, PostResponse } from './post-response.interface';
import { PagedResponse } from './paged-response.interface';

export interface EntityService<T> {
  all(query?): Observable<T[]>;
  page(query?): Observable<PagedResponse<T>>;
  byId(uniqueKey: string | number): Observable<T>;
  by(entityProperty: string, value): Observable<T>;
  create(entity: T): Observable<PostResponse<T>>;
  update(entity: T): Observable<PostResponse<T>>;
  delete(entity: T): Observable<PostResponse<T> | BulkPostResponse<T>>;
}
