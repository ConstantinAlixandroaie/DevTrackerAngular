import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsPageComponent } from './containers/boards-page/boards-page.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    BoardsPageComponent
  ]
})
export class BoardsModule { }
