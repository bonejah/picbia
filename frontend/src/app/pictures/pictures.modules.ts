import { NgModule } from '@angular/core';
import { PicutureFormModule } from './picture-form/picture-form.module';
import { PictureListModule } from './picture-list/picture-list.module';
import { PictureModule } from './picture/picture.module';
import { PictureDetailsModule } from './picture-details/picture-details.module';

@NgModule({
  imports: [
    PictureModule,
    PicutureFormModule,
    PictureListModule,
    PictureDetailsModule
  ]
})
export class PicturesModules { }
