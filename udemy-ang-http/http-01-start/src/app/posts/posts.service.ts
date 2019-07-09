import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  url = 'https://ng-complete-guide-b5b67.firebaseio.com/posts.json';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http
      .post<{ name: string }>(
        this.url,
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
          this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(this.url)
      .pipe(
        map((resData) => {
          const postsArray = [];
          for (const key in resData) {
            postsArray.push({ ...resData[key], id: key });
          }
          return postsArray;
        })
      );
  }
  deletePosts() {
    return this.http.delete(this.url);
  }
}

