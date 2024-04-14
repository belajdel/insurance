import { Injectable } from '@angular/core';
import {Bureau} from "../../public/models/bureau.model";
import {HttpClient} from "@angular/common/http";
import {BureauService} from "./bureau.service";
import {User} from "../../public/models/user.model";
import {UserService} from "./user.service";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private _bureaux:Bureau[]=[]
  private _allUsers:User[]=[]
  private _bureauUsers:User[]=[]
  private _selectedBureauUsers:User[]=[]
  constructor(private bureauService:BureauService,private userService:UserService,private tokenStorageService:TokenStorageService) { }

  public get bureaux():Bureau[]{
    return this._bureaux
  }
  public set bureaux(value:Bureau[]){
    this._bureaux=value
  }
  get allUsers(): User[] {
    return this._allUsers;
  }

  set allUsers(value: User[]) {
    this._allUsers = value;
  }

  get bureauUsers(): User[] {
    return this._bureauUsers;
  }

  set bureauUsers(value: User[]) {
    this._bureauUsers = value;
  }

  get selectedBureauUsers(): User[] {
    return this._selectedBureauUsers;
  }

  set selectedBureauUsers(value: User[]) {
    this._selectedBureauUsers = value;
  }


  fetchBureaux()  {
    this.bureaux=[]
    this.bureauService.getBureaux().subscribe((res:Bureau[])=> {
      res.map((bureau:Bureau)=>{
        this.bureaux.push(bureau)
      })
    })
  }

  fetchAllUsers()  {
    this.userService.getUsers().subscribe((res:User[])=> {
      this.allUsers=res
    })
  }

  fetchUsersByBureau()  {
    this.userService.getUsersByBureau(this.tokenStorageService.getUser().bureauId).subscribe((res:User[])=> {
      this.bureauUsers=res
    })
  }

  fetchUsersBySelectedBureau(id:number)  {
    this.userService.getUsersByBureau(id).subscribe((res:User[])=> {
      this.selectedBureauUsers=res
    })
  }

}
