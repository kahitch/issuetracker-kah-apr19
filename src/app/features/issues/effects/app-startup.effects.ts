import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import * as developerActions from '../actions/developer.actions';
import * as defectActions from '../actions/defect.actions';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AppStartUpEffects {

  @Effect() addingADeveloperDoneBlewedUp$ = this.action$
    .pipe(
      ofType(developerActions.ADDED_DEVELOPER_FAILURE),
      map(a => a as developerActions.FailedAddingDeveloper),
      map(a => new appActions.ApplicationError(a.errorMessage, 'issues'))
    );

  @Effect() startup$ = this.action$
    .pipe(
      ofType(appActions.APP_START),
      concatMap(() => [
        new developerActions.LoadDevelopers(),
        new defectActions.LoadDefects()
      ])
    );
  constructor(private action$: Actions) { }
}
