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

import { AfterViewInit, Component, ElementRef, HostListener, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'std-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements AfterViewInit {

  @ViewChild('input') inputRef: ElementRef;

  @Output() queryChange = new Subject();

  value = '';
  options = {};

  get input() {
    return this.inputRef.nativeElement;
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewInit() {
    let el = this.element;
    $(el).hover(
      () => $(el).addClass('hover'),
      () => $(el).removeClass('hover')
    );
  }

  @HostListener('click')
  click(e) {
    console.log('click');
    this.input.select();
  }

  focus(e) {
    $(this.element).addClass('focus');
  }

  blur(e) {
    $(this.element).removeClass('focus');
  }

  captureEvent(e) {
    e.stopPropagation();
  }

  submit(e) {
    this.queryChange.next({ value: this.value, options: this.options });
  }

  clear(e) {
    this.value = '';
  }

}
