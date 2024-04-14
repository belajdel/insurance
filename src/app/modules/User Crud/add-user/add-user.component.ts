import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from "../../../core/services/data.service";
import {User} from "../../../public/models/user.model";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {Role} from "../../../public/enum/Role";
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";
import {Card} from "../../../public/shared/card";
import {MyForm} from "../../../public/shared/my-form";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogComponent} from "../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {confirmPasswordValidator} from "../../../core/validators/confirm-password.validator";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit,OnChanges{

  constructor(private userService:UserService,private dialog:MatDialog,private router: Router,private tokenStorageService:TokenStorageService,private data:DataService){
  }
  readonly roles = [Role.Finance,Role.User];
  actualUser=this.tokenStorageService.getUser()
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  cards: Card[] = [
    {
      title: "معلومات عن المستخدم",
      fields: [
        {
          type: 'select',
          label: "إسم المكتب",
          hidden:this.actualUser.role!=Role.Admin,
          formControlName: "bureau",
          readonly:false,
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
          readonly:false,
          hidden:false,
          formControlName: "address",
        },
        {
          type: "tel",
          label: "رقم هاتف المستخدم",
          readonly:false,
          hidden:false,
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
          readonly:false,
          formControlName: "role",
          select:{
            selectOptions:this.roles,
            isObject:false
          },
        }
      ]
    },
    {
      title: "معلومات عن حماية المستخدم",
      fields: [
        {
          type: this.showPassword ? "text": "password",
          label: 'كلمة مرور المستخدم',
          hidden: false,
          readonly:false,
          formControlName: "password",
          suffix_icon:this.showPassword ? "visibility" : "visibility_off" ,
          showPassword:()=>{
            this.showPassword=!this.showPassword
          }
        },
        {
          type: this.showConfirmPassword ? "text": "password",
          label: 'تأكيد كلمة مرور المستخدم',
          hidden: false,
          readonly: false,
          formControlName: "confirmPassword",
          suffix_icon:this.showConfirmPassword ? "visibility" : "visibility_off" ,
          showPassword:()=>{
            this.showConfirmPassword=!this.showConfirmPassword
          },
          errorsMessages: {
            matching: 'كلمة المرور غير متطابقة'
          }
        },
      ]
    }
  ]

  myForm:MyForm={
    formGroup:new FormGroup({
      name: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',[Validators.required,confirmPasswordValidator('password')]),
      address: new FormControl('',Validators.required),
      phone: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      role: this.actualUser.role===Role.Admin ? new FormControl('',Validators.required): new FormControl(''),
      bureau: this.actualUser.role===Role.Admin ? new FormControl('',Validators.required) : new FormControl(''),
    }),
    cards:this.cards
  }

  ngOnInit() {
    if(this.actualUser.role===Role.Admin){
      this.data.fetchBureaux()
      if(this.cards[0].fields[0].type==='select')
        this.cards[0].fields[0].select.selectOptions=this.data.bureaux
      //console.log(this.data.bureaux)
    }
  }


  ngOnChanges( changes:SimpleChanges) {
    if(changes['cards']){
      console.log(this.data.bureaux)
      //this.data.fetchBureaux()
    }
  }



  onSubmit() {
    if (!this.myForm.formGroup.pristine && this.myForm.formGroup.valid) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: "المستخدمين",
          content: "هل تريد إضافة هذا المستخدم ؟",
        }, autoFocus: false, panelClass: 'choice-dialog-container'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == "true") {
          this.addUser()
        }
      })
    }
  }

  addUser() {
    this.isLoading = true
    const form = this.myForm.formGroup
    const user = new User()
    user.username = form.get("name")?.value
    user.password = form.get("password")?.value
    user.address = form.get("address")?.value
    user.phone = form.get("phone")?.value
    user.bureauId = this.actualUser.role===Role.Admin ? form.get("bureau")?.value : this.actualUser.bureauId
    user.role = this.actualUser.role===Role.Admin ? form.get("role")?.value : Role.User
    user.hypervisorId = this.actualUser.id
    this.userService.createUser(user).subscribe(data => {
      this.isLoading = false
      this.router.navigate(['/dashboard/users'])
    })
  }
  /*user=new User()
  protected readonly Role = Role;
  actualUser=this.tokenStorageService.getUser()

  constructor (protected data : DataService,private tokenStorageService:TokenStorageService,private router:Router,private userService:UserService) {}

  ngOnInit() {
    if(this.actualUser.role==Role.Admin){
      this.data.fetchBureaux()
    }
  }
  add(){
    this.userService.createUser(this.user).subscribe((Response)=>{
      this.router.navigate(['/dashboard'])
    })
  }*/


}
