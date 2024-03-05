import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router'; 
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailInput: string = '';
  passwordInput: string = '';
  showPassword: boolean = false;
  status: 'error' | 'success' | 'disabled' = 'disabled'
  message: string = ''

  constructor(
    private userService: UsersService,
    private router: Router,
    private hideLogin: LoginService
  ) {}

  sendForm() {
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(expresionRegularCorreo.test(this.emailInput)) {
      const bodyLogin = {
        email: this.emailInput,
        password: this.passwordInput
      };

      this.userService.login(bodyLogin).subscribe(
        (response: any) => {
          console.log(response);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('id', response.user._id);
          sessionStorage.setItem('userName', response.user.name)
          sessionStorage.setItem('userGenre', response.user.sexo)
          sessionStorage.setItem('userWizard', JSON.stringify(response.user.mywizard));
          this.hideLogin.hideLogin.emit(true)
          this.router.navigate(['/myarea']);
        },
        (error) => {
          console.error(error.error.message);
          if(error.error.message === 'Invalid password') {
            this.status = 'error';
            this.message = 'Contraseña incorrecta';
          } else if (error.error.message === 'User not found') {
            this.status = 'error';
            this.message = 'Este email no está registrado';
          } else {
            this.status = 'error';
            this.message = 'Error desconocido';
          }

        }
      );
    } else {
      this.status = 'error';
      this.message = 'Formato de mail inválido'
    }
  
    // Invocar el método login de userService
    
    
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword
  }

  ngOnInit(): void {}
}
