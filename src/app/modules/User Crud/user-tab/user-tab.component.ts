import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {User} from "../../../public/models/user.model";
import {UserService} from "../../../core/services/user.service";
import {BureauService} from "../../../core/services/bureau.service";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {Role} from "../../../public/enum/Role";
import {Column} from "../../../public/shared/column";
import {Bureau} from "../../../public/models/bureau.model";
import {DialogComponent} from "../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.scss']
})
export class UserTabComponent implements OnInit {
  constructor(private userService: UserService, private bureauService: BureauService, private tokenStorageService: TokenStorageService, private router: Router,private dialog:MatDialog) {
  }

  tableColumns: Array<Column> = [
    {columnDef: 'id', header: 'No.', cell: (element: Record<string, any>) => `${element['id']}`},
    {columnDef: 'username', header: 'إسم المستخدم', cell: (element: Record<string, any>) => `${element['username']}`},
    {columnDef: 'phone', header: 'رقم الهاتف', cell: (element: Record<string, any>) => `${element['phone']}`},
    {columnDef: 'bureau', header: 'إسم المكتب', cell: (element: Record<string, any>) => `${element['bureau'] != null ? element['bureau'].name : 'لا يوجد مكتب'}`},
    {columnDef: 'role', header: 'الوظيفة', cell: (element: Record<string, any>) => `${element['role']}`},
    {columnDef: 'settings', header: 'الإجراءات', cell: (element: Record<string, any>) => `${element['settings']}`},
  ];
  addButton = {
    label: 'إضافة مستخدم',
    icon: 'group_add'
  }
  users: Array<User> = [];
  actualUser= this.tokenStorageService.getUser();
  readonly Role=Role;

  fetchUsers() {
    this.actualUser.role===Role.Admin?
    this.userService.getUsers().subscribe((Response) => {
        this.users = Response.filter(user=>user.id!=this.tokenStorageService.getUser().id);
      }
      , (error) => {
        console.log("eroor is ", error)
      }
    ) :
    this.userService.getUsersByBureau(this.tokenStorageService.getUser().bureauId).subscribe((Response) => {
        this.users = Response.filter(user=>user.id!=this.tokenStorageService.getUser().id);
      }
      , (error) => {
        console.log("eroor is ", error)
      }
    )
  }

  ngOnInit(): void {
    this.fetchUsers()
  }

  search(searchKey:string) {
    if(searchKey!=""){
      if (this.actualUser.role === Role.Admin) {
        this.userService.SearchUsers(searchKey).subscribe((Response) => {
            this.users = Response;
          }
          , (error) => {
            console.log("error is ", error)
          }
        );
      } else {
        const bureau={
          bureauId:this.actualUser.bureauId
        }
        this.userService.SearchUsersByBureau(searchKey,bureau).subscribe((Response) => {
            this.users = Response;
          }
          , (error) => {
            console.log("error is ", error)
          }
        );
      }
    }
    else{
      this.fetchUsers()
    }
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "المستخدمين",
        content: "هل تريد حذف هذا المستخدم ؟",
      }, autoFocus: false, panelClass: 'choice-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.deleteRow(id)
      }
    })
  }

  deleteRow(id: number) {
    this.userService.DeletUser(id).subscribe((Response) => {
        this.fetchUsers()
      }, (error) => {
        console.log("eroor is ", error)
      }
    )
  }
  /*public data: User[] = []
  private actualUser = this.tokenStorageService.getUser()

  fetchUsers() {
    if (this.actualUser.role === Role.Admin) {
      this.userService.getUsers().subscribe((Response) => {
          this.data = Response.filter(user=>user.id!=this.actualUser.id);
        }, (error) => {
          console.log("error is ", error)
        }
      );
    } else {
      this.userService.getUsersByBureau(this.actualUser.bureauId).subscribe((Response) => {
        this.data = Response.filter(user=>user.id!=this.actualUser.id);
      }, (error) => {
        console.log("error is ", error)
      })
    }
  }

  query:string="";

  search() {
    if(this.query!=""){
      if (this.actualUser.role === Role.Admin) {
        this.userService.SearchUsers(this.query).subscribe((Response) => {
            this.data = Response;
          }
          , (error) => {
            console.log("error is ", error)
          }
        );
      } else {
        const bureau={
          bureauId:this.actualUser.bureauId
        }
        this.userService.SearchUsersByBureau(this.query,bureau).subscribe((Response) => {
            this.data = Response;
          }
          , (error) => {
            console.log("error is ", error)
          }
        );
      }
    }
    else{
      this.fetchUsers()
    }
  }

  ngOnInit() {
    this.fetchUsers()
  }

  delete(id: number) {
    this.userService.DeletUser(id).subscribe((Response) => {
        this.fetchUsers()
      }, (error) => {
        console.log("eroor is ", error)
      }
    )
  }*/
}
