import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorpageComponent } from './pages/selectorpage/selectorpage.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'selector', component: SelectorpageComponent },
      {path: '**', redirectTo: 'selector'} 
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
