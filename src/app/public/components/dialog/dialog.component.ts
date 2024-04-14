import {Component, Inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Dialog} from "../../shared/dialog";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatButtonModule, MatDialogClose, MatDialogActions],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Dialog) { }

  ngOnInit(): void {
  }
}
