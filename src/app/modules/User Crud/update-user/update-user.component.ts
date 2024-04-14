import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../public/models/user.model";
import {Role} from "../../../public/enum/Role";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {DataService} from "../../../core/services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {Card} from "../../../public/shared/card";
import {MyForm} from "../../../public/shared/my-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../../core/validators/confirm-password.validator";
import {DialogComponent} from "../../../public/components/dialog/dialog.component";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  constructor(private userService:UserService,private dialog:MatDialog,private router: Router,private tokenStorageService:TokenStorageService,private data:DataService){
  }
  readonly roles = [Role.Finance,Role.User];
  actualUser=this.tokenStorageService.getUser()
  user:User=history.state?.data;
  isLoading = false;

  cards: Card[] = [
    {
      title: "معلومات عن المستخدم",
      fields: [
        {
          type: "select",
          label: "إسم المكتب",
          hidden:this.actualUser.role!=Role.Admin,
          formControlName: "userBureau",
          readonly:true,
          select:{
            selectOptions:this.data.bureaux,
            isObject:true
          }
        },
        {
          type: "text",
          label: "إسم المستخدم",
          readonly:false,
          hidden:false,
          formControlName: "name",
        },
        {
          type: "text",
          label: "عنوان المستخدم",
          hidden:false,
          readonly:false,
          formControlName: "address",
        },
        {
          type: "tel",
          label: "رقم هاتف المستخدم",
          hidden:false,
          readonly:false,
          errorsMessages: {
            minLength: 'يجب أن يتكون رقم هاتف المستخدم من 8 أرقام',
            maxLength: 'يجب أن يتكون رقم هاتف المستخدم من 8 أرقام'
          },
          formControlName: "phone",
        },
        {
          type: "select",
          label: "الوظيفة",
          hidden:this.actualUser.role!=Role.Admin,
          readonly:true,
          formControlName: "role",
          select:{
            selectOptions:this.roles,
            isObject:false
          },
        }
      ]
    },
  ]

  myForm:MyForm={
    formGroup:new FormGroup({
      name: new FormControl(this.user.username,Validators.required),
      address: new FormControl(this.user.address,Validators.required),
      phone: new FormControl(this.user.phone,[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      role: this.actualUser.role===Role.Admin ? new FormControl(this.user.role,Validators.required): new FormControl(''),
      bureau: this.actualUser.role===Role.Admin ? new FormControl(this.user.bureauId,Validators.required) : new FormControl(''),
    }),
    cards:this.cards
  }

  ngOnInit() {
    if(this.actualUser.role===Role.Admin){
      this.data.fetchBureaux()
    }
  }

  onSubmit() {
    if (!this.myForm.formGroup.pristine && this.myForm.formGroup.valid) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: "المستخدمين",
          content: "هل تريد تعديل هذا المستخدم ؟",
        }, autoFocus: false, panelClass: 'choice-dialog-container'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == "true") {
          this.updateUser()
        }
      })
    }
  }
  updateUser(){
    this.isLoading = true
    const form = this.myForm.formGroup
    this.user.username = form.get("name")?.value
    this.user.address = form.get("address")?.value
    this.user.phone = form.get("phone")?.value
    this.userService.UpdateUser(this.user).subscribe((Response)=>{
      this.isLoading = false
      this.router.navigate(['/dashboard/users'])
    })
  }

  protected readonly Role = Role;
}
