import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './posts/post.model';
import { PostsService } from './posts/posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnChanges {
  loadedPosts: Post[] = [];
  isFetching = false;
  url = 'https://ng-complete-guide-b5b67.firebaseio.com/posts.json';
  error = null;

  constructor(private http: HttpClient, private postsService:PostsService) { }

  ngOnChanges() {
    this.onFetchPosts();
  }

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {

        this.error = error.message;
        console.log('Err: ', error);
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
        this.error = error.message;
    });
  }
  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
  }




