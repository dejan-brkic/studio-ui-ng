
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

import {Group} from './group.model';

export class Project {
  id: string;
  name: string;
  code: string;
  description: string;
  status;
  liveUrl;
  lastCommitId: string;
  publishingEnabled: number;
  publishingStatusMessage: string;
  groups: Array<Group>;
  blueprint: { id, label };

  static deserialize(json): Project {
    if (json === undefined || json === null) {
      return null;
    }
    let model = new Project();
    Object.keys(json).forEach(prop => {
      model[prop] = (prop === 'groups') ? /*Group.deserialize(json[prop])*/null : json[prop];
    });
    return model;
  }

  /**
   * Takes any info from `completer` and sets it to this instance. Does
   * not override any existing values on present instance.
   **/
  completeMissingInformation(completer: Project): void {
    let properties = Object.keys(completer);
    properties.forEach(propertyName => {
      this[propertyName] = this[propertyName] || completer[propertyName];
    });
  }
}

