import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './front-end-models/post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  loadedPosts = [];
  url = 'https://ng-complete-guide-b5b67.firebaseio.com/posts.json';
  constructor(private http: HttpClient) { }

  ngOnChanges() {
    this.onFetchPosts();
  }

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{Post}>(
        this.url,
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.http.get<{[key: string]:Post }>(this.url)
      .pipe(
        map((resData) => {
          console.log('Fetched:', resData);
          const postsArray = [];
          for (const key in resData) {
            postsArray.push({ ...resData[key], id: key });
          }
          return postsArray;
        })
      )
      .subscribe(resPonse => {
        console.log('Array of Posts:', resPonse);
        this.loadedPosts = resPonse;
    })
  }

  onClearPosts() {
    // Send Http request
  }
}




