import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserHttpService} from "../../../../shared/services/user-http.service";
import {combineLatest, Observable} from "rxjs";
import {Paginated} from "../../../../shared/types/paginated.type";
import {PostModel} from "../../../../shared/models/post.model";
import {UserModel} from "../../../../shared/models/user.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit {
  userId: number | null = null;
  userWithPosts$: Observable<{
    user: UserModel,
    posts: Paginated<PostModel>
  }> | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly userHttpService: UserHttpService
  ) {
  }

  ngOnInit(): void {
    this.userId = +this.activatedRoute.snapshot.params.userId;
    this.userWithPosts$ = combineLatest([
      this.userHttpService.getUser(this.userId),
      this.userHttpService.getUserPosts(this.userId)
    ]).pipe(
      map(([user, posts]) => {
        return {
          user,
          posts
        }
      })
    );
  }

}
