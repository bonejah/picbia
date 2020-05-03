import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from './picture';
import { PictureComment } from '../picture-details/picture-comments';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  constructor(private http: HttpClient) { }

  listFromUser(userName: string) {
    return this.http
      .get<Picture[]>(`${API}/${userName}/pictures`);
  }

  listFromUserPaginated(userName: string, page: number) {
    const params = new HttpParams().append('page', page.toString());
    return this.http
      .get<Picture[]>(`${API}/${userName}/pictures`, { params });
  }

  upload(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);
    return this.http.post(
      API + '/pictures/upload',
      formData,
      {
        observe: 'events',
        reportProgress: true
      });
  }

  findById(pictureId: number) {
    return this.http.get<Picture>(API + '/pictures/' + pictureId);
  }

  getComments(pictureId: number) {
    return this.http.get<PictureComment[]>(API + '/pictures/' + pictureId + '/comments');
  }

  addComment(pictureId: number, commentText: string) {
    return this.http.post(API + '/pictures/' + pictureId + '/comments', { commentText });
  }

  removePicture(pictureId: number) {
    return this.http.delete(API + '/pictures/' + pictureId);
  }

  like(pictureId: number) {
    return this.http.post(
      API + '/pictures/' + pictureId + '/like', {}, { observe: 'response' }
    )
    .pipe(map(res => true))
    .pipe(catchError(err => {
      return err.status === '304' ? of(false) : throwError(err);
    }));
  }
}
