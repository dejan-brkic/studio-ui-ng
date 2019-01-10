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
import {environment} from '../../../environments/environment';

@Component({
  selector: 'std-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  logoURL = `${environment.url.assets}/img/logos/flat.png`;

  nav = [
    { icon: 'fa fa-globe', label: 'Organizations', href: '/organizations' },
    { icon: 'fa fa-briefcase', label: 'Projects', href: '/projects' },
    { icon: 'fa fa-address-card-o', label: 'Users', href: '/users' },
    { icon: 'fa fa-users', label: 'Groups', href: '/groups' },
    { icon: 'fa fa-file-o', label: 'Assets', href: '/assets' },
    { icon: 'fa fa-binoculars', label: 'Browser', href: '/preview' },
    { icon: 'fa fa-question-circle-o', label: 'Help', href: '/help' },
    { icon: 'fa fa-cogs', label: 'Configuration', href: '/config' },
    { icon: 'fa fa-shopping-cart', label: 'Marketplace', href: '/market' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
