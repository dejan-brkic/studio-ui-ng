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

import { AppState } from './app-state.interface';
import { SubjectStore } from './subject-store.class';
import { AnySubscriber } from '../../@types/globals/AnyObserver.type';
import { ComponentBase } from './component-base.class';

export class ComponentWithState extends ComponentBase {

  get state() {
    return this.store.getState();
  }

  constructor(protected store: SubjectStore<AppState>) {
    super();
  }

  protected dispatch(action) {
    this.store.dispatch(action);
  }

  protected subscribeTo(key: keyof AppState, subscriber?: AnySubscriber);
  // noinspection TsLint
  protected subscribeTo(keys: Array<keyof AppState>, subscriber?: AnySubscriber);
  // noinspection TsLint
  protected subscribeTo(keySubscriberMap: {  }, subscriber?: AnySubscriber);
  protected subscribeTo(keyMapOrKeys: keyof AppState | {} | Array<keyof AppState>,
                        subscriber: AnySubscriber = (key => this[`${keyMapOrKeys}StateChanged`](key))) {
    let
      store = this.store,
      until = this.untilDestroyed();
    if (typeof keyMapOrKeys === 'string') {
      // is a key
      store.subscribeTo(keyMapOrKeys, subscriber, until);
    } else {
      let
        branchKeys,
        branchSubscriberMap;
      if (Array.isArray(keyMapOrKeys)) {
        // is array
        branchKeys = <Array<keyof AppState>>keyMapOrKeys;
      } else {
        // is a map
        branchSubscriberMap = keyMapOrKeys;
        branchKeys = Object.keys(keyMapOrKeys);
      }
      branchKeys.forEach((key) =>
        store.subscribeTo(key,
          branchSubscriberMap
            ? branchSubscriberMap[key]
            : (branch) => this[`${key}StateChanged`](branch),
          until));
    }
  }

}
