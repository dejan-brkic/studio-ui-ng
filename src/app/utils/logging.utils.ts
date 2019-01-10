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

import { ColorsEnum } from '../enums/colors.enum';

// @see https://github.com/Qix-/color

const LogStyle = {
  DULL: '',
  TEXT_TEAL: `color: ${ColorsEnum.TEAL}`,
  TEXT_GREY: `color: ${ColorsEnum.GREY}`,
  TEXT_YELLOW: `color: ${ColorsEnum.YELLOW}`,
  TEXT_ORANGE: `color: ${ColorsEnum.ORANGE}`,
  TEXT_GREEN: `color: ${ColorsEnum.GREEN}`,
  TEXT_PINK: `color: ${ColorsEnum.PINK}`,
  TEXT_RED: `color: ${ColorsEnum.RED}`,
  TEAL: `background: ${ColorsEnum.TEAL}; color: #002F61`,
  GREY: `background: ${ColorsEnum.GREY}; color: #FFF`,
  YELLOW: `background: ${ColorsEnum.YELLOW}; color: #663300`,
  ORANGE: `background: ${ColorsEnum.ORANGE}; color: #FFF`,
  GREEN: `background: ${ColorsEnum.GREEN}; color: #007300`,
  PINK: `background: ${ColorsEnum.PINK}; color: #FFF`,
  RED: `background: ${ColorsEnum.RED}; color: #FFF`,
  BLUE: `background: ${ColorsEnum.BLUE}; color: #FFF`,
  PURPLE: `background: ${ColorsEnum.PURPLE}; color: #FFF`,
  BLACK: `background: ${ColorsEnum.BLACK}; color: #FFF`
};

type LogStyle = (typeof LogStyle)[keyof typeof LogStyle];

const CLEAR_CONSOLE = '$c';

const clearIfRequested = (anything) => {
  if (anything[anything.length - 1] === CLEAR_CONSOLE) {
    console.clear();
    anything.pop();
  }
};

const logReturn = () => {
  return `(${moment().format('[Logged @] HH:MM:SS')})`;
};

function log(...anything: any[]) {
  clearIfRequested(anything);
  console.log.apply(console, anything);
  return logReturn();
}

function pretty(style: LogStyle | string, ...anything) {
  // if ((typeof style !== 'string') || !(style.toUpperCase() in LogStyle)) {
  //   anything.unshift(style);
  // } else {
  //   style = (style.toUpperCase() in LogStyle) ? LogStyle[style.toUpperCase()] : style;
  // }
  style = (style.toUpperCase() in LogStyle) ? LogStyle[style.toUpperCase()] : style;
  let prettyPrintObjects = (anything[anything.length - 1] === '$o');
  // noinspection TsLint
  prettyPrintObjects && anything.pop();
  clearIfRequested(anything);
  anything.forEach(something => {
    let isString = (typeof something === 'string');
    if (isString) {
      console.log(`%c ${something} `, style);
    } else if (prettyPrintObjects) {
      console.log(`%c${JSON.stringify(something, null, '  ')}`, style);
    } else {
      console.log(something);
    }
  });
  return logReturn();
}

export { LogStyle, log, pretty };

export const global = () => {
  log['CLEAR'] = CLEAR_CONSOLE;
  pretty['CLEAR'] = CLEAR_CONSOLE;
  pretty['PPO'] = '$o';
  Object.keys(LogStyle).forEach(style => pretty[style] = LogStyle[style]);
  if (window.console) {
    window['pretty'] = pretty;
    window['log'] = log;
  }
};
