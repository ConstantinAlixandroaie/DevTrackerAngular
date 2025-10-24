import { Component,EventEmitter, Output } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../validators/account.validators';

interface RegisterFormModel {
 email:FormControl<string>;
 password:FormControl<string>;
 confirmPassword:FormControl<string>;
}

@Component({
  selector: 'app-register-form',
  standalone: false,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {
  @Output() register = new EventEmitter<{ email: string; password: string; confirmPassword: string }>();

  form: FormGroup<RegisterFormModel>;

  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: this.fb.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
      confirmPassword: this.fb.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
      }, 
      { validators: passwordMatchValidator()}
    );
  }
  
  submit() {
    if (this.form.valid) {
      this.register.emit(this.form.getRawValue());
    }
  }
}
