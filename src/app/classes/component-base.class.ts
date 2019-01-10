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

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { filter, takeUntil } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs/interfaces';
import { notNullOrUndefined } from '../app.utils';
import { isNullOrUndefined } from 'util';

let filterOperator;
function initFilterOp() {
  if (isNullOrUndefined(filterOperator)) {
    filterOperator = filter(x => notNullOrUndefined(x));
  }
}

export class ComponentBase {

  protected ngOnDestroy$: Subject<any> = new Subject();
  private cachedTakeUntilOp;

  // noinspection TsLint
  ngOnDestroy() {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
    this.ngOnDestroy$.unsubscribe();
  }

  protected addTearDown(tearDownLogic: () => void) {
    this.ngOnDestroy$.subscribe(tearDownLogic);
  }

  protected pipeFilterAndTakeUntil<A>(source$: Observable<A>, ...operators: MonoTypeOperatorFunction<A>[]): Observable<A> {
    initFilterOp();
    this.initTakeUntilOp();
    return source$.pipe(
      this.filterNulls(),
      this.untilDestroyed(),
      ...operators);
  }

  protected filterNulls<T>(): MonoTypeOperatorFunction<T> {
    initFilterOp();
    return <MonoTypeOperatorFunction<T>>filterOperator;
  }

  protected untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    this.initTakeUntilOp();
    return <MonoTypeOperatorFunction<T>>this.cachedTakeUntilOp;
  }

  private initTakeUntilOp() {
    if (isNullOrUndefined(this.cachedTakeUntilOp)) {
      this.cachedTakeUntilOp = takeUntil(this.ngOnDestroy$);
    }
  }

}
