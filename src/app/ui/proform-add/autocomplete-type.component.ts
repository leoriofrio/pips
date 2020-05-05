import { Component, ViewChild, OnInit } from '@angular/core';

import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-autocomplete-type',
  template: `
    <input matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder">
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let value of filter | async" [value]="value">
        {{ value }}
      </mat-option>
    </mat-autocomplete>
  `,
})
export class AutocompleteTypeComponent extends FieldType implements OnInit {
  // Optional: only if you want to rely on `MatInput` implementation
  @ViewChild(MatInput) formFieldControl: MatInput;

  public filter: Observable<any[]>;

  ngOnInit() {
    //super.ngOnInit();
    /*this.filter = this.formControl.valueChanges.pipe(
        startWith(''),
        switchMap(term => this.to.filter(term)),
      );
    */
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */