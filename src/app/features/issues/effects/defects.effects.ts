import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as appActions from '../../../actions/app.actions';
import * as defectActions from '../actions/defect.actions';
import { HttpClient } from '@angular/common/http';
import { DefectEntity } from '../reducers/defects.reducer';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DefectEffects {
  readonly uri = 'http://localhost:3000/defects';

  @Effect() addDefect$ = this.action$
    .pipe(
      ofType(defectActions.ADDED_DEFECT),
      map(a => a as defectActions.AddedDefect),
      switchMap(originalAction => this.http.post<DefectEntity>(this.uri, originalAction.payload)
        .pipe(
          map(developerFromServer => new defectActions.SuccessfullyAddedADefect(originalAction.payload.id, developerFromServer)),
          catchError(r =>
            of(new defectActions.FailedAddingDefect('Cannot Add That Defect', originalAction.payload))
          )
        )
      )
    );

  @Effect() loadDefect$ = this.action$
    .pipe(
      ofType(defectActions.LOAD_DEFECTS),
      switchMap(() => this.http.get<{ data: DefectEntity[] }>(this.uri)
        .pipe(
          map(r => r.data),
          map(d => new defectActions.LoadedDefectsSuccessfully(d))
        )
      )
    );

  // TODO: Add this to the environment


  constructor(private action$: Actions, private http: HttpClient) {

  }
}
