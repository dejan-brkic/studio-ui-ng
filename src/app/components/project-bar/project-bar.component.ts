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

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'std-project-bar',
  templateUrl: './project-bar.component.html',
  styleUrls: ['./project-bar.component.scss']
})
export class ProjectBarComponent implements OnInit {

  @Input() links = [];
  @Input() trees = [];

  expandedPanels = {};

  constructor() { }

  ngOnInit() {

  }

  getProjectNavPanelKey(item?) {
    let id = item
      ? item.label
        .toLowerCase()
        .replace(/ /g, '')
      : '';
    return `sidebar.projectnav.${id}`;
  }

  projectNavPanelExpandedStateChange(tree, expanded) {

  }

  showChildLinks(item) {
    console.log(item);
  }

}
