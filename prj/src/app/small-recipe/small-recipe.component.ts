import { Component, Input } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../models/recipe.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DurationFormatPipePipe } from "../pipes/duration-format-pipe.pipe";

@Component({
  selector: 'app-small-recipe',
  standalone: true,
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.scss',
  imports: [CommonModule, FormsModule, DurationFormatPipePipe]
})
export class SmallRecipeComponent {
  @Input()
  idR!: number;
  @Input()
  idU!: number
  difficultyArray: number[] = [];
  recipe!: Recipe

  constructor(private _recipeService: RecipeService, private _router: Router) { }

  ngOnInit() {
    this._recipeService.getRecipeByIdFromServer(this.idR).subscribe({
      next: (res) => {
        this.recipe = res;
      },
      error: (err) => {
        console.error(err);
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

  moreDitails() {
    this._router.navigate(['/moreDitails', { idU: this.idU, idR: this.idR }]);
  }
}


