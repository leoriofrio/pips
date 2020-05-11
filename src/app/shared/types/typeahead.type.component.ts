import { Component, EventEmitter, OnDestroy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Subject } from 'rxjs/internal/Subject';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { startWith } from 'rxjs/internal/operators/startWith';
import { filter } from 'rxjs/internal/operators/filter';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

@Component({
  selector: 'formly-field-typeahead',
  template: `
    <ng-select [items]="options$ | async"
      [placeholder]="to.placeholder"
      [typeahead]="search$"
      [formControl]="formControl">
    </ng-select>
  `,
})
export class FormlyFieldTypeahead extends FieldType implements OnDestroy {
  onDestroy$ = new Subject<void>();
  search$ = new EventEmitter();
  options$;

  ngOnInit() {
    this.options$ = this.search$.pipe(
      takeUntil(this.onDestroy$),
      startWith(''),
      filter(v => v !== null),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(this.to.search$),
    );
    
    this.options$.subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.complete();
  }
}