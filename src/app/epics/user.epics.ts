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
import { map } from 'rxjs/operators';
import { Actions } from '../enums/actions.enum';
import { RootEpic } from './root.epic';
import { UserService } from '../services/user.service';
import {
  createUserComplete,
  deleteUserComplete,
  fetchUserComplete,
  fetchUsersComplete,
  loginComplete,
  logoutComplete,
  recoverComplete,
  updateUserComplete
} from '../actions/user.actions';
import { BaseEpic } from './base-epic';
import { AppState } from '../classes/app-state.interface';
import { Store } from 'redux';
import { never } from 'rxjs/observable/never';
import { isNullOrUndefined } from 'util';

@Injectable()
export class UserEpics extends BaseEpic {

  constructor(private service: UserService) {
    super();
  }

  private login = RootEpic.createEpic(
    Actions.LOGIN,
    ({ payload }) => {
      return this.service
        .login(payload.user)
        .pipe(
          map(loginComplete)
        );
    });

  private logout = RootEpic.createEpic(
    Actions.LOGOUT,
    () => {
      return this.service
        .logout()
        .pipe(
          map(logoutComplete)
        );
    });

  private recover = RootEpic.createEpic(
    Actions.RECOVER_PASSWORD,
    () => this.service
      .logout()
      .pipe(
        map(recoverComplete)
      ));

  private fetchUsers = RootEpic.createEpic(
    Actions.FETCH_USERS,
    ({ payload }, store: Store<AppState>) => {
      const state = store.getState();
      return (
        (payload.forceUpdate || isNullOrUndefined(state.usersList.page[payload.query.pageIndex]))
          ? this.service.page(payload.query).pipe(map(fetchUsersComplete))
          : never()
      );
    }
  );

  private fetchUser = RootEpic.createEpic(
    Actions.FETCH_USER,
    (action) => this.service.byId(action.payload.id)
      .pipe(
        map(fetchUserComplete)
      )
  );

  private createUser = RootEpic.createEpic(
    Actions.CREATE_USER,
    (action) => this.service.create(action.payload.user)
      .pipe(
        map(createUserComplete)
      )
  );

  private deleteUser = RootEpic.createEpic(
    Actions.DELETE_USER,
    (action) => this.service.delete(action.payload.id).pipe(
      map(deleteUserComplete)
    )
  );

  private updateUser = RootEpic.createEpic(
    Actions.UPDATE_USER,
    (action) => this.service.update(action.payload.user)
      .pipe(
        map(updateUserComplete)
      )
  );

  protected manifest: string[] = [
    'login',
    'logout',
    'recover',
    'createUser',
    'updateUser',
    'deleteUser',
    'fetchUser',
    'fetchUsers',
  ];

}
