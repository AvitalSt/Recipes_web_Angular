
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormArray, FormControl, FormsModule, Validators, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Recipe } from "../models/recipe.model";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../service/recipe.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-recipe',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {
    
    constructor(private _router: Router, private _recipeService: RecipeService, private _activatedRoute: ActivatedRoute) { }

    public addRecipeForm: FormGroup = new FormGroup({
        nameR: new FormControl("", Validators.required),
        idC: new FormControl("", Validators.required),
        time: new FormControl("", Validators.required),
        level: new FormControl("", Validators.required),
        imageUrl: new FormControl("", [Validators.required]),
        prepartion: new FormArray([new FormControl("", Validators.required)]),
        listComponents: new FormArray([new FormControl("", Validators.required)])
    })

    get prepartion(): FormArray {
        return this.addRecipeForm.get('prepartion') as FormArray
    }

    get listComponents(): FormArray {
        return this.addRecipeForm.get('listComponents') as FormArray
    }

    public setCategortId(e: Event) {
        const x = e.target as HTMLSelectElement;
        const choosen = x.value;
        this.addRecipeForm.controls['idC'].setValue(choosen);
    }

    public onCompInput(index: number) {
        if (this.listComponents.at(index).value !== "" && index === this.listComponents.length - 1) {
            this.listComponents.push(new FormControl(""));
        } else if (this.listComponents.at(index).value === "" && this.listComponents.length > 1 && !this.listComponents.at(index).hasValidator(Validators.required)) {
            this.listComponents.removeAt(index);
        }
    }

    public onPreInput(index: number) {
        if (this.prepartion.at(index).value !== "" && index === this.prepartion.length - 1) {
            this.prepartion.push(new FormControl(""));
        } else if (this.prepartion.at(index).value === "" && this.prepartion.length > 1 && !this.prepartion.at(index).hasValidator(Validators.required)) {
            this.prepartion.removeAt(index);
        }
    }

    public recipe!: Recipe

    public addRecipe() {
        if (this.addRecipeForm.valid) {
            this.recipe = new Recipe();
            this.recipe.nameR = this.addRecipeForm.value.nameR;
            this.recipe.idR = 0;
            this.recipe.idC = this.addRecipeForm.value.idC;
            this.recipe.time = this.addRecipeForm.value.time;
            this.recipe.level = this.addRecipeForm.value.level;
            this.recipe.date = new Date();
            this.recipe.listComponents = this.addRecipeForm.value.listComponents.filter((component: string) => component.trim() !== "");
            this.recipe.prepartion = this.prepartion.value.filter((pre: string) => pre.trim() !== "");
            this.recipe.idU = Number(this._activatedRoute.snapshot.paramMap.get('idU'))
            this.recipe.imageUrl = this.addRecipeForm.value.imageUrl;
            console.log(this.recipe);
            this._recipeService.addRecipeFromServer(this.recipe).subscribe({
                next: (res) => {
                    console.log("good", res);
                    Swal.fire({
                        icon: 'success',
                        title: 'המתכון נוסף בהצלחה!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        this._router.navigate(['/allRecipe', { idU: this.recipe.idU }]);
                    });
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    }
}