import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseURL = API_URL;

  constructor(private http: HttpClient) {}

  getDataFromLocalStorage(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setDataInLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromAPI(url: string): any {
    return this.http.get(url).toPromise();
  }

  async getBooks(): Promise<any[]> {
    const books = this.getDataFromLocalStorage('books');
    if (books) {
      return books;
    } else {
      const url = `${this.baseURL}/libros`;
      const data = await this.getFromAPI(url);
      this.setDataInLocalStorage('books', data);
      return data;
    }
  }

  async getCharacters(): Promise<any[]> {
    const characters = this.getDataFromLocalStorage('characters');
    if (characters) {
      return characters;
    } else {
      const url = `${this.baseURL}/personajes`;
      const data = await this.getFromAPI(url);
      this.setDataInLocalStorage('characters', data);
      return data;
    }
  }

  async getUserWizard(): Promise<any[]> {
    const wizards = this.getDataFromLocalStorage('users_wizards');
    if (wizards) {
      return wizards;
    } else {
      const url = `${this.baseURL}/magos`;
      const data = await this.getFromAPI(url);
      this.setDataInLocalStorage('users_wizards', data);
      console.log(data);
      return data;
    }
  }

  async reloadUserWizards(): Promise<any[]> {
    const url = `${this.baseURL}/magos`;
      const data = await this.getFromAPI(url);
      localStorage.removeItem('users_wizards')
      this.setDataInLocalStorage('users_wizards', data);
      return data;
  }

  async getCharactersById(id: string): Promise<any[]> {
    const characters = this.getDataFromLocalStorage(`character_${id}`);
    if (characters) {
      return characters;
    } else {
      const url = `${this.baseURL}/personajes/detalle/${id}`;
      const data = await this.getFromAPI(url);
      this.setDataInLocalStorage(`character_${id}`, data);
      return data;
    }
  }

  async getUserWizardById(id: string): Promise<any[]> {
    const userWizard = this.getDataFromLocalStorage(`user-wizard_${id}`);
    if (userWizard) {
      return userWizard;
    } else {
      const url = `${this.baseURL}/magos/detalle/${id}`;
      const data = await this.getFromAPI(url);
      this.setDataInLocalStorage(`user-wizard_${id}`, data);
      return data;
    }
  }

  async getHouses(): Promise<any[]> {
    const houses = this.getDataFromLocalStorage('houses');
    if (houses) {
      return houses;
    } else {
      const url = `${this.baseURL}/casas`;
      const data = await this.getFromAPI(url);
      this.setDataInLocalStorage('houses', data);
      return data;
    }
  }

  async getMaterials(): Promise<any[]> {
    const materials = this.getDataFromLocalStorage('materials');
    if (materials) {
      return materials;
    } else {
      const url = `${this.baseURL}/materiales`;
      const data = await this.getFromAPI(url);
      this.setDataInLocalStorage('materials', data);
      return data;
    }
  }

  async getBloods(): Promise<any[]> {
    const bloods = this.getDataFromLocalStorage('bloods');
    if (bloods) {
      return bloods;
    } else {
      const url = `${this.baseURL}/sangres`;
      const data = await this.getFromAPI(url);
      this.setDataInLocalStorage('bloods', data);
      return data;
    }
  }
}
