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

import { Component, ContentChild, HostBinding, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { collapseInOut } from '../../utils/animations.utils';

@Component({
  selector: 'std-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
  animations: [collapseInOut('*', 'void')]
})
export class CollapsibleComponent implements OnInit {

  @ContentChild('toggleTemplate') toggleTemplate: TemplateRef<any>;

  @Input() title = 'Toggle';
  @Input() indicator = true;
  @Input() @HostBinding('class.closed') closed = false;

  @Output() closedChange = new Subject();

  constructor() {

  }

  ngOnInit() {

  }

  toggle(event) {
    this.closedChange.next(this.closed = !this.closed);
  }

}
