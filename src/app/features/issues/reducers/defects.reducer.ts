// import { Action } from '@ngrx/store';
import * as actions from '../actions/defect.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { DeveloperListItem } from '../models';

export interface DefectEntity {
  id: string;
  title: string;
  dateSubmitted: string;
  description: string;
  assignedTo: DeveloperListItem;
  dateFixed: string;
  commitHashOfFix: string;
}

export interface State extends EntityState<DefectEntity> {

}
export const adapter = createEntityAdapter<DefectEntity>();
const initialState: State = adapter.getInitialState();


export function reducer(state: State = initialState, action: actions.DefectActions): State {
  switch (action.type) {
    case actions.ADDED_DEFECT_FAILURE: {
      return adapter.removeOne(action.defect.id, state);
    }
    case actions.ADDED_DEFECT_SUCCESS: {
      const tempState = adapter.removeOne(action.oldId, state);
      return adapter.addOne(action.defect, tempState);
    }
    case actions.ADDED_DEFECT: {
      return adapter.addOne(action.payload, state);
    }
    case actions.LOAD_DEFECTS_SUCCESS: {
      return adapter.addAll(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
