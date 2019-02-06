import { Component, OnInit } from '@angular/core';
import { SearchService } from '../shared/search.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  selectedUser: any;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params.id;

      this.searchService.getUserData(userId).pipe(
        mergeMap(userData => this.searchService.getUserRepos(userData.login).pipe(
          map(repos => {
            return ({ userData, repos });
          }))
        )
      ).subscribe(res => {
        this.selectedUser = res;
      });
    });
  }

}
