import { Component, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs/';

@Component({
  selector: 'app-picture',
  templateUrl: 'picture.component.html'
})
export class PictureComponent {

  // tslint:disable-next-line:variable-name
  private _url = '';
  @Input() description = '';
  @Input() set url(url: string) {
    if (!url.startsWith('https') && !url.startsWith('data')) {
      this._url = CLOUD + url;
    } else {
      this._url = url;
    }
  }

  get url() {
    return this._url;
  }
}

