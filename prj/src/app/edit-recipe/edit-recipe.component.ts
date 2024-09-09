
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormsModule, Validators, FormGroup, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Recipe } from "../models/recipe.model";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../service/recipe.service";

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  constructor(private _recipeService: RecipeService, private _router: Router, private _route: ActivatedRoute, private _fb: FormBuilder) { }
  public recipeId!: number;
  public idU!: number;
  recipeForm!: FormGroup;

  ngOnInit(): void {
    this.idU = Number(this._route.snapshot.paramMap.get('idU'));

    this.recipeId = Number(this._route.snapshot.paramMap.get('idR'));

    this._recipeService.getRecipeByIdFromServer(this.recipeId).subscribe({
      next: (recipe: Recipe) => {
        this.recipeForm = this._fb.group({
          nameR: [recipe.nameR, Validators.required],
          idC: [recipe.idC, Validators.required],
          time: [recipe.time, Validators.required],
          level: [recipe.level, Validators.required],
          date: [recipe.date, Validators.required],
          listComponents: this._fb.array(recipe.listComponents.map(component => new FormControl(component, Validators.required))),
          prepartion: this._fb.array(recipe.prepartion.map(step => new FormControl(step, Validators.required))),
          imageUrl: [recipe.imageUrl, Validators.required]
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  get listComponents(): FormArray {
    return this.recipeForm.get('listComponents') as FormArray;
  }

  get prepartion(): FormArray {
    return this.recipeForm.get('prepartion') as FormArray;
  }
  public setCategortId(e: Event) {
    const x = e.target as HTMLSelectElement;
    const choosen = x.value;
    this.recipeForm.controls['idC'].setValue(choosen);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const updatedRecipe: Recipe = {
        idR: this.recipeId,
        ...this.recipeForm.value,
        listComponents: this.recipeForm.value.listComponents,
        prepartion: this.recipeForm.value.prepartion
      };
      console.log(updatedRecipe)
      this._recipeService.updateRecipeFromServer(this.recipeId, updatedRecipe).subscribe({
        next: (res) => {
          this._router.navigate(['/moreDitails', { idU: this.idU, idR: this.recipeId }]);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  onCancel(): void {
    this._router.navigate(['/moreDitails', { idU: this.idU, idR: this.recipeId }]);
  }
}


