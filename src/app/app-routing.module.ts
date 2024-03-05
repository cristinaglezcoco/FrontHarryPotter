import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { HouseListComponent } from './components/pages/houses/house-list/house-list.component';
import { BookListComponent } from './components/pages/books/book-list/book-list.component';
import { CharacterListComponent } from './components/pages/characters/character-list/character-list.component';

import { LoginComponent } from './components/pages/login/login/login.component';

import { CharacterDetailComponent } from './components/pages/characters/character-item/character-detail/character-detail.component';
import { WizardDetailComponent } from './components/pages/characters/wizard-item/wizard-detail/wizard-detail.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { MyareaComponent } from './components/pages/myarea/myarea.component';
import { authorizedGuard } from './guards/authorized.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'houses', component: HouseListComponent
  },
  {
    path: 'books', component: BookListComponent
  },
  {
    path: 'characters', component: CharacterListComponent
  },
  {
    path: 'character/detail/:id', component: CharacterDetailComponent
  },
  {
    path: 'wizard/detail/:id', component: WizardDetailComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'myarea', canActivate: [authorizedGuard],component: MyareaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
