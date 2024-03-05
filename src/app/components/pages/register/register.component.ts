import { Component, inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nameInput: string = '';
  lastNameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';
  sexoInput: string = '';
  registerdUser: boolean = false;
  showPassword: boolean = false;
  status: 'error' | 'success' | 'disabled' = 'disabled'
  message: string = ''
  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  sendForm() {
    const expresionRegularPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if(expresionRegularCorreo.test(this.emailInput) || expresionRegularPassword.test(this.passwordInput)) {
        const bodyRegister = {
          name: this.nameInput,
          lastname: this.lastNameInput,
          sexo: this.sexoInput,
          email: this.emailInput,
          password: this.passwordInput
        };
        
        if (this.nameInput.length < 3) {
          this.status = 'error'
          this.message = 'Nombre no válido'
        }
        if (this.lastNameInput.length < 3) {
          this.status = 'error'
          this.message = 'Apellido no válido'
        }

        this.userService.register(bodyRegister).subscribe(
          (response) => {
            this.status = 'success'
            this.message = 'Ususario registrado correctamente'
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
            
          },
          (error) => {
            this.handleRegisteredUser();
            this.status = 'error'
            this.message = 'Este email ya está registrado'
          }
        );
      } else {
        this.status = 'error'
        this.message = 'Email o contraseña inválido'
      }
    }
    catch(error) {
      console.log(error)
    }
    
    
  }

  handleRegisteredUser() {
    this.registerdUser = true;
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword
  }
}
