import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisesRoutingModule } from './paises-routing.module';
import { SelectorpageComponent } from './pages/selectorpage/selectorpage.component';


@NgModule({
  declarations: [
    SelectorpageComponent
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule
  ]
})
export class PaisesModule { }
