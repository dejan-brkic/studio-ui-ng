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
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { dispatch, NgRedux, select } from '@angular-redux/store';
import { login, logout, recover } from '../../actions/user.actions';
import { WithNgRedux } from '../../classes/with-ng-redux.class';
import { AppState } from '../../classes/app-state.interface';
import { createEmptyUser, notNullOrUndefined } from '../../app.utils';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'std-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends WithNgRedux implements OnInit {

  studioLogoUrl = `${environment.assetsUrl}/img/logos/white.png`;

  showRecoverView = false;

  remember = false;
  model: User = createEmptyUser();

  userNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  @select('auth')
  auth$;

  constructor(store: NgRedux<AppState>) {
    super(store);
  }

  ngOnInit() {

    $('body').addClass('login view');

    let user = this.state.user;
    if (notNullOrUndefined(user)) {
      this.model = user;
    }

    this.addTearDown(() => {
      $('body').removeClass('login view');
    });

  }

  @dispatch()
  login() {
    return login(this.model);
  }

  @dispatch()
  logout() {
    return logout();
  }

  @dispatch()
  recover() {
    return recover(this.model);
  }

}
