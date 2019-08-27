import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { ListComponent } from './list/list.component';

const Components: any[] = [
  SpinnerComponent,
  ListComponent
]

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule
  ],
  exports: [Components]
})
export class ComponentsModule { }
