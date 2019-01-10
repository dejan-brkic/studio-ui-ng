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

import { isNullOrUndefined, isString } from 'util';
import { v4 as uuid } from 'uuid';
import {
  EntityLookupTable,
  LookupTable, ModelState,
  PreviewTab,
  PreviewTabCore,
  PreviewTabHistory,
  PreviewTabStateContainer, StateEntity,
  Workspace
} from '../classes/app-state.interface';
import { notNullOrUndefined } from '../app.utils';
import { APIResponse } from '../models/service-payloads';
import { Actions } from '../enums/actions.enum';

const DEFAULT_TAB_TITLE = '...';

export const createEntityState =
  <T>({
        order = undefined as any[],
        error = {  },
        loading = {  } as { [key: string]: boolean },
        byId = {} as EntityLookupTable<any>
      }): StateEntity<T> => {
    let obj: StateEntity<any> = {
      error,
      loading,
      byId
    };
    if (!isNullOrUndefined(order)) {
      obj.order = order;
    }
    return obj;
  };

export function createLookupTable<T>(items: T[], idProp = 'id'): EntityLookupTable<T> {
  return items
    .reduce((lookupTable: Object, item: T) => {
      // in the case of assets, some virtual assets are created by the API (e.g. for the dashlets) to
      // group assets. If it doesn't have an ID it won't be tracked in the lookup table
      if (item[idProp]) {
        lookupTable[item[idProp]] = item;
        if (notNullOrUndefined(item['children'])) {
          Object.assign(lookupTable, createLookupTable(item['children'], idProp));
        }
      }
      return lookupTable;
    }, {});
}

export const createPreviewTabHistory =
  ({
     index = undefined as number,
     hasBack = false,
     hasForward = false,
     initialEntry = undefined as PreviewTabCore
   }): PreviewTabHistory => ({
    index: isNullOrUndefined(index) ? isNullOrUndefined(initialEntry) ? -1 : 0 : index,
    hasBack,
    hasForward,
    entries: isNullOrUndefined(initialEntry) ? [] : [initialEntry]
  });

export const createPreviewTabHistoryEntry =
  ({ url, projectCode, assetId, title }): PreviewTabCore => ({
    url,
    title,
    projectCode,
    assetId
  });

export const createPreviewTab =
  ({ projectCode, url, assetId = null as string, title = DEFAULT_TAB_TITLE }): PreviewTab => ({
    id: uuid(),
    pending: true,
    url,
    title,
    projectCode,
    assetId,
    history: createPreviewTabHistory({ initialEntry: { projectCode, url, assetId, title } })
  });

export const createPreviewTabCore =
  ({ projectCode, url, title = DEFAULT_TAB_TITLE, assetId = null as string }): PreviewTabCore => ({
    url,
    title,
    projectCode,
    assetId
  });

export const createPreviewTabStateContainer =
  ({
     activeId = undefined as string,
     order = undefined as string[],
     byId = undefined as LookupTable<PreviewTab>
   }): PreviewTabStateContainer => {
    let tab;
    if (isNullOrUndefined(byId)) {
      tab = createPreviewTab({
        url: '',
        title: '',
        assetId: null,
        projectCode: null
      });
      byId = { [tab.id]: tab };
    }
    if (isNullOrUndefined(activeId)) {
      activeId = tab.id;
    }
    if (isNullOrUndefined(order)) {
      order = Object.values(byId).map(value => value.id);
    }
    // Ensure each tab has a history
    order.forEach(tabId => {

    });

    byId = order.reduce((nextById, tabId) => {
      let value = byId[tabId];
      nextById[tabId] = !isNullOrUndefined(value.history)
        ? value
        : {
          ...value,
          ...{
            history: createPreviewTabHistory({
              initialEntry: {
                assetId: value.assetId,
                projectCode: value.projectCode,
                title: value.projectCode,
                url: value.url
              }
            })
          }
        };
      return nextById;
    }, {});

    return {
      order,
      activeId,
      byId
    };
  };

export const createProjectState =
  ({
     settings = {},
     previewTabs = createPreviewTabStateContainer({}),
     selectedItems = {},
     expandedPanels = {},
     expandedPaths = {}
   }): Workspace => ({
    settings,
    previewTabs,
    selectedItems,
    expandedPanels,
    expandedPaths
  });

export function popActionResult<T extends ModelState = ModelState>(state: T, key: string): T {
  const results = { ...state.results };
  delete results[key];
  return {
    ...(state as any),
    results
  };
}

export function createKey(actionType: string, ...modifiers: Array<string | number>): string {
  return `${actionType}${modifiers.map(m => `[${m}]`).join('')}`;
}
