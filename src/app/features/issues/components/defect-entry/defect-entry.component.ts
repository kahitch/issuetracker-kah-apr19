import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { AddedDefect } from '../../actions/defect.actions';
import { DeveloperListItem } from '../../models';

@Component({
  selector: 'app-defect-entry',
  templateUrl: './defect-entry.component.html',
  styleUrls: ['./defect-entry.component.css']
})
export class DefectEntryComponent implements OnInit {

  @Input() devs: DeveloperListItem[];

  constructor(private formBuilder: FormBuilder, private store: Store<State>) { }

  defectForm: FormGroup;
  hasErrors = false;

  ngOnInit() {
    this.defectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      assignedTo: ['']
    });
  }

  onSubmit(focusMe: HTMLInputElement) {
    if (this.defectForm.valid) {
      const { title, description, assignedTo } = this.defectForm.value;
      this.store.dispatch(new AddedDefect(title, description, assignedTo));
      this.defectForm.reset({ assignedTo: '' });
      focusMe.focus();
      this.hasErrors = false;
    } else {
      this.hasErrors = true;
    }
  }

  get title() {
    return this.defectForm.get('title');
  }
  get description() {
    return this.defectForm.get('description');
  }

}
