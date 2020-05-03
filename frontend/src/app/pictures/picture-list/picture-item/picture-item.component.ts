import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Picture } from '../../picture/picture';

@Component({
  selector: 'app-picture-item',
  templateUrl: './picture-item.component.html',
  styleUrls: ['./picture-item.component.css']
})
export class PictureItemComponent implements OnChanges {

  @Input() pictures: Picture[] = [];
  rows: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pictures) {
      this.rows = this.groupColumns(this.pictures);
    }
  }

  groupColumns(pictures: Picture[]) {
    const newRows = [];

    for (let index = 0; index < pictures.length; index += 3) {
      newRows.push(pictures.slice(index, index + 3));
    }

    return newRows;
  }
}
