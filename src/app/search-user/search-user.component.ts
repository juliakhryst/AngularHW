import { Component, OnInit } from '@angular/core';
import { SearchService } from '../shared/search.service';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  userName: string;
  userList: any[];
  currentPage = 0;
  totalItems: number;
  errorMessage: string;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const activeSearch = params.userName;

      if (activeSearch) {
        this.userName = activeSearch;
        this.searchUser(activeSearch);
      } else {
        this.searchUser('test');
      }
    });
  }

  searchUser(userName: string, page?: number) {
    const queryParams: Params = { userName: userName };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
    this.searchService.searchUsers(userName, page).subscribe(users => {
      this.userList = users.items;
      this.totalItems = users.total_count;
    }, err => {
      this.userList = [];
      this.totalItems = 0;
      this.errorMessage = err.message;
    });
  }

  prev() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.searchUser(this.userName, this.currentPage);
    }
  }

  next() {
    if (this.currentPage < Math.ceil(this.totalItems / 20)) {
      this.currentPage++;
      this.searchUser(this.userName, this.currentPage);
    }
  }

}
