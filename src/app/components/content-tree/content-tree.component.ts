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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITreeOptions, TREE_ACTIONS, TreeNode, ITreeState } from 'angular-tree-component';
import { NgRedux } from '@angular-redux/store';

import { ContentService } from '../../services/content.service';
import { Asset } from '../../models/asset.model';
import { WorkflowService } from '../../services/workflow.service';
import { AppState, Workspace } from '../../classes/app-state.interface';
import { ExpandedPathsActions } from '../../actions/expanded-paths.actions';
import { WithNgRedux } from '../../classes/with-ng-redux.class';
import { AssetActions } from '../../actions/asset.actions';
import { Subject } from 'rxjs/Subject';
import { notNullOrUndefined, orderAssetsFoldersFirst } from '../../app.utils';
import { denormalize } from '../../reducers/assets.entity.reducer';

@Component({
  selector: 'std-content-tree',
  templateUrl: './content-tree.component.html',
  styleUrls: ['./content-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTreeComponent
  extends WithNgRedux
  implements OnInit, OnChanges {

  @Input() rootPath: string;
  @Input() showRoot = true;
  @Input() project;

  nodes;
  rootItem: Asset;
  options: ITreeOptions;
  treeState: ITreeState = {
    expandedNodeIds: {},
    activeNodeIds: {},
    hiddenNodeIds: {},
    focusedNodeId: null
  };

  ngOnChanges$ = new Subject();

  constructor(store: NgRedux<AppState>,
              private contentService: ContentService,
              private workflowService: WorkflowService,
              private assetActions: AssetActions,
              private detector: ChangeDetectorRef) {
    super(store);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChanges$.next();
  }

  ngOnInit() {

    this.addTearDown(() => {
      this.ngOnChanges$.complete();
    });

    this.pipeFilterAndTakeUntil(
      this.store.select(['workspaceRef']))
      .subscribe((workspace: Workspace) => {
        this.treeState.expandedNodeIds = workspace.expandedPaths;
      });

    this.ngOnChanges$.subscribe(() => {
      this
        .fetch(`${this.project.code}:${this.rootPath}`)
        .then(item => this.rootPathLoaded(item));
    });

    this.setTreeOptionDefaults();

    this.ngOnChanges$.next();

  }

  expandedPathsStateChanged(expandedPaths) {
    let treeState = this.treeState;
    treeState.expandedNodeIds = Object.assign({}, expandedPaths);
    // Object.keys(expandedPaths).forEach(key => treeState.expandedNodeIds[key] = true);
  }

  treeToggleExpanded(event: { isExpanded: boolean, node: { data: Asset } }) {
    let
      id = event.node.data.id,
      expanded = event.isExpanded;
    this.dispatch(
      expanded
        ? ExpandedPathsActions.expand(id)
        : ExpandedPathsActions.collapse(id));
  }

  treeStateChanged(treeState: ITreeState) {
    let
      source = treeState.expandedNodeIds,
      treeExpanded = Object.keys(source)
        .filter(key => source[key]);
    // noinspection TsLint
    treeExpanded.length && this.store.dispatch(ExpandedPathsActions.expandMany(treeExpanded));
  }

  treeItemClicked(tree, node, $event) {
    if (node.isCollapsed) {
      TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    }
  }

  private fetch(uid: string): Promise<Asset> {
    let table = this.state.entities.assets.byId;
    if (notNullOrUndefined(table[uid]) && notNullOrUndefined(table[uid].children)) {
      return new Promise((resolve) => {
        // Give the tree a chance to show loading message
        setTimeout(() => resolve(denormalize(table[uid], table)));
      });
    } else {
      return this.contentService
        .tree(uid)
        .toPromise()
        .then(item => {
          this.dispatch(this.assetActions.gotten(item));
          return item;
        });
    }
  }

  private setTreeOptionDefaults() {
    this.options = {
      displayField: 'label',
      idField: 'id',
      childrenField: 'children',
      nodeHeight: 23,
      animateSpeed: 30,
      animateAcceleration: 1.2,
      allowDrag: false,
      allowDrop: false,
      animateExpand: false,
      useVirtualScroll: false,
      getChildren: (node: TreeNode) => {
        return this
          .fetch((<Asset>node.data).id)
          .then(item => orderAssetsFoldersFirst(item.children));
      },
      actionMapping: {
        mouse: {
          click: (tree, node, $event) => {
            let classes = $event.target.className;
            if (!(classes.includes('material-icons') || classes.includes('asset-menu'))) {
              this.treeItemClicked(tree, node, $event);
            }
          }
        }
      }
    };
  }

  private rootPathLoaded(asset: Asset) {

    let copy = Asset.deserialize(asset);
    if (copy.hasChildren) {
      copy.children = orderAssetsFoldersFirst(copy.children);
    }

    this.rootItem = copy;

    if (this.showRoot) {
      this.nodes = [copy];
    } else {
      this.nodes = copy.children || [];
    }

    this.detector.detectChanges();

  }

}
