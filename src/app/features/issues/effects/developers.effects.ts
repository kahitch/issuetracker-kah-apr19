import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as appActions from '../../../actions/app.actions';
import * as developerActions from '../actions/developer.actions';
import { HttpClient } from '@angular/common/http';
import { DeveloperEntity } from '../reducers/developers.reducer';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DeveloperEffects {
  readonly uri = 'http://localhost:3000/developers';

  @Effect() addDeveloper$ = this.action$
    .pipe(
      ofType(developerActions.ADDED_DEVELOPER),
      map(a => a as developerActions.AddedDeveloper),
      switchMap(originalAction => this.http.post<DeveloperEntity>(this.uri, originalAction.payload)
        .pipe(
          map(developerFromServer => new developerActions.SuccessfullyAddedADeveloper(originalAction.payload.id, developerFromServer)),
          catchError(r =>
            of(new developerActions.FailedAddingDeveloper('Cannot Add That Developer', originalAction.payload))
          )
        )
      )
    );

  @Effect() loadDevelopers$ = this.action$
    .pipe(
      ofType(developerActions.LOAD_DEVELOPERS),
      switchMap(() => this.http.get<{ data: DeveloperEntity[] }>(this.uri)
        .pipe(
          map(r => r.data),
          map(d => new developerActions.LoadedDevelopersSuccessfully(d))
        )
      )
    );

  // TODO: Add this to the environment


  constructor(private action$: Actions, private http: HttpClient) {

  }
}
