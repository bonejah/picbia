import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable ({
  providedIn: 'root'
})
export class PlataformDetectorService {

  constructor(@Inject(PLATFORM_ID) private platformId: string) {

  }

  isPlataformBrowser() {
    console.log('platformId', this.platformId);
    return isPlatformBrowser(this.platformId);
  }
}
