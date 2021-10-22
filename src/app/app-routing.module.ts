import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { TestComponent } from './components/test/test.component';
import { HomePageComponent } from './pages/homePage/homePage.component';


const routes: Routes = [
  { path: 'authentication', component: TestComponent  },
  { path: '', component:HomePageComponent } ,
  { path: 'company', component: CompanyComponent }   
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
