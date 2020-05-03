import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from '../picture/picture';

@Pipe({
  name: 'filterByDescription'
})
export class FilterByDescription implements PipeTransform {

  transform(pictures: Picture[], descriptionQuery: string) {
    descriptionQuery = descriptionQuery
      .trim()
      .toLowerCase();

    if (descriptionQuery) {
      return pictures.filter(picture => picture.description.toLowerCase().includes(descriptionQuery));
    } else {
      return pictures;
    }
  }
}
