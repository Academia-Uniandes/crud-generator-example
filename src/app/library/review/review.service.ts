import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReviewModel } from './review.model';
import { LocatorReviewService } from './review-locator.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ReviewService {

  private headers: HttpHeaders;
  constructor(private http: HttpClient, private urlService: LocatorReviewService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain'});
  }
  
  saveReview(review: ReviewModel){
    return review.id ? this.updateReview(review) : this.createReview(review);
  }

  private createReview(review:ReviewModel){
    let body = JSON.stringify(review);
    return this.http.post(this.urlService.getUrlCreate(), body, { headers: this.headers})
      .catch(this.handleError);
  }
	
  private updateReview(review:ReviewModel){
    let body = JSON.stringify(review); 
    return this.http.put(this.urlService.getUrlUpdate(), body, { headers: this.headers})
    .catch(this.handleError);
  }

  searchReviews(start: number, limit: number, query?: string){
    let params = new HttpParams().set('offset', start.toString());
    params = params.append('limit', limit.toString());
    return this.http.get(this.urlService.getUrlList(),{params : params})
    .catch(this.handleError)  
  }
  
  getReviewById(id: number){
    return this.http.get(this.urlService.getUrlGetItem() + '/' + id)
    .catch(this.handleError)
  }

  getNumTotalReview(){
     return this.http.get(this.urlService.getUrlListNum())
     .catch(this.handleError)
  }
  
	
  deleteReview(id: number){
    return this.http.delete(this.urlService.getUrlDeleteItem() + '/' + id, { headers: this.headers})
    .catch(this.handleError)
  }

  private handleError(error: Response){ 
    return Observable.throw(error.statusText || 'Server error');
  }


}
