
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
import { Group } from '../models/group.model';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { getRandomAvatar } from '../app.utils';

export class API2Parser {
  static asset(json: any): Asset {
    if (json == null) {
      return null;
    }
    return undefined;
  }

  static group(json: any): Group {
    if (json == null) {
      return null;
    }
    return {
      id: json.id,
      name: json.name,
      description: json.desc
    };
  }

  static project(json: any): Project {
    if (json == null) {
      return null;
    }
    return undefined;
  }

  static user(json: any): User {
    if (json == null) {
      return null;
    }
    return {
      id: json.id,
      firstName: json.firstName,
      lastName: json.lastName,
      password: null,
      username: json.username,
      externallyManaged: json.externallyManaged,
      authenticationType: json.authenticationType,
      avatarUrl: getRandomAvatar(),
      email: json.email,
      enabled: json.enabled
    };
  }

}

export class API2Serializer {
  static group(group: Group) {
    return {
      id: group.id,
      name: group.name,
      desc: group.description
    };
  }
}
