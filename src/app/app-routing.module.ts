import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { HomePageComponent } from './pages/homePage/homePage.component';


const routes: Routes = [
  { path: 'authentication', component: TestComponent  },
  {path: '', component:HomePageComponent }    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
