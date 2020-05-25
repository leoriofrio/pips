import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgGridModule} from 'ag-grid-angular';
import { ProjectComponent } from './components/project/project.component';
import { GridComponent } from './components/grid/grid.component';
import { selectionRenderComponent } from './render/selection-render.component';
import { DataImportComponent } from './components/data-import/data-import.component';
import { HotTableModule } from '@handsontable/angular';
import { HotableComponent } from './components/hotable/hotable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldNgbDatePicker } from './components/form/ngb-date-picker.type.component';
import { FormlyFieldNgbTimePicker  } from './components/form/ngb-time-picker.type.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([selectionRenderComponent]),
    HotTableModule.forRoot(),
    FormlyModule.forRoot({
      types: [
        {name: 'ngb-date-picker', component: FormlyFieldNgbDatePicker},
        {name: 'ngb-time-picker', component: FormlyFieldNgbTimePicker},
        ],
      validationMessages: [        
        { name: 'required', message: 'Este campo es requerido' },
      ]
    }),
  ],
  declarations: [
    ProjectComponent,
    GridComponent,
    selectionRenderComponent,
    DataImportComponent,
    HotableComponent,
    FormlyFieldNgbDatePicker,
    FormlyFieldNgbTimePicker
  ],
  providers: [],
  exports: [
    ProjectComponent,
    GridComponent,
    DataImportComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule {}