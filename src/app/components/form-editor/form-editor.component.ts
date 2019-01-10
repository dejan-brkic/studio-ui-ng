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
import { Asset } from '../../models/asset.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'std-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {

  @Input() asset: Asset;

  source: SafeResourceUrl;

  loading = true;

  constructor(private sanitizer: DomSanitizer) {

  }

  ngOnInit() {

    const { asset, sanitizer } = this;

    this.source = sanitizer.bypassSecurityTrustResourceUrl(
      `http://35.171.38.46:8080/studio/form?site=${
        asset.projectCode}&form=${asset.contentModelId}&path=${
        `${asset.path}/${asset.fileName}`}&edit=true&editorId=ui-4-editor`
    );

  }

  load() {

  }

}
