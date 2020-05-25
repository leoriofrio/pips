import {Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
@Component({
  selector: 'formly-field-ngb-date-picker',
  template: `
    <div class="form-group">
      <div class="input-group mb-3">
        <ngb-timepicker [formControl]="formControl" [meridian]="to.meridian"></ngb-timepicker>
      </div>
    </div>
  `
})
/* tslint:disable */
export class FormlyFieldNgbTimePicker extends FieldType {
  public value;
}
