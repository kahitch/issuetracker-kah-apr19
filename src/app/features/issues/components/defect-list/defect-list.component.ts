import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DefectListItem } from '../../models/defects';
import { State, selectUnassignedDefectListItems } from '../../reducers';
import { UpdatedDefect } from '../../actions/defect.actions';

@Component({
  selector: 'app-defect-list',
  templateUrl: './defect-list.component.html',
  styleUrls: ['./defect-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectListComponent implements OnInit {

  @Input() unassignedDefects: DefectListItem[];
  @Input() assignedDefects: DefectListItem[];
  @Input() completedDefects: DefectListItem[];

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  unassignDefect(defect: DefectListItem) {
    defect.assignedTo = '';
    this.store.dispatch(new UpdatedDefect(defect));
  }

  loadDefectForEdit(defect: DefectListItem) {
    this.store.dispatch(new LoadDefect(defect));
  }

}
