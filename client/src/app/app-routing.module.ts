import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SinglePostCommentsComponent } from './posts/single-post-comments/single-post-comments.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  { path: 'posts/:id', component: SinglePostCommentsComponent },

  // { path: 'not-found', component: NotFoundComponent },
  // { path: 'server-error', component: ServerErrorComponent },

  // { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
