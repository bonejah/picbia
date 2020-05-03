import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../picture/picture.service';
import { Picture } from '../picture/picture';
import { Observable } from 'rxjs';
import { PictureComment } from './picture-comments';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  templateUrl: './picture-details.component.html'
})
export class PictureDetailsComponent implements OnInit {

  picture$: Observable<Picture>;
  pictureId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pictureService: PictureService,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.pictureId = this.route.snapshot.params.pictureId;
    this.picture$ = this.pictureService.findById(this.pictureId);
    this.picture$.subscribe(() => {}, err => {
      console.log(err);
      this.router.navigate(['not-found']);
    });
  }

  remove() {
    this.pictureService
      .removePicture(this.pictureId)
      .subscribe(() => {
        this.alertService.success('Picture removed', true);
        this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
      },
      err => {
        console.log(err);
        this.alertService.warning('Could not delete the picture!', true);
      });
  }

  like(picture: Picture) {
    this.pictureService
      .like(picture.id)
      .subscribe(liked => {
        if (liked) {
          this.picture$ = this.pictureService.findById(picture.id);
        }
      });
  }

}

