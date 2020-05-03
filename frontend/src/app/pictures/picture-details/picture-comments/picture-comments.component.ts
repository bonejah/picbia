import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PictureComment } from '../picture-comments';
import { PictureService } from '../../picture/picture.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-picture-comments',
  templateUrl: './picture-comments.component.html'
})
export class PictureCommentsComponent implements OnInit {

  @Input() pictureId: number;
  commentForm: FormGroup;
  comments$: Observable<PictureComment[]>;

  constructor(
    private pictureService: PictureService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.pictureId);
    this.comments$ = this.pictureService.getComments(this.pictureId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  save() {
    const comment = this.commentForm.get('comment').value as string;
    this.comments$ = this.pictureService
      .addComment(this.pictureId, comment)
      .pipe(switchMap(() => this.pictureService.getComments(this.pictureId)))
      .pipe(tap(() => {
        this.commentForm.reset();
      }));
  }

}
