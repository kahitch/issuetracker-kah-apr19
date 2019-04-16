import { Component, OnInit } from '@angular/core';
import { DeveloperListItem } from '../../models';
import { selectDeveloperListItems, State } from '../../reducers';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  devs$: Observable<DeveloperListItem[]>;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.devs$ = this.store.select(selectDeveloperListItems);
  }

}
