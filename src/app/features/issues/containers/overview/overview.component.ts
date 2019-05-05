import { Component, OnInit } from '@angular/core';
import {
  selectUnassignedDefectListItems,
  State,
  selectDefectsLoaded,
  selectAssignedDefectListItems,
  selectCompletedDefectListItems,
  selectDeveloperListItems,
  selectDevelopersLoaded
} from '../../reducers';
import { DefectListItem } from '../../models/defects';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DeveloperListItem } from '../../models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  defectsLoaded$: Observable<boolean>;
  unassignedDefects$: Observable<DefectListItem[]>;
  assignedDefects$: Observable<DefectListItem[]>;
  completedDefects$: Observable<DefectListItem[]>;
  developersLoaded$: Observable<boolean>;
  devs$: Observable<DeveloperListItem[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.unassignedDefects$ = this.store.select(selectUnassignedDefectListItems);
    this.assignedDefects$ = this.store.select(selectAssignedDefectListItems);
    this.completedDefects$ = this.store.select(selectCompletedDefectListItems);
    this.defectsLoaded$ = this.store.select(selectDefectsLoaded);
    this.devs$ = this.store.select(selectDeveloperListItems);
    this.developersLoaded$ = this.store.select(selectDevelopersLoaded);
  }
}



