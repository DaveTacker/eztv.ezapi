import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowsComponent } from './Pages/shows/shows.component';

const routes: Routes = [
  { path: '', redirectTo: '/shows', pathMatch: 'full' },
  { path: 'shows', component: ShowsComponent },
  { path: 'shows/:id', component: ShowsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
