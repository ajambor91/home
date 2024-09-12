import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoriesService} from "../../../services/categories.service";
import {CategoryEditForm} from "../../../forms/category.form";
import {Observable} from "rxjs";
import {Category, EditCategory, NewCategory} from "shared-types";


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, AsyncPipe, FormsModule, ReactiveFormsModule, NgForOf, NgIf],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  providers: [CategoriesService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CategoryFormComponent {
  @Input() public categoryForm!: FormGroup<CategoryEditForm>;
  @Input() public categories$!: Observable<Category[]>;
  @Output() public onSubmitEmit: EventEmitter<EditCategory> = new EventEmitter<EditCategory | NewCategory>()

  public onSubmit(): void {
    this.onSubmitEmit.emit(this.categoryForm.getRawValue() as EditCategory)
  }
}
