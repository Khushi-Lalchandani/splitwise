import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './homepage/homepage.component';
import { MainPageComponent } from './main-page/main-page.component';
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
