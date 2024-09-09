import { Component } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../models/recipe.model';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-all-recipes',
    standalone: true,
    templateUrl: './all-recipes.component.html',
    styleUrls: ['./all-recipes.component.scss'],
    imports: [CommonModule, FormsModule, SmallRecipeComponent]
})
export class AllRecipesComponent {
  filteredRecipeList: Recipe[] = [];
  recipeList: Recipe[] = [];
  idU!: number;
  searchName: string = '';
  selectedCategory: string = '';
  maxPrepTime: number | null = null;
  categories: string[] = ["עיקרית", "תוספת", "קינוח"];
  isLoggedIn: boolean = false;

  constructor(private _recipeService: RecipeService, private router: Router, private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.idU = Number(params.get('idU') || '');
    });

    this.isLoggedIn = sessionStorage.getItem('currentUser') !== null;

    this._recipeService.getRecipeListFromServer().subscribe({
      next: (res) => {
        this.recipeList = res;
        this.filterRecipes(); 
      },
      error: (err) => {
        console.error(err);
      }
    });
  } 
  
  callCopAddRecipe() {
    if (this.isLoggedIn) {
      this.router.navigate(['/addRecipe', { idU: this.idU }]);
    } else {
      alert('אתה לא מחובר למערכת. יש להתחבר למערכת כדי להוסיף מתכון.');
      this.router.navigate(['/login']);
    }
  }

  filterRecipes() {
    this.filteredRecipeList = this.recipeList.filter(recipe => {
      const matchesName = this.searchName === '' || recipe.nameR.includes(this.searchName);
      const matchesCategory = this.selectedCategory === '' || recipe.idC === this.categories.indexOf(this.selectedCategory);
      const matchesPrepTime = this.maxPrepTime === null || recipe.time <= this.maxPrepTime;

      return matchesName && matchesCategory && matchesPrepTime;
    });
  }
}
