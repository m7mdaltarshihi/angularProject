import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUser } from '../DTOs/AddUser';
import { User } from '../DTOs/User';
import { AssignRole } from '../DTOs/AssignRole';
import { SignIn } from '../DTOs/SignIn';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = ''
  constructor(private client: HttpClient) {

    this.baseUrl = environment.APIUrl
  }

  loadAllUsers(): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/GetUsers`)
  }

  loadAllRoles(): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/GetAllRoles`)

  }
  addUser(newUser: AddUser): Observable<any> {
    debugger
    return this.client.post(`${this.baseUrl}/api/Users/AddUser`, newUser)
  }
  SearchByName(name: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/SearchByName?name=${name}`)
  }
  deleteUser(id: string): Observable<any> {

    return this.client.delete(`${this.baseUrl}/api/Users/DeleteUser?id=${id}`)
  }

  loadById(id: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/LoadById?UserId=${id}`)
  }

  updateUser(user: User): Observable<any> {
    debugger
    return this.client.put(`${this.baseUrl}/api/Users/UpdateUser`, user)
  }
  SortByRole(roleName: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/SortByRole?name=${roleName}`)
  }
  GetAllRoles(): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/GetAllRoles`)
  }
  AssignRole(assignRoleDTO: AssignRole): Observable<any> {
    debugger
    return this.client.post(`${this.baseUrl}/api/Users/AssignRole`, assignRoleDTO);
  }
  Login(signIn: SignIn): Observable<any> {
    debugger
    return this.client.post(`${this.baseUrl}/api/Users/Login`, signIn)
  }
  GetUserRoles(userName: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/GetUserRoles?userName=${userName}`)
  }
  SearchByUserName(userName: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/SearchByUserName?userName=${userName}`)
  }
}
