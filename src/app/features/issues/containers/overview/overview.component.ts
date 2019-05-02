import { Component, OnInit } from '@angular/core';
import { selectDefectListItems, State, selectDefectsLoaded } from '../../reducers';
import { DefectListItem } from '../../models/defects';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  defectsLoaded$: Observable<boolean>;
  defects$: Observable<DefectListItem[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.defects$ = this.store.select(selectDefectListItems);
    this.defectsLoaded$ = this.store.select(selectDefectsLoaded);
  }
}



