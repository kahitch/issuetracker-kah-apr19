import * as fromDevelopers from './developers.reducer';
import * as fromSorters from './sorters.reducer';
import * as fromUiHints from './ui-hints.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DeveloperListItem } from '../models';
export const featureName = 'issuesFeature';

export interface State {
  defects: fromDefects.State;
  developers: fromDevelopers.State;
  sorters: fromSorters.State;
  uiHints: fromUiHints.State;
}

export const reducers: ActionReducerMap<State> = {
  defects: fromDefects.reducer,
  developers: fromDevelopers.reducer,
  sorters: fromSorters.reducer,
  uiHints: fromUiHints.reducer
};


// 1 Feature Reducer
export const _selectIssuesFeature = createFeatureSelector<State>(featureName);

// 2 a Reducer per/branch
export const _selectDefectsBranch = createSelector(_selectIssuesFeature, b => b.defects);
export const _selectDevelopersBranch = createSelector(_selectIssuesFeature, b => b.developers);
export const _selectSortersBranch = createSelector(_selectIssuesFeature, b => b.sorters);
export const _selectUiHintsBranch = createSelector(_selectIssuesFeature, d => d.uiHints);
// 3 Any Helpers you might need.
export const { selectAll: _selectDefectEntities } = fromDevelopers.adapter.getSelectors(_selectDevelopersBranch);
export const _selectDefectListItemsUnsorted = createSelector(_selectDefectEntities, devs => devs as DeveloperListItem[]);
export const { selectAll: _selectDeveloperEntities } = fromDevelopers.adapter.getSelectors(_selectDevelopersBranch);
export const _selectDeveloperListItemsUnsorted = createSelector(_selectDeveloperEntities, devs => devs as DeveloperListItem[]);

// 4 The reducers you select from in your components/etc.
export const selectDefectsLoaded = createSelector(_selectUiHintsBranch, u => u.defectsLoaded);
export const selectDevelopersLoaded = createSelector(_selectUiHintsBranch, u => u.developersLoaded);

export const selectSortDeveloperListBy = createSelector(_selectSortersBranch, b => b.sortDevelopersBy);
// TODO: DeveloperListItem[]
export const selectDeveloperListItems = createSelector(_selectDeveloperListItemsUnsorted, selectSortDeveloperListBy,
  (list, sortKey) => {

    return [...list.sort((lhs: DeveloperListItem, rhs: DeveloperListItem) => {
      if (lhs[sortKey] < rhs[sortKey]) {
        return -1;
      }
      if (lhs[sortKey] > rhs[sortKey]) {
        return 1;
      }
      return 0;
    })];
  });
