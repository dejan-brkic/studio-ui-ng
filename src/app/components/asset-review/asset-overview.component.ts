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

import { MatTabGroup } from '@angular/material';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';

import { ComponentBase } from '../../classes/component-base.class';
import { routes } from '../../app.routes';

@Component({
  selector: 'std-asset-overview',
  templateUrl: './asset-overview.component.html',
  styleUrls: ['./asset-overview.component.scss']
})
export class AssetOverviewComponent extends ComponentBase implements AfterViewInit {

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  tabs = [];
  index = 0;
  goal = 0;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    super();

    let tabs = this.tabs = routes[0].children
      .find(r => r.path === 'project/:project')
      .children.find(r => r.path === 'review')
      .children[1].children
      .map(descriptor => ({
        label: descriptor.data.label,
        path: descriptor.path
      }));

    route.params
      .subscribe((params) => {
        let noTabRoute = `/project/${params.project}/review/${params.asset}`;
        if (router.url === noTabRoute) {
          return router.navigateByUrl(`${this.router.url}/info`);
        }
      });

    router.events
      .pipe(
        this.untilDestroyed(),
        filter(e => e instanceof NavigationEnd),
        map((e: NavigationEnd) => e.url.substr((e.url.lastIndexOf('/') + 1)))
      )
      .subscribe((path) => {
        setTimeout(() => this.goal = ++this.goal);
        this.index = tabs.findIndex(tab => tab.path === path);
      });

  }

  ngAfterViewInit() {
    this.tabGroup.selectedIndexChange
      .pipe(map(index => this.tabs[index]))
      .subscribe(tab => {
        let url = this.router.url;
        this.router.navigateByUrl(`${url.substr(0, url.lastIndexOf('/'))}/${tab.path}`);
      });
  }

}

