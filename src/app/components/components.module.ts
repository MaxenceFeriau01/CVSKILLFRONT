import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from '../app-routing.module';
import { TestComponent } from './test/test.component';
import { CompanyComponent } from './company/company.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
    declarations: [
    TestComponent,
    CompanyComponent
    ],
    imports: [
     MatToolbarModule,
     MatCardModule,
     MatFormFieldModule,
     MatSelectModule,
     CommonModule,
     FlexLayoutModule,
     FormsModule,
     ReactiveFormsModule,
     InfiniteScrollModule,
     AppRoutingModule
    ],
    providers: [],
  
  })
  export class ComponentsModule { }