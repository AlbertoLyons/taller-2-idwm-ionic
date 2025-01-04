import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 
import { LoginDto } from 'src/app/interfaces/auth/login-dto'; 
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    // Agregamos los componentes de Ionic
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSpinner,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);
  protected readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.alphanumericValidator(),
      ],
    ],
  });
  protected loading = false;
  protected invalidLogin = false;

  protected async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }
    const formValue = this.loginForm.value as LoginDto;
    const loginData: LoginDto = {
      email: formValue.email.trim().toLowerCase(),
      password: formValue.password,
    };
    this.loading = true;
    this.invalidLogin = false;
    this.authService.login(loginData).subscribe({
      next: (response) => {
        if (response) {
          if (response.token) {
            this.localStorageService.setVariable('token', response.token);
            this.localStorageService.setVariable('user', JSON.stringify(response));
            this.router.navigate(['products']);
            this.loading = false;
            
          }
        } else {
          this.loading = false;
          this.invalidLogin = true;
          console.log('Error on login', response);

        }
      },
      error: (error) => {
        this.loading = false;
        let e = this.authService.errors;
        console.log('Error', e);
        if (e.pop()!.includes('401')) {
          this.invalidLogin = true;
        }
      },
    });
  
    /*
    try{
      const response = await this.authService.login(loginData);
      if (response.) {
        this.localStorageService.setVariable('token', response.token);
        this.localStorageService.setVariable('user', response);
        this.router.navigate(['products']);
        this.loading = false;
        this.invalidLogin = false;
      } else {
        this.loading = false;
        this.invalidLogin = true;
        console.log('Error on login', response);
      }
    } catch (error: any) {
      this.loading = false;
      const e = error as HttpErrorResponse;
      if (e.status === 401) {
        this.invalidLogin = true;
      }
      this.authService.errors.push(e.message || 'Unknow error');
    }
    */
  }

  private alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const regex = /^[a-zA-Z0-9]*$/;
      return regex.test(control.value) ? null : { alphanumeric: true };
    };
  }

  protected getFieldError(fieldName: keyof LoginDto): string {
    const control = this.loginForm.get(fieldName);

    if (!control || !control.errors || !control.touched) return '';

    const errors = {
      required: 'Este campo es requerido',
      email: 'Correo electrónico inválido',
      minlength: `Mínimo ${control.errors['minlength']?.requiredLength} caracteres`,
      maxlength: `Máximo ${control.errors['maxlength']?.requiredLength} caracteres`,
      alphanumeric: 'Solo se permiten letras y números',
    };

    const firstError = Object.keys(control.errors)[0];
    return errors[firstError as keyof typeof errors] || 'Campo inválido';
  }
}
