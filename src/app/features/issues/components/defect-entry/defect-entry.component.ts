import { DefectListItem } from './../../models/defects';
import { Component, OnInit, ChangeDetectionStrategy, Input, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { AddedDefect, UpdatedDefect } from '../../actions/defect.actions';
import { DeveloperListItem } from '../../models';

@Component({
  selector: 'app-defect-entry',
  templateUrl: './defect-entry.component.html',
  styleUrls: ['./defect-entry.component.css'],  
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectEntryComponent implements OnInit {

  @Input() devs: DeveloperListItem[];
  @Input() defectForEdit: DefectListItem;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) { }

  defectForm: FormGroup;
  hasErrors = false;

  ngOnInit() {
    this.defectForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      dateSubmitted: [''],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      assignedTo: [''],
      dateFixed: [''],
      commitHashOfFix: ['', Validators.minLength(8)]
    });
  }

  onSubmit(focusMe: HTMLInputElement) {
    if (this.defectForm.valid) {
      const currentId = this.defectForm.get('id');
      if (currentId.value === "") {
        const { title, description, assignedTo } = this.defectForm.value;
        this.store.dispatch(new AddedDefect(title, description, assignedTo));
        this.defectForm.reset({ id: '', assignedTo: '' });
        focusMe.focus();
        this.hasErrors = false;
      } else {
        const defectToUpdate: DefectListItem = { ...this.defectForm.getRawValue() };
        this.store.dispatch(new UpdatedDefect(defectToUpdate));
        this.defectForm.reset({ id: '', assignedTo: '' });
        this.hasErrors = false;
      }
    } else {
      this.hasErrors = true;
    }
  }

  onReset(){
    this.defectForm.reset({ id: '', assignedTo: '' });
    let element = this.renderer.selectRootElement('#focusMe');
    element.focus();
  }

  loadDefectForEdit(defect: DefectListItem){
    this.defectForm.PatchValue(defect);
    let element = this.renderer.selectRootElement('#focusMe');
    element.focus();
  }

  get title() {
    return this.defectForm.get('title');
  }

  get description() {
    return this.defectForm.get('description');
  }

}
