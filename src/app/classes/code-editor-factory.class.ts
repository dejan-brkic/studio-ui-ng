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
import { AssetTypeEnum } from '../enums/asset-type.enum';
import { CodeEditor, CodeEditorChoiceEnum } from './code-editor.abstract';
import { MonacoEditor } from './monaco-editor.class';
import { AceEditor } from './ace-editor.class';
import { MonacoDiffEditor } from './monaco-diff-editor.class';

export class CodeEditorFactory {
  static create(assetOrType: Asset | string): CodeEditor {
    let choice = CodeEditorFactory.choice(assetOrType);
    switch (choice) {
      case CodeEditorChoiceEnum.MONACO_DIFF:
        return new MonacoDiffEditor();
      case CodeEditorChoiceEnum.MONACO:
        return new MonacoEditor();
      case CodeEditorChoiceEnum.ACE:
      default:
        return new AceEditor();

    }
  }
  static choice(assetOrType: Asset | string): CodeEditorChoiceEnum {
    let type = (typeof assetOrType === 'string')
      ? <string>assetOrType
      : (<Asset>assetOrType).type;
    switch (type) {

      case CodeEditorChoiceEnum.MONACO_DIFF:
        return CodeEditorChoiceEnum.MONACO_DIFF;

      // Currently (December 2017) monaco provides OOTB rich IntelliSense for:
      // TypeScript, JavaScript, CSS, LESS, SCSS, JSON, HTML
      case AssetTypeEnum.CSS:
      case AssetTypeEnum.LESS:
      case AssetTypeEnum.SCSS:
      case AssetTypeEnum.JSON:
      case AssetTypeEnum.JAVASCRIPT:
      case AssetTypeEnum.TYPESCRIPT:
      // case AssetTypeEnum.HTML: // Ace has better emmet support, though.
      case CodeEditorChoiceEnum.MONACO:
        return CodeEditorChoiceEnum.MONACO;

      case AssetTypeEnum.HTML:
      case AssetTypeEnum.GROOVY:
      case AssetTypeEnum.FREEMARKER:
      case CodeEditorChoiceEnum.ACE:
      default:
        return CodeEditorChoiceEnum.ACE;

    }
  }
}
