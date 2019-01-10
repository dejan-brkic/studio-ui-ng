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

import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Settings } from '../../classes/app-state.interface';
import { dispatch, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ComponentBase } from '../../classes/component-base.class';
import { skip, switchMap, take, takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SettingsActions } from '../../actions/settings.actions';
import { navBarAnimations } from '../../utils/animations.utils';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { interval } from 'rxjs/observable/interval';

const PATH_IMAGES = `${environment.url.assets}/img/logos`;

@Component({
  selector: 'std-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrls: ['./vertical-navbar.component.scss'],
  animations: navBarAnimations
})
export class VerticalNavBarComponent extends ComponentBase implements OnInit, AfterViewInit {

  @HostBinding('@visibility') visibility = 'expanded';
  @HostBinding('class.minimised') minimised = false;
  @HostBinding('class.right') right = false;
  @HostBinding('class.reveal') reveal = false;
  @HostBinding('attr.theme') theme = null;
  @HostBinding('attr.hue') hue = null;

  @select('settings')
  settings$: Observable<Settings>;

  isMobile = false;
  settings: Settings;
  logoImage = `${PATH_IMAGES}/flat.png`;

  viewInitialized = false;

  constructor(private platform: Platform,
              private elementRef: ElementRef) {
    super();
    if (this.platform.ANDROID || this.platform.IOS) {
      this.isMobile = true;
    }
  }

  ngOnInit() {
    this.settings$
      .pipe(this.untilDestroyed())
      .subscribe((settings) => {
        this.settings = settings;
        this.right = settings.navBarPosition === 'right';
        this.theme = settings.navBarTheme ? settings.navBarTheme : null;
        this.hue = settings.navBarThemeHue ? settings.navBarThemeHue : null;
        this.minimised = settings.navBarMinimised;
        this.visibility = settings.navBarShown ? 'expanded' : 'minimised';
        this.logoImage = (['main', 'yellow', 'teal', 'white'].includes(settings.navBarTheme))
          ? `${PATH_IMAGES}/black.png`
          : `${PATH_IMAGES}/white.png`;
        if (settings.navBarMinimised) {
          this.beginRevealService();
        }
      });
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.viewInitialized = true;
    });

  }

  beginRevealService() {

    let
      elem = this.elementRef.nativeElement,
      content = elem.querySelector('.content'),
      settings$ = this.settings$.pipe(skip(1)),
      interval$ = interval(200),
      mouseover$ = fromEvent(content, 'mouseover'),
      mouseout$ = fromEvent(content, 'mouseout');

    mouseover$
      .pipe(
        takeUntil(settings$),
        switchMap(
          () => interval$.pipe(
            takeUntil(mouseout$),
            take(1))))
      .subscribe(() => {
        this.reveal = true;
      });

    mouseout$
      .pipe(
        takeUntil(settings$),
        switchMap(() => interval$.pipe(
          takeUntil(mouseover$),
          take(1))))
      .subscribe(() => {
        this.reveal = false;
      });

  }

  @dispatch()
  toggleMinimised() {
    return SettingsActions.toggleSideBarFolded();
  }

}
