import { Action } from '@ngrx/store';
import * as fromDefectActions from '../actions/defect.actions';
import * as fromDeveloperActions from '../actions/developer.actions';


export interface State {
  developersLoaded: boolean;
  defectsLoaded: boolean;
}

const initialState: State = {
  developersLoaded: false,
  defectsLoaded: false
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case fromDeveloperActions.LOAD_DEVELOPERS: {
      return {
        developersLoaded: false,
        defectsLoaded: state.defectsLoaded
      };
    }
    case fromDeveloperActions.LOAD_DEVELOPERS_SUCCESS: {
      return {
        developersLoaded: true,
        defectsLoaded: state.defectsLoaded
      };
      // return Object.assign({}, state, { developersLoaded: true });
    }
    case fromDefectActions.LOAD_DEFECTS: {
      return {
        developersLoaded: state.developersLoaded,
        defectsLoaded: false
      };
    }
    case fromDefectActions.LOAD_DEFECTS_SUCCESS: {
      return {
        developersLoaded: state.developersLoaded,
        defectsLoaded: true
      };
    }
    default: {
      return state;
    }
  }
}

