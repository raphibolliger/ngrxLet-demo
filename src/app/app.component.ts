import { Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { appFeature } from './store/app.feature';
import { AsyncPipe, NgIf } from '@angular/common';
import { filter, mergeMap } from 'rxjs';
import { CodeComponent } from './components/code/code.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, AsyncPipe, LetDirective, CodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  readonly value1$ = this.store.select(appFeature.selectValue1);
  readonly value1Filtered$ = this.store.select(appFeature.selectValue1).pipe(
    filter(value => value < 0),
  );

  readonly value2$ = this.store.select(appFeature.selectValue2);

  readonly firstNgIf: string = '````html\n<ng-container *ngIf="value1$ | async as value1">\n  {{ value1 }}\n</ng-container>';
  readonly firstNgrxLet: string = '````html\n<ng-container *ngrxLet="value1$ as value1">\n  {{ value1 }}\n</ng-container>';

  readonly secondNgIf: string = '````html\n<ng-container *ngIf="value1Filtered$ | async as value1">\n  {{ value1 }}\n</ng-container>';
  readonly secondNgrxLet: string = '````html\n<ng-container *ngrxLet="value1Filtered$ as value1">\n  {{ value1 }}\n</ng-container>';

  readonly thirdNgIf: string = '````html\n<ng-container *ngIf="value1$ | async as value1">\n  <ng-container *ngIf="value2$ | async as value2">\n    {{ value1 }} - {{ value2 }}\n  </ng-container>\n</ng-container>';
  readonly thirdNgrxLet: string = '````html\n<ng-container *ngrxLet="{ value1: value1$, value2: value2$ } as state">\n  {{ state.value1 }} - {{ state.value2 }}\n</ng-container>';

  readonly fourthNgIf: string = '````html\n<ng-container *ngIf="value1$ | async as value1">\n  <ng-container *ngIf="value1Filtered$ | async as value1Filtered">\n    {{ value1 }} - {{ value1Filtered }}\n  </ng-container>\n</ng-container>';
  readonly fourthNgrxLet: string = '````html\n<ng-container *ngrxLet="{ value1: value1$, value1Filtered: value1Filtered$ } as state">\n  {{ state.value1 }} - {{ state.value1Filtered }}\n</ng-container>';

  readonly fifthNgIf: string = '````html\n<ng-container *ngIf="value1$ | async as value1; else noValueIf">\n  {{ value1 }}\n</ng-container>\n<ng-template #noValueIf> No value - should be 0 </ng-template>';
  readonly fifthNgrxLet: string = '````html\n<ng-container *ngrxLet="value1Filtered$ as value1; suspenseTpl: noValueNgrx">\n  {{ value1 }}\n</ng-container>\n<ng-template #noValueNgrx> No value </ng-template>';

  constructor(private store: Store) {}
}
