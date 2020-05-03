import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PictureService } from '../picture/picture.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.css']
})
export class PictureFormComponent implements OnInit {

  pictureForm: FormGroup;
  file: File;
  preview: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private pictureService: PictureService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.pictureForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload() {
    const description = this.pictureForm.get('description').value;
    const allowComments = this.pictureForm.get('allowComments').value;
    this.pictureService
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => {
        this.router.navigate(['/user', this.userService.getUserName()]);
      }))
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.alertService.success('Upload complete', true);
          }
        },
        err => {
          console.log(err);
          this.alertService.danger('Could not upload picture!', true);
        });
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
