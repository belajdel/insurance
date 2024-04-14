import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoadingButtonComponent} from "../loading-button/loading-button.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {LoginUser} from "../../models/login-user.model";
import {User} from "../../models/user.model";
import {AuthService} from "../../../core/services/auth.service";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {Router} from "@angular/router";
import {Token} from "../../models/token.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingButtonComponent, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() imgSrc!:string;
  user: LoginUser = new User();
  hide: boolean = true;
  isLoading: boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required/*, Validators.minLength(6)*/])
  });

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private router: Router) {
  }


  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true
      this.user.username = this.form.get("username")?.value;
      this.user.password = this.form.get("password")?.value;
      this.authService.login(this.user).subscribe({
        next: (res: Token) => {
          this.tokenStorageService.setToken(res);
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        }, error: (error) => {
          this.form.get("password")?.setValue("");
          this.form.get("password")?.setErrors({'wrong_login': true});
          this.isLoading = false;
        }
      })
    }
  }
}
