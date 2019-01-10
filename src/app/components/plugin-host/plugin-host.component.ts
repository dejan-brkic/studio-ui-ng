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

import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../classes/app-state.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, takeUntil } from 'rxjs/operators';
import { StudioPluginHost } from '../../classes/studio-plugin';
import { StudioPlugin } from '../../models/studio-plugin';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'std-plugin-host',
  templateUrl: './plugin-host.component.html',
  styleUrls: ['./plugin-host.component.scss']
})
export class PluginHostComponent
  implements OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @Input() plugin: string;

  loading$ = new BehaviorSubject(true);

  private host: StudioPluginHost;
  private bundle: StudioPlugin;
  private ngOnDestroy$: Subject<any> = new Subject();

  constructor(store: NgRedux<AppState>,
              private elementRef: ElementRef) {
    this.host = new StudioPluginHost(store);
  }

  get elem() {
    return this.elementRef.nativeElement;
  }

  ngOnInit() {
    const { loading$, ngOnDestroy$ } = this;
    loading$
      .pipe(
        filter(x => !x),
        takeUntil(ngOnDestroy$)
      )
      .subscribe(() => {
        try {
          let { elem, host, bundle } = this;
          let node;

          node = document.createElement(bundle.tag || 'div');
          node.className = bundle.classes || '';

          elem.appendChild(node);
          bundle.create(node, host);

        } catch (e) {
          console.error('The plugin bundle produced an error during initialization', e);
        }
      });
  }

  ngOnChanges({ plugin }: SimpleChanges): void {
    if (plugin && plugin.firstChange || (plugin.currentValue !== plugin.previousValue)) {
      const { bundle, loading$ } = this;

      loading$.next(true);
      if (bundle && bundle.destroy) {
        bundle.destroy();
      }

      requirejs([`plugins/${this.plugin}`], (nextBundle) => {
        this.bundle = nextBundle;
        loading$.next(false);
      });
    }
  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    try {
      this.bundle.destroy();
    } catch (e) {
      console.error('The plugin bundle produced an error during disposing', e);
    }
  }

}
