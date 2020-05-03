import { NgModule } from '@angular/core';
import { PictureDetailsComponent } from './picture-details.component';
import { CommonModule } from '@angular/common';
import { PictureModule } from '../picture/picture.module';
import { PictureCommentsComponent } from './picture-comments/picture-comments.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PictureOwnerOnlyDirective } from './picture-owner-only/picture-owner-only.directive';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
  declarations: [
    PictureDetailsComponent,
    PictureCommentsComponent,
    PictureOwnerOnlyDirective
  ],
  exports: [
    PictureDetailsComponent,
    PictureCommentsComponent],
  imports: [
    CommonModule,
    PictureModule,
    RouterModule,
    ReactiveFormsModule,
    VMessageModule,
    ShowIfLoggedModule
  ]
})
export class PictureDetailsModule {

}
