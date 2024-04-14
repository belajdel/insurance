import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'mat-loading-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './loading-button.component.html',
  styleUrl: './loading-button.component.scss',
 /* hostDirectives:[{
    directive:LoadingButtonDirective,
  }]*/
})
export class LoadingButtonComponent {

  @Input() label!: string ;
  @Input() type!: string;
  @Input() color!: string;
  @Input() isLoading!: boolean;
  @Input() classlist!:string
  @Input() icon!: string
  constructor() {
  }
}
