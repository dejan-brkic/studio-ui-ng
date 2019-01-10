
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

export enum AssetTypeEnum {

  UNKNOWN = 'UNKNOWN',

  PAGE = 'PAGE', // application/xml
  FOLDER = 'FOLDER', // application/octet-stream
  COMPONENT = 'COMPONENT',
  DOCUMENT = 'DOCUMENT',
  ASSET = 'ASSET', // many (css, js, ...)
  LEVEL_DESCRIPTOR = 'LEVEL_DESCRIPTOR', // application/xml

  // Images
  SVG = 'svg image',
  JPEG = 'jpeg image',
  GIF = 'gif image',
  PNG = 'png image',

  // Video
  MP4 = 'mp4 video',

  // AUDIO
  MPEG = 'audio mpeg',

  // Web/Code
  JSON = 'json',
  HTML = 'html',
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  GROOVY = 'groovy',
  CSS = 'css',
  SCSS = 'scss',
  SASS = 'sass',
  LESS = 'less',
  FREEMARKER = 'freemarker',
  XML = 'XML',
  // Fonts
  EOT_FONT = 'eot font',
  OTF_FONT = 'otf font',
  TTF_FONT = 'ttf font',
  WOFF_FONT = 'woff font',
  WOFF2_FONT = 'woff2 font',

}
