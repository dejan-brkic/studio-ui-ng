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
import { dispatch, select } from '@angular-redux/store';
import { logout } from '../../actions/user.actions';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'std-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @select('user')
  user$: Observable<User>;

  languages = [
    { key: 'en', label: 'English' },
    { key: 'es', label: 'Español' },
    { key: 'kr', label: '한국어' }
  ];

  constructor(private translate: TranslateService) {

  }

  ngOnInit() {

  }

  changeLanguage(key) {
    this.translate.use(key);
  }

  @dispatch()
  logout() {
    return logout();
  }

}
