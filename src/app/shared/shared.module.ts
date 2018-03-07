
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxBootstrapModule } from '../ngx-bootstrap.module';
import { SearchComboBoxModule } from 'ngx-academia-uniandes-library'
import { I18nModule } from '../i18n/i18n.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxBootstrapModule,
        I18nModule,
        HttpClientModule,
        SearchComboBoxModule
    ],
    declarations: [PaginationComponent, NavbarComponent],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, PaginationComponent, SearchComboBoxModule, NgxBootstrapModule, I18nModule, NavbarComponent],
    providers: []
})
export class SharedModule { }