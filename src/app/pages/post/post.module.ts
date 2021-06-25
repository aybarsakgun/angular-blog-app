import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {PostListComponent} from "./components/post-list/post-list.component";

const routes: Routes = [
  {
    path: ':userId',
    component: PostListComponent
  },
];

@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})

export class PostModule {
}
