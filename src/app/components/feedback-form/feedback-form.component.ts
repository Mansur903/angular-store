import {Component} from '@angular/core';
import {FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss'
})
export class FeedbackFormComponent {
  buttonText = "Отправить обратную связь"
  buttonDisabled = false

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  })

  onSubmit() {
    this.buttonText = "Отправлено в консоль!"
    this.buttonDisabled = true
    console.log(this.form.value)
  }
}
