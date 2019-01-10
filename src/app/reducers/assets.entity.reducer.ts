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

import { AnyAction, Reducer } from 'redux';

import { Actions } from '../enums/actions.enum';
import { LookupTable, StateEntity } from '../classes/app-state.interface';
import { createEntityState, createLookupTable } from '../utils/state.utils';
import { Asset } from '../models/asset.model';
import { notNullOrUndefined } from '../app.utils';

export function flatten(array: Asset[]): Asset[] {
  let flat = [];
  array.forEach(asset => {
    let nextAsset = Asset.deserialize(asset);
    nextAsset.children ? (flat = flat.concat(nextAsset, ...flatten(<Asset[]>nextAsset.children))) : flat.push(nextAsset);
  });
  return flat;
}

export function normalize(model: Asset): Asset {
  if (notNullOrUndefined(model.children)) {
    let nextModel = Asset.deserialize(model);
    nextModel.children = null;
    // children ids already set by model class itself on childrenIds prop
    return nextModel;
  }
  return model;
}

export function denormalize(model: Asset, table: LookupTable<Asset>): Asset {
  if (notNullOrUndefined(model.children)) {
    let nextModel = Asset.deserialize(model);
    nextModel.children = model.childrenIds.map(child => table[child]);
    return nextModel;
  }
  return model;
}

export const assets: Reducer<StateEntity<Asset>> =
  (state = createEntityState<Asset>({}), action: AnyAction): StateEntity<Asset> => {
    switch (action.type) {

      case Actions.FETCH_ASSETS:
        return {
          ...state,
          loading: { ...state.loading }
        };

      case Actions.ASSETS_FETCHED:
        return createEntityState({
          byId: createLookupTable<Asset>(flatten(action.payload).map(a => normalize(a)))
        });

      case Actions.SOME_ASSETS_FETCHED:
        return createEntityState({
          byId: {
            ...state.byId || {},
            ...createLookupTable<Asset>(flatten(action.payload).map(a => normalize(a)))
          }
        });

      case Actions.FETCH_ASSET:
        return {
          ...state,
          loading: { ...state.loading, [action.payload.id]: true }
        };

      case Actions.ASSET_FETCH_ERROR:
        return {
          ...state,
          error: { ...state.error, [action.payload.id]: true },
          loading: { ...state.loading, [action.payload.id]: false }
        };

      case Actions.ASSET_FETCHED:
        return {
          ...state,
          error: { ...state.error, [action.payload.id]: false },
          loading: { ...state.loading, [action.payload.id]: false },
          byId: {
            ...state.byId,
            ...createLookupTable<Asset>(flatten([action.payload]).map(a => normalize(a)))
          }
        };

      case Actions.CREATE_ASSET:
        return state;

      case Actions.UPDATE_ASSET:
        return state;

      case Actions.DELETE_ASSET:
        return state;

      case Actions.ASSET_CREATED:
        return state;

      case Actions.ASSET_UPDATED:
        return state;

      case Actions.ASSET_DELETED:
        return state;

      default:
        return state;

    }
  };
