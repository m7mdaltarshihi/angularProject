import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUser } from '../DTOs/AddUser';
import { User } from '../DTOs/User';
import { AssignRole } from '../DTOs/AssignRole';
import { SignIn } from '../DTOs/SignIn';
import { environment } from 'src/environments/environment.development';
import { ChangePassword } from '../DTOs/ChangePassword';

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
  insert(newUser: AddUser): Observable<any> {

    return this.client.post(`${this.baseUrl}/api/Users/AddUser`, newUser)
  }
  searchByName(name: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/SearchByName?name=${name}`)
  }
  delete(id: string): Observable<any> {

    return this.client.delete(`${this.baseUrl}/api/Users/DeleteUser?id=${id}`)
  }

  loadById(id: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/LoadById?UserId=${id}`)
  }

  update(user: User): Observable<any> {

    return this.client.put(`${this.baseUrl}/api/Users/UpdateUser`, user)
  }
  sortByRole(roleName: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/SortByRole?name=${roleName}`)
  }
  getAllRoles(): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/GetAllRoles`)
  }
  assignRole(assignRoleDTO: AssignRole): Observable<any> {

    return this.client.post(`${this.baseUrl}/api/Users/AssignRole`, assignRoleDTO);
  }
  login(signIn: SignIn): Observable<any> {

    return this.client.post(`${this.baseUrl}/api/Users/Login`, signIn)
  }
  getUserRoles(userName: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/GetUserRoles?userName=${userName}`)
  }
  searchByUserName(userName: string): Observable<any> {

    return this.client.get(`${this.baseUrl}/api/Users/SearchByUserName?userName=${userName}`)
  }
  changePassword(changePassword: ChangePassword): Observable<any> {
    return this.client.put(`${this.baseUrl}/api/Users/ChangePassword`, changePassword)
  }
}
