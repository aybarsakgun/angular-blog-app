import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserHttpService} from "../../shared/services/user-http.service";
import {Paginated} from "../../shared/types/paginated.type";
import {UserModel} from "../../shared/models/user.model";
import {combineLatest, Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, takeUntil, tap} from "rxjs/operators";
import {UserListService} from "../../shared/services/user-list.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  public users$: Observable<Paginated<UserModel>> | null = null;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private readonly userHttpService: UserHttpService,
    public readonly userListService: UserListService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.userListService.nameFilter$.asObservable().pipe(
        debounceTime(400),
        distinctUntilChanged((prev, next) => {
          if (prev !== next) {
            this.userListService.changePage(1);
          }
          return prev === next;
        }),
      ),
      this.userListService.currentPage$.asObservable()
    ]).pipe(
      takeUntil(this.unsubscribe$),
      tap(([name, page]) => {
        this.users$ = this.userHttpService.getUsers({
          page,
          ...(name ? {name} : undefined)
        });
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
