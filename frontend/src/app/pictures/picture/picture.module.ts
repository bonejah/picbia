import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureComponent } from './picture.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PictureComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    PictureComponent
  ]
})
export class PictureModule {}

