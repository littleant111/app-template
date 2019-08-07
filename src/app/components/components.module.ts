import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';

const Components: any[] = [
  SpinnerComponent,
]

@NgModule({
  declarations: [Components],
  imports: [
    CommonModule
  ],
  exports: [Components]
})
export class ComponentsModule { }
