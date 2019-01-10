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

import { Asset } from '../models/asset.model';
import { User } from '../models/user.model';
import { Group } from '../models/group.model';
import { Project } from '../models/project.model';
import { StudioModel, StudioModels } from '../utils/type.utils';

export abstract class APIParser {

  constructor() {

  }

  protected abstract asset(json: any): Asset;

  protected abstract user(json: any): User;

  protected abstract group(json: any): Group;

  protected abstract project(json: any): Project;

  parseEntity(classType: StudioModels, JSONObject: any): StudioModel {
    switch (classType) {
      case 'Project':
        return this.project(JSONObject);
      case 'Asset':
        return this.asset(JSONObject);
      case 'User':
        return this.user(JSONObject);
      case 'Group':
        return this.group(JSONObject);
    }
  }

}

// declare type APIParserFn<T> = (type: T, json: any) => T;

// export interface APIParser {
//   static parseEntity<T>(type: T, JSONObject: any): T;
// }

// declare type APIParser<T> = {
//   parseEntity: APIParserFn<T>;
// };

// tslint:disable-next-line:interface-over-type-literal
// declare type APIParser<T, R> = {
//   parseEntity: (type: T, json: any) => R;
// };

// export type StudioAPIVersion = 'v3' | 'v4';
