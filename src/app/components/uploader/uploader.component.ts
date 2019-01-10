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

import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import * as Uppy from 'uppy';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ComponentBase } from '../../classes/component-base.class';
import { dispatch, NgRedux } from '@angular-redux/store';
import { AppState } from '../../classes/app-state.interface';
import { notNullOrUndefined } from '../../app.utils';

const HEADER = environment.auth.header;
const COOKIE = environment.auth.cookie;
const ENDPOINT = `${environment.apiUrl}/content/write-content.json`;

@Component({
  selector: 'std-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent extends ComponentBase implements AfterViewInit {

  @ViewChild('uploaderTarget') uploaderTarget: ElementRef;

  private token: string;

  constructor(store: NgRedux<AppState>,
              cookie: CookieService,
              private translate: TranslateService,
              @Inject(MAT_DIALOG_DATA)
              private data: { files, site, path }) {
    super();
    this.token = cookie.get(COOKIE);
  }

  ngAfterViewInit() {
    this.uppyfy();
  }

  @dispatch()
  uppyDispatch(action) {
    return action;
  }

  uppyfy() {

    let { uploaderTarget, translate, data, token } = this;

    let params = new URLSearchParams();

    params.set('createFolders', 'true');
    params.set('draft', 'false');
    params.set('duplicate', 'false');
    params.set('unlock', 'true');

    const uppy = new Uppy.Core({
      id: 'studio',
      meta: {
        site: data.site,
        path: data.path
      },
      debug: true,
      restrictions: {},
      autoProceed: false
    });

    uppy
      .use(Uppy.Dashboard, {
        inline: true,
        target: uploaderTarget.nativeElement,
        showProgressDetails: true,
        replaceTargetContent: true,
        note: 'Images and video only, 2–3 files, up to 1 MB',
        maxHeight: '100%',
        metaFields: [
          {
            id: 'description',
            name: translate.instant('Description'),
            placeholder: translate.instant('Description')
          },
          {
            id: 'tags',
            name: translate.instant('Tags'),
            placeholder: translate.instant('Tags')
          }
        ]
      })
      .use(Uppy.XHRUpload, {
        fieldName: 'file',
        formData: true,
        withCredentials: true,
        headers: { [HEADER]: token },
        endpoint: `${ENDPOINT}?${params.toString()}`
      })
      .use(Uppy.ReduxStore, {
        dispatch: this.uppyDispatch,
        action: (previous, next, patch) => ({ type: 'UPPY_STATE_UPDATE', previous, next, patch })
      })
      .run();

    // uppy.on('upload-success', (fileId, response, uploadURL) => {
    //   console.log(fileId, response, uploadURL);
    // });

    // uppy.on('complete', result => {
    //   console.log(result.successful, result.failed);
    // });

    if (notNullOrUndefined(data.files)) {
      uppy.plugins.orchestrator[0].handleDrop(data.files);
    }

    this.addTearDown(() => {
      uppy.close();
      this.uppyDispatch({
        type: 'UPPY_STATE_UPDATE',
        patch: { plugins: null, capabilities: null, meta: null, info: null }
      });
    });

  }

}
