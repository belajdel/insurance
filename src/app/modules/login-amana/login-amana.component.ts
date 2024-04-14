import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../core/services/auth.service";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {LoginUser} from "../../public/models/login-user.model";
import {User} from "../../public/models/user.model";
import {Token} from "../../public/models/token.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-amana',
  templateUrl: './login-amana.component.html',
  styleUrls: ['./login-amana.component.scss']
})
export class LoginAmanaComponent {
  imgSrc="assets/images/logo%20amana.png"

  constructor() {
  }

}
