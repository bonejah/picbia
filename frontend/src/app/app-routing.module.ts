import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureListComponent } from './pictures/picture-list/picture-list.component';
import { PictureFormComponent } from './pictures/picture-form/picture-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PictureListResolver } from './pictures/picture-list/picture-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PictureDetailsComponent } from './pictures/picture-details/picture-details.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'user/:userName',
    component: PictureListComponent,
    resolve: {
      pictures: PictureListResolver
    },
    data : {
      title: 'TimeLime'
    }
  },
  {
    path: 'p/add',
    component: PictureFormComponent,
    canActivate: [AuthGuard],
    data : {
      title: 'Picture upload'
    }
  },
  {
    path: 'p/:pictureId',
    component: PictureDetailsComponent,
    data : {
      title: 'Picture detail'
    }
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data : {
      title: 'Not found'
    }
  },
  {
    path: 'error',
    component: GlobalErrorComponent,
    data : {
      title: 'Error'
    }
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
