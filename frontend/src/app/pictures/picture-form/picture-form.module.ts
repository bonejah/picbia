import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureFormComponent } from './picture-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { PictureModule } from '../picture/picture.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immediate-click/immediate-click.module';

@NgModule({
  declarations: [
    PictureFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VMessageModule,
    RouterModule,
    FormsModule,
    PictureModule,
    ImmediateClickModule
  ]
})
export class PicutureFormModule { }
