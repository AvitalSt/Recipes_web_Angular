import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DurationFormatPipePipe } from "../pipes/duration-format-pipe.pipe";

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  imports: [CommonModule, FormsModule, DurationFormatPipePipe]
})
export class RecipeDetailsComponent {
  idU!: number;
  idR!: number;
  idUserRecipe!: number;
  difficultyArray: number[] = [];
  recipe!: Recipe;
  category: string[] = ["עיקרית", "תוספת", "קינוח"];
  showToOwner!: boolean;
  showDeleteButton: boolean = false;

  currentUser = sessionStorage.getItem('currentUser');


  constructor(private _recipeService: RecipeService, private _router: Router, private _route: ActivatedRoute) { }

  componentIconMap: { [key: string]: string } = {
    'מלח': '🧂',
    'סוכר': '🍬',
    'בצל': '🧅',
    'שום': '🧄',
    'פלפל': '🌶️',
    'גזר': '🥕',
    'מים': '💧',
    'חלב': '🥛',
    'קמח': '🌾',
    'ביצים': '🥚',
    'שמן': '🛢️',
    'אורז': '🍚',
    'מקרוני': '🍝',
    'תפוחי אדמה': '🥔',
    'תירס': '🌽',
    'ברוקולי': '🥦',
    'פטריות': '🍄',
    'דבש': '🍯',
    'לחם': '🥖',
    'זעתר': '🌿',
    'רוזמרין': '🌿',
    'בזיליקום': '🌿',
    'פטרוזיליה': '🌿',
    'קוקוס': '🥥',
    'שקדים': '🌰',
    'גבינה': '🧀',
    'בשר': '🍖',
    'דג': '🐟',
    'עוף': '🐓',
    'קינמון': '🌶️',
    'ואניל': '🌺',
    'קוקאו': '🍫',
    'קפה': '☕',
    'תה': '🍵',
    'אפרסק': '🍑',
    'תות': '🍓',
    'אננס': '🍍',
    'עגבנייה': '🍅',
    'לימון': '🍋',
    'דובדבן': '🍒',
    'אבטיח': '🍉',
    'בננה': '🍌',
    'תפוח': '🍏',
    'קיווי': '🥝',
    'פטל': '🫐',
    'תפוח עץ': '🍏',
    'פיצה': '🍕',
    'פסטה': '🍝',
    'המבורגר': '🍔',
    'קצב': '🍚',
    'בירה': '🍺',
    'יין': '🍷',
    'סושי': '🍱',
    'מרק': '🍲',
    'קציצות': '🍢',
    'גריל': '🥩',
    'סטייק': '🥩',
    'דגים': '🐟',
    'קוקטייל': '🍹',
    'שניצל': '🍖',
  };
  
  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.idU = params['idU'];
      this.idR = params['idR'];

      if (this.idU && this.idR) {
        this._recipeService.getRecipeByIdFromServer(this.idR).subscribe({
          next: (res) => {
            this.recipe = res;
            this.recipe.idC = res.idC;
            this.idUserRecipe = Number(res.idU);
            this.showDeleteButton = Number(this.idUserRecipe) === Number(this.currentUser) == true;
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

  getStarRating(difficulty: number): string {
    let stars = '';
    const fullStar = '⭐';
    const emptyStar = '☆';

    for (let i = 0; i < difficulty; i++) {
      stars += fullStar;
    }
    for (let i = difficulty; i < 5; i++) {
      stars += emptyStar;
    }
    return stars;
  }

  getIconCategory(idC: number): string {
    switch (idC) {
      case 0:
        return '🍲 מנה עיקרית';
      case 1:
        return '🥦 תוספת';
      case 2:
        return '🍨 קינוח';
      default:
        return '';
    }
  }

  getComponentIcon(componentName: string): string {
    return this.componentIconMap[componentName] || '';
  }

  toDelete() {
    this._recipeService.deleteRecipeFromServer(this.idR).subscribe({
      next: (res) => {
        this._router.navigate(['/allRecipe', { idU: this.idU }]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toEdit() {
    this._router.navigate(['/editRecipe', { idU: this.idU, idR: this.idR }]);
  }
}
