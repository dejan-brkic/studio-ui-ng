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

// import { Subject } from 'rxjs/Subject';
// import { Subscription } from 'rxjs/Subscription';
// import { Communicator } from './communicator.class';
// import { WindowMessageTopicEnum } from '../enums/window-message-topic.enum';
// import { WindowMessageScopeEnum } from '../enums/window-message-scope.enum';
// import { WindowMessage } from './window-message.class';
//
// const SCOPED_SUBJECTS = 'SCOPED_SUBJECTS';
//
// export class Messenger extends Communicator {
//
//   private messages: Subject<WindowMessage>;
//   private subjects: { /* topic(WindowMessageTopicEnum): Subject<WindowMessage> */ };
//
//   constructor() {
//     super();
//     this.messages = new Subject<WindowMessage>();
//   }
//
//   protected processReceivedMessage(message: WindowMessage) {
//     if (this.subjects) {
//       if (this.subjects[message.scope] && this.subjects[message.scope][message.topic]) {
//         this.subjects[message.scope][message.topic].next(message);
//       }
//       if (this.subjects[message.topic]) {
//         this.subjects[message.topic].next(message);
//       }
//     }
//     this.messages.next(message);
//   }
//
//   subscribeTo(topic: WindowMessageTopicEnum, subscriber: (value) => void, scope?: WindowMessageScopeEnum): Subscription {
//     if (!this.subjects) {
//       this.subjects = {};
//     }
//
//     let
//       subject,
//       subjects = this.subjects;
//
//     if (scope) {
//       if (!subjects[SCOPED_SUBJECTS]) {
//         subjects[SCOPED_SUBJECTS] = {};
//       }
//       subjects = subjects[SCOPED_SUBJECTS];
//     }
//
//     if (!subjects[topic]) {
//       subjects[topic] = new Subject<WindowMessage>();
//     }
//
//     subject = <Subject<WindowMessage>>subjects[topic];
//     return subject.subscribe(subscriber);
//   }
//
//   subscribe(subscriber: (value) => void): Subscription {
//     return this.messages.subscribe(subscriber);
//   }
//
//   unsubscribe(): void {
//     this.messages.unsubscribe();
//   }
//
//   publish(topic: WindowMessageTopicEnum, data: any = null, scope: WindowMessageScopeEnum = WindowMessageScopeEnum.Broadcast) {
//     let message = new WindowMessage(topic, data, scope);
//     switch (message.scope) {
//       case WindowMessageScopeEnum.Local:
//         this.messages.next(message);
//         break;
//       case WindowMessageScopeEnum.External:
//         super.publish(topic, data, scope);
//         break;
//       case WindowMessageScopeEnum.Broadcast:
//         this.messages.next(message);
//         super.publish(topic, data, scope);
//         break;
//     }
//   }
//
// }
