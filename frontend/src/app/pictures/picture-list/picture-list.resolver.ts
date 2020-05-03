import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PictureService } from '../picture/picture.service';
import { Picture } from '../picture/picture';

@Injectable({ providedIn: 'root' })
export class PictureListResolver implements Resolve<Observable<Picture[]>> {

  constructor(private pictureService: PictureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userName = route.params.userName;
    return this.pictureService.listFromUserPaginated(userName, 1);
  }
}
