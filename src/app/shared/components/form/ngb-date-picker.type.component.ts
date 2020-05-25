import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'formly-field-ngb-date-picker',
  template: `
    <div class="form-group">
      <label for="data_and_time">{{ to.label }}</label>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          [placeholder]="to.placeholder"
          ngbDatepicker          
          [formControl]="formControl"
          [formlyAttributes]="field"
        />
        
      </div>
    </div>
  `
})
/* tslint:disable 

#d="ngbDatepicker"

<div class="input-group-append" [hidden]="to.disabled">
          <fa-icon (click)="d.toggle()" [icon]="faCalendar" class="input-group-text"></fa-icon>
        </div>

*/
export class FormlyFieldNgbDatePicker extends FieldType {
  faCalendar = faCalendar;
}
