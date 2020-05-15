import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import { ProjectComponent } from './components/project/project.component';
import { GridComponent } from './components/grid/grid.component';
import { selectionRenderComponent } from './render/selection-render.component';
import { DataImportComponent } from './components/data-import/data-import.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([selectionRenderComponent])    
  ],
  declarations: [
    ProjectComponent,
    GridComponent,
    selectionRenderComponent,
    DataImportComponent
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