import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module'
import { ServiceMainLocator } from './service-locator-main';
import { SharedModule } from './shared/shared.module';
import { routes as libraryChildRoutes } from './library/library.module';import { LibraryModule } from './library/library.module';
import { LibraryComponent } from './library/library.component';




const routes: Routes = [
{path: '', redirectTo: 'library', pathMatch: 'full'},	{path: 'library', component:LibraryComponent ,children: libraryChildRoutes }]


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    RouterModule.forRoot(routes),
    SharedModule,
    LibraryModule   ],
  providers: [ServiceMainLocator, ],
  bootstrap: [AppComponent],
})
export class AppModule { }

