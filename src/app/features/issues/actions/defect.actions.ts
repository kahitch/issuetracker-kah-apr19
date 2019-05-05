import { Action } from '@ngrx/store';
import { DefectListItem as DefectEntity } from '../models/defects';

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


export type DefectActions =
  LoadDefects
  | LoadedDefectsSuccessfully
  | AddedDefect
  | SuccessfullyAddedADefect
  | FailedAddingDefect;
