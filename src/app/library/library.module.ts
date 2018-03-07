import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './library.component';
import {  BookCrudComponent , ReviewChildComponent , AuthorChildComponent , AuthorCrudComponent , BookChildComponent , ReviewComponent , EditorialComponent  } from './';
import { BookCrudListComponent, BookCrudDetailComponent, BookCrudService, LocatorBookCrudService } from './book-crud';
import { AuthorCrudListComponent, AuthorCrudDetailComponent, AuthorCrudService, LocatorAuthorCrudService } from './author-crud';
import { ReviewListComponent, ReviewDetailComponent, ReviewService, LocatorReviewService } from './review';
import { EditorialListComponent, EditorialDetailComponent, EditorialService, LocatorEditorialService } from './editorial';
	


import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  {path: '', redirectTo: 'bookcrud/list', pathMatch: 'full' },
  
  {path: 'bookcrud', component:BookCrudComponent, children:[
	  {path:'list', component:BookCrudListComponent},
	  {path:'edit/:id', component:BookCrudDetailComponent},
	  {path:'create', component:BookCrudDetailComponent}]
  },
  
  
  {path: 'authorcrud', component:AuthorCrudComponent, children:[
	  {path:'list', component:AuthorCrudListComponent},
	  {path:'edit/:id', component:AuthorCrudDetailComponent},
	  {path:'create', component:AuthorCrudDetailComponent}]
  },
  
  
  {path: 'review', component:ReviewComponent, children:[
	  {path:'list', component:ReviewListComponent},
	  {path:'edit/:id', component:ReviewDetailComponent},
	  {path:'create', component:ReviewDetailComponent}]
  },
  
  
  {path: 'editorial', component:EditorialComponent, children:[
	  {path:'list', component:EditorialListComponent},
	  {path:'edit/:id', component:EditorialDetailComponent},
	  {path:'create', component:EditorialDetailComponent}]
  },
  
  
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ], 
  declarations: [LibraryComponent, BookCrudComponent,BookCrudListComponent, BookCrudDetailComponent ,ReviewChildComponent ,AuthorChildComponent ,AuthorCrudComponent,AuthorCrudListComponent, AuthorCrudDetailComponent ,BookChildComponent ,ReviewComponent,ReviewListComponent, ReviewDetailComponent ,EditorialComponent,EditorialListComponent, EditorialDetailComponent ],
  providers: [ BookCrudService, LocatorBookCrudService , AuthorCrudService, LocatorAuthorCrudService , ReviewService, LocatorReviewService , EditorialService, LocatorEditorialService ],
exports:[ BookCrudComponent, BookCrudListComponent, BookCrudDetailComponent , AuthorCrudComponent, AuthorCrudListComponent, AuthorCrudDetailComponent , ReviewComponent, ReviewListComponent, ReviewDetailComponent , EditorialComponent, EditorialListComponent, EditorialDetailComponent ],})
export class LibraryModule { }

