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

import { environment } from '../../environments/environment';
import { APIParser } from '../classes/api-parser.abstract';
import { API1Parser } from '../classes/api1-parser.class';
import { StudioModel, StudioModels } from './type.utils';

export function parserFactory(apiVersion?) {
  return APIParserHelper.parserFactory(apiVersion);
}

export function parseEntity(classType: StudioModels,
                            JSONObject: any): StudioModel {
  return APIParserHelper.parse(classType, JSONObject);
}

export class APIParserHelper {

  private static instance = null;

  static parserFactory(apiVersion: StudioAPIVersion = environment.apiVersion): APIParser {
    switch (apiVersion) {
      case 'v3':
        return new API1Parser();
    }
  }

  static parse(classType: StudioModels,
               JSONObject: any): StudioModel {
    let parser = this.instance || (this.instance = parserFactory());
    return parser.parseEntity(classType, JSONObject);
  }
}
