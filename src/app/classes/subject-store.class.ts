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

import {Reducer, Store, Unsubscribe} from 'redux';
import {Subject} from 'rxjs/Subject';
import { Subscription, TeardownLogic } from 'rxjs/Subscription';
import { OperatorFunction } from 'rxjs/interfaces';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { AppState } from './app-state.interface';
import { filter, map } from 'rxjs/operators';

export class SubjectStore<T> implements Store<T> {

  private storeStream: Observable<AppState>;
  private branchStream = new Subject<keyof T>();

  constructor(private store: Store<T>) {
    this.storeStream = Observable.create((subscriber: Subscriber<T>): TeardownLogic => {
      let tearDown = store.subscribe(() =>
        subscriber.next(store.getState()));
      return { unsubscribe: tearDown };
    });
  }

  dispatch(action) {

    let
      affectedBranches = action.affects || [],
      superReturnValue = this.store.dispatch(action);

    // Assumes by this time redux updated the store
    // tslint:disable-next-line:no-unused-expression
    affectedBranches.forEach(branchKey => {
      this.branchStream.next(branchKey);
    });

    return superReturnValue;

  }

  getState(): T {
    return this.store.getState();
  }

  subscribe(observer: () => void): Unsubscribe {
    return <Unsubscribe> this.store.subscribe(observer);
  }

  replaceReducer(nextReducer: Reducer<T>): void {
    this.store.replaceReducer(nextReducer);
  }

  subscribeTo<R>(stateBranchKey: keyof T,
                 subscriber: (branch) => void,
                 ...operators: OperatorFunction<T, R>[]): Subscription {
    return this.branchStream
      .pipe(
        filter(key => key === stateBranchKey),
        map((key: string) => this.getState()[key]),
        ...(operators || [])
      )
      .subscribe(subscriber);
  }

  // pipe<R>(...operators: OperatorFunction<T, R>[]): Observable<R> {
  //   return this.storeStream
  //     .pipe.apply(this.storeStream, operators);
  // }

}
