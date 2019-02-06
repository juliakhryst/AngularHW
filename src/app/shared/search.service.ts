import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubUser } from './models/github-user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  searchUsers(search: string, page = 0): Observable<any> {
    // https://api.github.com/search/users?q={query}{&page,per_page,sort,order}
    const url = `${environment.githubApiUrl}/search/users?q=${search}&per_page=20&page=${page}`;
    return this.http.get(url);
  }

  getUserData(id: string): Observable<GithubUser> {
      const url = `${environment.githubApiUrl}/user/${id}`;
      return this.http.get<GithubUser>(url);
    }

  getUserRepos(userName: string): Observable<any> {
      const url = `${environment.githubApiUrl}/users/${userName}/repos`;
      return this.http.get(url);
  }
}
