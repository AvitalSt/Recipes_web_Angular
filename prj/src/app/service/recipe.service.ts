import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseURL = "https://localhost:7000/api/Recipes"

  constructor(private _http: HttpClient) { }

  getRecipeListFromServer(): Observable<Recipe[]> {
    return this._http.get<Recipe[]>(this.baseURL);
  }

  getRecipeByIdFromServer(id: number): Observable<Recipe> {
    return this._http.get<Recipe>(this.baseURL + "/" + id);
  }

  addRecipeFromServer(newRecipe: Recipe): Observable<Recipe> {
    return this._http.post<Recipe>(this.baseURL, newRecipe)
  }

  updateRecipeFromServer(id: number, updateRecipe: Recipe): Observable<Recipe> {
    return this._http.put<Recipe>(this.baseURL + "/" + id, updateRecipe);
  }

  deleteRecipeFromServer(id: number): Observable<Recipe[]> {
    return this._http.delete<Recipe[]>(this.baseURL + "/" + id)
  }
}
