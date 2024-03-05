import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/pages/books/book-list/book-list.component';
import { BookItemComponent } from './components/pages/books/book-item/book-item.component';
import { CharacterListComponent } from './components/pages/characters/character-list/character-list.component';
import { CharacterItemComponent } from './components/pages/characters/character-item/character-item.component';
import { HouseListComponent } from './components/pages/houses/house-list/house-list.component';
import { HouseItemComponent } from './components/pages/houses/house-item/house-item.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CharactersFinderComponent } from './components/pages/characters/characters-finder/characters-finder.component';
import { CharacterDetailComponent } from './components/pages/characters/character-item/character-detail/character-detail.component';
import { WizardItemComponent } from './components/pages/characters/wizard-item/wizard-item.component';
import { WizardDetailComponent } from './components/pages/characters/wizard-item/wizard-detail/wizard-detail.component';
import { FormsModule } from '@angular/forms';
import { MyareaComponent } from './components/pages/myarea/myarea.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookItemComponent,
    CharacterListComponent,
    CharacterItemComponent,
    HouseListComponent,
    HouseItemComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CharactersFinderComponent,
    CharacterDetailComponent,
    WizardItemComponent,
    WizardDetailComponent,
    MyareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
