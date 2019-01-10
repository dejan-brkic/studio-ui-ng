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

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { StringUtils } from '../../../utils/string.utils';
import { CommunicationService } from '../../../services/communication.service';
import { WindowMessageTopicEnum } from '../../../enums/window-message-topic.enum';
import { WindowMessageScopeEnum } from '../../../enums/window-message-scope.enum';
import { showSnackBar } from '../../../utils/material.utils';

@Component({
  selector: 'std-project-crud',
  templateUrl: './project-crud.component.html',
  styleUrls: ['./project-crud.component.scss']
})
export class ProjectCrUDComponent implements OnInit, OnDestroy {

  @Output() finished = new EventEmitter();

  editMode = false;
  creationRequestPending = false;
  runCreationInBackground = false;

  model = new Project();

  blueprints = [];

  nameFormControl = new FormControl('', [Validators.required]);
  codeFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', []);
  formGroup = new FormGroup({
    name: this.nameFormControl,
    code: this.codeFormControl,
    description: this.descriptionFormControl
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public userService: UserService,
              public groupService: GroupService,
              public projectService: ProjectService,
              private communicationService: CommunicationService) {
  }

  ngOnInit() {

    this.loadBlueprints();

    const subscriber = (params) => {
      if (params.projectCode || params.edit) {
        this.model.code = params.projectCode || params.edit;
        this.loadProject();
      }
    };

    this.route.url
    // @see https://github.com/angular/angular/issues/20299
      .subscribe(() => {
        let firstChild = this.route.firstChild;
        while (firstChild && firstChild.firstChild) {
          firstChild = firstChild.firstChild;
        }
        if (firstChild) {
          firstChild.params
            .subscribe(subscriber);
          firstChild.queryParams
            .subscribe(subscriber);
        }
      });

  }

  ngOnDestroy() {

  }

  loadProject() {
    this.projectService
      .byId(this.model.code)
      .subscribe((project) => {
        this.model = project;
        this.editMode = true;
        // if (this.blueprints.length) {}
      });
  }

  loadBlueprints() {
    this.projectService
      .allBlueprints()
      .subscribe((blueprints) => {
        this.blueprints = blueprints;
        this.model.blueprint = blueprints[0];
      });
  }

  autoProjectCode() {
    this.model.name = StringUtils.capitalizeWords(this.model.name || '');
    this.model.code = ((this.model.name || '')
      .replace(/\s+/g, '-')
      .toLowerCase());
  }

  create() {

    const closure = ((instance, router, snackBar, projectCode, projectName) => {
      return () => {
        instance.creationRequestPending = false;
        // if (instance.runCreationInBackground) { } else { }
        // TODO: Go to different place depending on user type?
        showSnackBar(snackBar, `${projectName} project created successfully.`, 'Project Dashboard')
          .onAction()
          .subscribe(() => {
            if (!instance.runCreationInBackground) {
              instance.done();
            }
            router.navigate(['/project', projectCode, 'dashboard']);
          });
        instance.communicationService.publish(
          WindowMessageTopicEnum.PROJECT_CREATED,
          null, WindowMessageScopeEnum.Local);
      };
    })(this, this.router, this.snackBar, this.model.code, this.model.name);

    this.creationRequestPending = true;
    this.projectService
      .create(this.model)
      .subscribe(closure);

  }

  runProjectCreationInBackground() {
    this.runCreationInBackground = true;
    this.done();
  }

  update() {
    this.projectService
      .update(this.model);
  }

  delete() {
    this.projectService
      .delete(this.model)
      .subscribe(() => {
        this.done();
        showSnackBar(this.snackBar, `${this.model.name} project deleted successfully.`);
      });
  }

  done() {
    this.finished.emit();
  }

}
