import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import { environment } from 'src/environments/environment';
import {Paginated} from "../types/paginated.type";
import {UserModel} from "../models/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {
  private readonly baseApiUrl = environment.baseApiUrl + '/users';

  getUsers(params: {
    page?: number;
    name?: string;
  } = {}): Observable<Paginated<UserModel>> {
    return this.get<Paginated<UserModel>>(this.baseApiUrl, this.buildParameters(params));
  }
}
