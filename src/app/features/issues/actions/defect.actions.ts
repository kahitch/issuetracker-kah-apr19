import { Action } from '@ngrx/store';
import { DefectEntity } from '../reducers/defects.reducer';

export const LOAD_DEFECT = '[issues] load a defect for edit';
export class LoadDefect implements Action {
  readonly type = LOAD_DEFECT;
  constructor(public defect: DefectEntity) { }
}

export const LOAD_DEFECTS = '[issues] load the defects';
export class LoadDefects implements Action {
  readonly type = LOAD_DEFECTS;
  constructor() { }
}

export const LOAD_DEFECTS_SUCCESS = '[issues] load the defects succeeded';
export class LoadedDefectsSuccessfully implements Action {
  readonly type = LOAD_DEFECTS_SUCCESS;
  constructor(public payload: DefectEntity[]) { }
}
let currentId = 0;

export const ADDED_DEFECT = '[issues] defect added';
export class AddedDefect implements Action {
  readonly type = ADDED_DEFECT;
  public payload: DefectEntity;
  constructor(title: string, description: string, assignedTo: string) {
    this.payload = {
      id: 'T' + (++currentId),
      title,
      dateSubmitted: new Date().toISOString(),
      description,
      assignedTo,
      dateFixed: '',
      commitHashOfFix: ''
    };
  }
}

export const ADDED_DEFECT_SUCCESS = '[issues] added defect successfully';
export class SuccessfullyAddedADefect implements Action {
  readonly type = ADDED_DEFECT_SUCCESS;
  constructor(public oldId: string, public defect: DefectEntity) { }
}

export const ADDED_DEFECT_FAILURE = '[issues] added defect failure';
export class FailedAddingDefect implements Action {
  readonly type = ADDED_DEFECT_FAILURE;
  constructor(public errorMessage: string, public defect: DefectEntity) { }
}


export const UPDATED_DEFECT = '[issues] defect updated';
export class UpdatedDefect implements Action {
  readonly type = UPDATED_DEFECT;
  public payload: DefectEntity;
  constructor(defect: DefectEntity) {
    this.payload = defect;
  }
}

export const UPDATED_DEFECT_SUCCESS = '[issues] updated defect successfully';
export class SuccessfullyUpdatedDefect implements Action {
  readonly type = UPDATED_DEFECT_SUCCESS;
  constructor(public id: string, public defect: DefectEntity) { }
}

export const UPDATED_DEFECT_FAILURE = '[issues] updated defect failure';
export class FailedUpdatingDefect implements Action {
  readonly type = UPDATED_DEFECT_FAILURE;
  constructor(public errorMessage: string, public defect: DefectEntity) { }
}


export type DefectActions =
  LoadDefects
  | LoadedDefectsSuccessfully
  | AddedDefect
  | SuccessfullyAddedADefect
  | FailedAddingDefect
  | UpdatedDefect
  | SuccessfullyUpdatedDefect
  | FailedUpdatingDefect;
