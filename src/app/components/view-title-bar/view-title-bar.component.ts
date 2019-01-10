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

import { AfterViewInit, Component, ContentChild, ElementRef, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Settings } from '../../classes/app-state.interface';
import { ComponentBase } from '../../classes/component-base.class';

@Component({
  selector: 'std-view-title-bar',
  template: `
    <header [attr.max]="childMax">
      <section class="left">
        <button color="default" mat-fab 
                *ngIf="back !== ''" [routerLink]="[back]"
                [attr.aria-label]="'Back' | translate">
          <mat-icon class="" aria-hidden="true">chevron_left</mat-icon>
        </button>
        <std-sidebar-toggler *ngIf="navToggler"></std-sidebar-toggler>
        <h1 class="heading" *ngIf="!heading" [ngClass]="{ 'pad left': back !== '' }">
          <mat-icon *ngIf="icon">{{icon}}</mat-icon> {{title|translate}}
        </h1>
        <ng-container
          [ngTemplateOutlet]="heading"
          [ngTemplateOutletContext]="{ $implicit: { icon: icon, title: title } }">
        </ng-container>
      </section>
      <ng-content></ng-content>
    </header>
    <ng-container [ngTemplateOutlet]="toolbar"></ng-container>`,
  styleUrls: ['./view-title-bar.component.scss']
})
export class ViewTitleBarComponent extends ComponentBase implements OnInit, AfterViewInit {

  @select('settings') settings$: Observable<Settings>;

  @HostBinding('attr.hue') hue;
  @HostBinding('attr.theme') theme;

  @ContentChild('heading') heading: TemplateRef<any>;
  @ContentChild('toolbar') toolbar: TemplateRef<any>;

  @Input() title;
  @Input() icon;
  @Input() navToggler = false;
  @Input() back = '';
  @Input() childMax;

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.settings$
      .pipe(this.untilDestroyed())
      .subscribe((settings) => {
        this.theme = settings.topBarTheme;
        this.hue = settings.topBarThemeHue;
      });
  }

  ngAfterViewInit() {
    let el = this.elementRef.nativeElement;
    el.classList.add('view');
    el.classList.add('header');
  }

}
