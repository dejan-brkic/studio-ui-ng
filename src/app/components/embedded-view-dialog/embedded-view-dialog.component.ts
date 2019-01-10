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

import {
  Component,
  Inject,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  EventEmitter,
  ComponentFactory,
} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ComponentHostDirective} from '../component-host.directive';

@Component({
  selector: 'std-embedded-view-dialog',
  templateUrl: './embedded-view-dialog.component.html',
  styleUrls: ['./embedded-view-dialog.component.scss']
})
export class EmbeddedViewDialogComponent implements OnInit {

  @ViewChild(ComponentHostDirective) cmpHost: ComponentHostDirective;

  constructor(public dialogRef: MatDialogRef<any>,
              private componentFactoryResolver: ComponentFactoryResolver,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.loadComponent();
  }

  done() {
    this.dialogRef.close();
  }

  loadComponent() {

    let {initializeComponent, component} = this.data;
    let componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(component);

    let viewContainerRef = this.cmpHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

    if (initializeComponent) {
      initializeComponent(componentRef);
    }

    if (
      ((<any>componentRef.instance).finished) &&
      ((<any>componentRef.instance).finished) instanceof EventEmitter
    ) {
      (<EventEmitter<any>>(<any>componentRef.instance).finished).subscribe(() => {
        this.done();
      });
    }

  }

}
