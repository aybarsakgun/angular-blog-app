import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {Paginated} from "../../shared/types/paginated.type";
import {UserModel} from "../../shared/models/user.model";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, startWith, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  public users$: Observable<Paginated<UserModel>> | null = null;
  public unsubscribe$: Subject<boolean> = new Subject();
  public currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public nameFilter$: Subject<string> = new Subject<string>();

  constructor(
    private readonly userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.nameFilter$.pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged()
      ),
      this.currentPage$
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([name, page]) => {
      console.log(name, page);
      this.users$ = this.userService.getUsers({
        page,
        name
      });
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
