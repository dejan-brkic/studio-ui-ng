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
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  OnChanges
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CommunicationService } from '../../services/communication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ComponentBase } from '../../classes/component-base.class';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'std-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IFrameComponent extends ComponentBase implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, OnChanges {

  @ViewChild('frame') iFrameRef: ElementRef;

  @Output() load = new Subject();
  @Output() loading$ = new BehaviorSubject(false);
  @Output() beforeNav = new Subject();

  @Input() changeTrigger: any; // A(ny) secondary property to cause angular to call ngOnChanges
  @Input() spinner = false;

  private _communicates = false;

  @Input() src = 'about:blank';

  @Input()
  set communicates(communicates: boolean) {
    this._communicates = communicates;
    if (communicates) {
      this.setUpCommunications();
    } else {
      this.tearDownCommunications();
    }
  }

  get element() {
    return this.iFrameRef ? this.iFrameRef.nativeElement : null;
  }

  constructor(private communicator: CommunicationService) {
    super();
  }

  ngOnInit() {
    this.load
      .pipe(this.untilDestroyed())
      .subscribe(x => this.loading$.next(false));
  }

  ngOnDestroy() {
    this.tearDownCommunications();
  }

  ngAfterViewInit() {
    this.communicates = this._communicates;
  }

  ngAfterContentInit() {

  }

  ngOnChanges() {
    if (this.element) {
      this.reload();
    }
  }

  navigate(url: string) {
    this.loading$.next(true);
    this.beforeNav.next();
    this.element.src = this.src = (('about:blank' === url) ? url : `${environment.url.preview}${url}`);
  }

  reload() {
    this.navigate(this.src);
  }

  private setUpCommunications() {
    this.configureCommunications(true);
  }

  private tearDownCommunications() {
    this.configureCommunications(false);
  }

  private configureCommunications(setUp: boolean) {
    let
      iFrame = this.element,
      origin = window.location.origin;
    if (iFrame) {
      if (setUp) {
        this.communicator.addTarget(iFrame);
        // TODO: load from config e.g. environment.urlPreviewBase or otherwise
        this.communicator.addOrigin(origin);
      } else {
        this.communicator.removeTarget(iFrame);
        this.communicator.removeOrigin(origin);
      }
    }
  }

}
