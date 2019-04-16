// import { Action } from '@ngrx/store';
import * as actions from '../actions/sorters.actions';

export type NameSortKey = 'firstName' | 'lastName';
export interface State {
  sortDevelopersBy: NameSortKey;
}

const initialState: State = {
  sortDevelopersBy: 'firstName'
};

export function reducer(state: State = initialState, action: actions.SortActions): State {
  switch (action.type) {
    case actions.SORT_DEVELOPERS_BY: {
      return {
        sortDevelopersBy: action.sortKey
      };
    }
    default: {
      return state;
    }
  }
}
