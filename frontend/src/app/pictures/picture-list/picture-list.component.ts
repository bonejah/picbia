import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Picture } from '../picture/picture';
import { PictureService } from '../picture/picture.service';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {
  pictures: Picture[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.pictures = this.activatedRoute.snapshot.data['pictures'];
    });
  }

  load() {
    this.pictureService.listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(pictures => {
        this.filter = '';
        this.pictures = this.pictures.concat(pictures);
        if (!pictures.length) {
          this.hasMore = false;
        }
      });
  }
}
