import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../core/services/auth.service";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {LoginUser} from "../../public/models/login-user.model";
import {User} from "../../public/models/user.model";
import {Token} from "../../public/models/token.model";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-login-ict',
  templateUrl: './login-ict.component.html',
  styleUrls: ['./login-ict.component.scss']
})
export class LoginIctComponent {
  imgSrc = "assets/images/logo%20ictclinic.png"

  constructor() {
  }
}
