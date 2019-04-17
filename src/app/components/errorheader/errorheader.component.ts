import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, selectHasError, selectErrorMessage } from 'src/app/reducers';

@Component({
  selector: 'app-errorheader',
  templateUrl: './errorheader.component.html',
  styleUrls: ['./errorheader.component.css']
})
export class ErrorheaderComponent implements OnInit {

  hasError$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.hasError$ = this.store.select(selectHasError);
    this.errorMessage$ = this.store.select(selectErrorMessage);

  }

}
