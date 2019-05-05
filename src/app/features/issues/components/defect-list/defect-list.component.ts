import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DefectListItem } from '../../models/defects';
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

  constructor() { }

  ngOnInit() {
  }

}
