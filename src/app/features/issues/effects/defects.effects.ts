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
          map(defectFromServer => new defectActions.SuccessfullyAddedADefect(originalAction.payload.id, defectFromServer)),
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


  @Effect() updateDefect$ = this.action$
    .pipe(
      ofType(defectActions.UPDATED_DEFECT),
      map(a => a as defectActions.UpdatedDefect),
      switchMap(originalAction => this.http.put<DefectEntity>(this.uri, originalAction.payload)
        .pipe(
          map(defectFromServer => new defectActions.SuccessfullyUpdatedDefect(originalAction.payload.id, defectFromServer)),
          catchError(r =>
            of(new defectActions.FailedUpdatingDefect('Cannot Update That Defect', originalAction.payload))
          )
        )
      )
    );

  constructor(private action$: Actions, private http: HttpClient) {

  }
}
