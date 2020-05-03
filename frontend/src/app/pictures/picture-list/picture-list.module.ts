import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureListComponent } from './picture-list.component';
import { PictureItemComponent } from './picture-item/picture-item.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { FilterByDescription } from './fiter-by-description.pipe';
import { PictureModule } from '../picture/picture.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { SearchComponent } from './search/search.component';
import { DarkOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PictureListComponent,
    PictureItemComponent,
    LoadButtonComponent,
    FilterByDescription,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PictureModule,
    CardModule,
    DarkOnHoverModule,
    RouterModule
  ]
})
export class PictureListModule {}
