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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs } from '../classes/request-options-args.interface';
import { isNullOrUndefined } from 'util';

function params(options: RequestOptionsArgs, paramMap: any): RequestOptionsArgs {
  if (!isNullOrUndefined(paramMap)) {
    if (isNullOrUndefined(options)) {
      options = {};
    }
    options.params = paramMap;
  }
  return options;
}

@Injectable()
export class StudioHttpService /* extends HttpClient */ {

  static mapToPostResponse(entity) {
    return (data: any) => ({ entity: data.entity || entity, response: data.response });
  }

  static mapToPagedResponse(entriesPropName: string) {
    return (data: any) => {
      if ('result' in data) {
        data = data.result;
      }
      return {
        total: data.total,
        entries: data[entriesPropName]
      };
    };
  }

  constructor(private http: HttpClient) {
  }

  get(url: string, paramMap?, options?: RequestOptionsArgs): Observable<any> {
    return this.http.get(url, params(options, paramMap));
  }

  post(url: string, body: any = null, options?: RequestOptionsArgs): Observable<any> {
    return this.http.post(url, body, options);
  }

  put(url: string, body: any = null, options: RequestOptionsArgs): Observable<any> {
    return this.http.put(url, body, options);
  }

  delete(url: string, paramMap?, options?: RequestOptionsArgs): Observable<any> {
    return this.http.delete(url, params(options, paramMap));
  }

  patch(url: string, body: any = null, options?: RequestOptionsArgs): Observable<any> {
    return this.http.patch(url, body, options);
  }

}
