import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { Picture } from '../../picture/picture';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[pictureOwnerOnly]'
})
export class PictureOwnerOnlyDirective implements OnInit {

  @Input() ownedPicture: Picture;

  constructor(
    private element: ElementRef,
    private renderer: Renderer,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUser()
      .subscribe(user => {
        if (!user || user.id !== this.ownedPicture.userId) {
          this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
        }
      });
  }
}
