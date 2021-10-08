import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';
import { MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
    declarations: [
    TestComponent
    ],
    imports: [
     MatToolbarModule   
    ],
    providers: [],
  
  })
  export class ComponentsModule { }