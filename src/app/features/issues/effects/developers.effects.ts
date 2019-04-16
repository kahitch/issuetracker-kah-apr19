import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as appActions from '../../../actions/app.actions';
import * as developerActions from '../actions/developer.actions';
import { HttpClient } from '@angular/common/http';
import { DeveloperEntity } from '../reducers/developers.reducer';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class DeveloperEffects {
  readonly uri = 'http://localhost:3000/developers';

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
