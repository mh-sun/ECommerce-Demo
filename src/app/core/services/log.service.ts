import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public userSubscription:any
  public loggedUser = new BehaviorSubject<User|null>(null)
  public logChange$ = new BehaviorSubject(false)

  private url = 'http://localhost:3000/'

  constructor(private http:HttpClient){
    let str = localStorage.getItem('loggedUser')
    if(str === null){
      this.loggedUser.next(null)
      this.logChange$.next(false)
    }
    else{
      this.loggedUser.next(JSON.parse(str))
      this.logChange$.next(true)
    }
    this.loggedUser.subscribe(user=>{
      if(user !== null){
        this.storeUser(user)
        http.put<User>(this.url+'users/'+user?.id, user).subscribe(res=>{})
      }
    })
  }
    
  getUsers(){
      let link = this.url + 'users'
      return this.http.get<User[]>(link)
  }

  getOneUser(id:number){
    let link = this.url + 'users'+'/'+id
    return this.http.get<User>(link)
  }

  updateUser(id:any, user:any){
    let link = this.url + 'users/' + id
    return this.http.patch<User>(link, user)
  }

  Registration(user: User){
      let link = this.url + 'users'
      return this.http.post(link, user);
  }

  logIn(user:User){
    localStorage.setItem('loggedUser', JSON.stringify(user))
    this.loggedUser.next(user)
    this.logChange$.next(true)
  }

  logout(){
    localStorage.removeItem('loggedUser')
    this.loggedUser.next(null)
    this.logChange$.next(false)
  }

  storeUser(user:User|null){
    if(user === null) return
    localStorage.setItem('loggedUser', JSON.stringify(user))

  }

  deleteUser(id:number) {
    const newUrl = this.url+ 'users'+'/'+id;
    return this.http.delete(newUrl);
  }
}
