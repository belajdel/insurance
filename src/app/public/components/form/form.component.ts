import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";

import {MyForm} from "../../shared/my-form";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {LoadingButtonComponent} from "../loading-button/loading-button.component";
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, LoadingButtonComponent, RouterLink, MatInputModule, MatSelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  @Input() myForm!:MyForm
  @Input() return_link!:string
  @Input() isLoading!:boolean
  @Input() updateForm=false
  @Input() addForm=false
  @Output() onSubmitEvent = new EventEmitter<FormGroup>();
  constructor() {
  }

  onSubmit(){
    this.onSubmitEvent.emit(this.myForm.formGroup)
  }

}
