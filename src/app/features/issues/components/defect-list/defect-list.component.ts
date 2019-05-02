import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DefectListItem } from '../../models/defects';
@Component({
  selector: 'app-defect-list',
  templateUrl: './defect-list.component.html',
  styleUrls: ['./defect-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectListComponent implements OnInit {

  @Input() defects: DefectListItem[];

  unassignedDefects: DefectListItem[];
  assignedDefects: DefectListItem[];
  completedDefects: DefectListItem[];

  constructor() { }

  ngOnInit() {
    this.unassignedDefects = this.defects.filter(e => e.assignedTo.length === 0);
    this.assignedDefects = this.defects.filter(e => e.assignedTo.length > 0 && e.dateFixed.length === 0);
    this.completedDefects = this.defects.filter(e => e.dateFixed.length > 0);
  }

}
