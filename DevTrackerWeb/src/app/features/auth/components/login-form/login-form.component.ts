import { Component, EventEmitter,Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl,  } from '@angular/forms';
import { LoginRequest } from '../../../account/models/account.model';

interface LoginFormModel {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})

export class LoginFormComponent {
  @Output() login = new EventEmitter<LoginRequest>();

  form: FormGroup<LoginFormModel>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: this.fb.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
    });
  }

  submit() {
    if (this.form.valid) {
      this.login.emit(this.form.getRawValue());
    }
  }
}
