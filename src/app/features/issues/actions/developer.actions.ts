import { Action } from '@ngrx/store';
import { DeveloperEntity } from '../reducers/developers.reducer';

export const LOAD_DEVELOPERS = '[issues] load the developers';
export class LoadDevelopers implements Action {
  readonly type = LOAD_DEVELOPERS;
  constructor() { }
}

export const LOAD_DEVELOPERS_SUCCESS = '[issues] load the developers succeeded';
export class LoadedDevelopersSuccessfully implements Action {
  readonly type = LOAD_DEVELOPERS_SUCCESS;
  constructor(public payload: DeveloperEntity[]) { }
}
let currentId = 0;

export const ADDED_DEVELOPER = '[issues] developer added';
export class AddedDeveloper implements Action {
  readonly type = ADDED_DEVELOPER;
  public payload: DeveloperEntity;
  constructor(firstName: string, lastName: string, team: string) {
    this.payload = {
      id: 'T' + (++currentId),
      firstName,
      lastName,
      team
    };
  }
}


export type DeveloperActions = LoadDevelopers | LoadedDevelopersSuccessfully | AddedDeveloper;
