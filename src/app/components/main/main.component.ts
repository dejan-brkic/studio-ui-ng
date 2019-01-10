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

import { Component, HostBinding, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, Settings, SidebarState } from '../../classes/app-state.interface';
import { WithNgRedux } from '../../classes/with-ng-redux.class';
import { combineLatest, filter, withLatestFrom } from 'rxjs/operators';
import { routerAnimations } from '../../utils/animations.utils';
import { NavigationEnd, Router } from '@angular/router';
import { notNullOrUndefined } from '../../app.utils';
import { StudioService } from '../../services/studio.service';

@Component({
  selector: 'std-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: routerAnimations
})
export class MainComponent extends WithNgRedux implements OnInit {

  @HostBinding('attr.max-width')
  get containedLayoutMaxWidth() {
    return ((this.settings)
      ? this.settings.layout === 'contained' ? this.settings.containedLayoutMax : false
      : false);
  }

  showProjectSidebar = false;
  showProjectBadge = false;
  activeProjectCode = '';

  settings: Settings = (<Settings>{});
  navState = '';

  globalNavItems = [];
  projectNavItems = [];
  projectTreeItems = [];

  constructor(store: NgRedux<AppState>,
              studioService: StudioService,
              router: Router) {
    super(store);

    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        combineLatest(
          store.select<string>('activeProjectCode'),
          store.select<Settings>('settings')
        ),
        this.untilDestroyed()
      )
      .subscribe(([event, code, settings]) => {

        this.settings = settings;
        this.navState = this.settings.viewAnimation;
        this.showProjectBadge = notNullOrUndefined(code);
        this.showProjectSidebar = notNullOrUndefined(code) && router.url.includes('/project/') && settings.navBarShown;
        this.activeProjectCode = code;

        setTimeout(() => this.navState = '', 500);

      });

    studioService
      .getGlobalNav()
      .subscribe((navItems) => {
        this.globalNavItems = navItems.studio;
        this.projectNavItems = navItems.project.nav;
        this.projectTreeItems = navItems.project.trees;
      });

  }

  ngOnInit() {

  }

}
