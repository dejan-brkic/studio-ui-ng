
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

export class ArrayUtils {
  /**
   * Breaks the for if the callback returns true for any item. Returns true if broken
   * or false if it went through all items without break
   * @param collection: Array<any> The array
   * @param callback: (value, index, array) => boolean The callback fn
   **/
  static forEachBreak(collection, callback: (value, index, array) => boolean) {
    for (let i = 0, l = collection.length; i < l; ++i) {
      let item = collection[i];
      if (callback(item, i, collection)) {
        return true;
      }
    }
    return false;
  }

  static toArray(arrayLike: any): any[] {
    return Array.prototype.slice.call(arrayLike, 0);
  }
}
