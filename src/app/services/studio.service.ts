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
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StudioHttpService } from './http.service';

const appUrl = environment.url.app;

@Injectable()
export class StudioService {

  private _sidebarItems: BehaviorSubject<any> = new BehaviorSubject([]);
  public sidebarItems: Observable<any> = this._sidebarItems.asObservable();

  constructor(private http: StudioHttpService) {
  }

  fetchSidebarItems(): void {
    this.http.get(`${environment.apiUrl}/get-sidebar-items.json`)
      .subscribe(sidebarItems => {
        this._sidebarItems.next(sidebarItems);
      });
  }

  getGlobalNav(): Observable<any> {
    return this.http
      .get(`${appUrl}/fixtures/get-sidebar-items.json`, { 'project': 'my-project-name' });
  }

}
