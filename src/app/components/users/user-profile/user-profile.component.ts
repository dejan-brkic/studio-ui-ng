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
import { logoutComplete } from '../../../actions/user.actions';
import { ColorsEnum } from '../../../enums/colors.enum';
import { Observable } from 'rxjs/Observable';
import { Settings } from '../../../classes/app-state.interface';
import { ComponentBase } from '../../../classes/component-base.class';
import { SettingsActions } from '../../../actions/settings.actions';
import { User } from '../../../models/user.model';
import { StringUtils } from '../../../utils/string.utils';

@Component({
  selector: 'std-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends ComponentBase implements OnInit {

  @select('settings')
  settings$: Observable<Settings>;
  @select('user')
  user$: Observable<User>;

  user: User;
  settings: Settings;
  colors = Object.keys(ColorsEnum)
    .filter((color) => !['GREY_LIGHTEST', 'GREY_LIGHTER', 'GREY_LIGHT', 'GREY_MID'].includes(color))
    .map(color => ({
      key: color === 'GREY_MAIN' ? 'main' : StringUtils.dasherize(color.toLowerCase()),
      label: color,
      code: ColorsEnum[color],
      defaultHue: color === 'GREY_MAIN' ? 500 : 700
    }));

  constructor() {
    super();
  }

  ngOnInit() {

    this.user$
      .pipe(this.untilDestroyed())
      .subscribe((user) => {
        this.user = { ...user } as User;
      });

    this.settings$
      .pipe(this.untilDestroyed())
      .subscribe((settings) => {
        this.settings = { ...settings };
      });

  }

  @dispatch()
  logout() {
    return logoutComplete();
  }

  @dispatch()
  settingsChanged() {
    return SettingsActions.updateMany({
      ...this.settings,
      topBarTheme: this.settings.navBarTheme,
      navBarThemeHue: (this.settings.navBarTheme === 'main') ? 500 : 700
    });
  }

}
