import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from './core/form/FormService';
import { AppMaterialComponent } from './app';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { DataSourceHttpService } from 'src/app/core/data/DataSourceHttpService';
import { DynamicContentDirective } from "./core/form/host/DynamicContentDirective";
import { CommandPanel } from './common/form/header/header';
import { ModalFormManagerMaterial, ModalFormMaterial } from './common/form/containers/modal/modal';
import { RegularFormManagerMaterial, RegularFormMaterial } from './common/form/containers/regular/regular';
import { ReferenceInput } from './common/form/controls/reference';
import { TruncatePipe } from './common/form/pipe';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import {FormBuilder, FormGroup} from '@angular/forms';

// import { RandomUsersListForm } from './components/randomuser/list.form';
// import { RandomUserObjectForm } from './components/randomuser/object.form';
// import { ProductsListForm } from './components/product/list.form';
// import { ProductObjectForm } from './components/product/object.form';
// import { CartsListForm } from './components/cart/list.form';
// import { CartObjectForm } from './components/cart/object.form';
// import { CommentsListForm } from './components/comment/list.form';
// import { Comment_ObjectForm } from './components/comment/object.form';
// import { PostsListForm } from './components/post/list.form';
// import { PostObjectForm } from './components/post/object.form';
// import { UsersListForm } from './components/user/list.form';
// import { UserObjectForm } from './components/user/object.form';
// import { Goods_CatalogObjectForm } from './components/onec/catalogs/goods/object.form';
// import { Goods_CatalogListForm } from './components/onec/catalogs/goods/list.form';
import { Customers_CatalogListForm } from './components/onec/catalogs/customers/list.form';
import { Customers_CatalogObjectForm } from './components/onec/catalogs/customers/object.form';
//import { Categories_CatalogListForm } from './components/onec/catalogs/categories/list.form';
//import { Categories_CatalogObjectForm } from './components/onec/catalogs/categories/object.form';
// import { SalesInvoice_DocumentListForm } from './components/onec/documents/salesinvoice/list.form';
import { SalesInvoice_DocumentObjectForm } from './components/onec/documents/salesinvoice/object.form';
// import { Products_EditRow } from './components/onec/documents/salesinvoice/products.edit.row';
// import { Products_AddRow } from './components/onec/documents/salesinvoice/products.add.row';

import { DefaultListForm } from './common/form/list/default.list';
import { DefaultTabularSectionRowForm } from './common/form/controls/DefaultTabularSectionRowForm';
import { TabularSection } from './common/form/controls/TabularSection';
import { DefaultCatalogObjectForm } from './common/form/object/DefaultCatalogObjectForm';

@NgModule({
  declarations: [
    TruncatePipe,
    AppMaterialComponent,

    DynamicContentDirective,
    ModalFormMaterial,
    ModalFormManagerMaterial,
    RegularFormMaterial,
    RegularFormManagerMaterial,
    CommandPanel,

    ReferenceInput,

    TabularSection,
    DefaultTabularSectionRowForm,

    DefaultCatalogObjectForm,

    DefaultListForm,
    // CartsListForm,
    // CartObjectForm,

    // CommentsListForm,
    // Comment_ObjectForm,

    // PostsListForm,
    // PostObjectForm,

    // ProductsListForm,
    // ProductObjectForm,

    // RandomUsersListForm,
    // RandomUserObjectForm,

    // UsersListForm,
    // UserObjectForm,


    // Goods_CatalogListForm,
    // Goods_CatalogObjectForm,

    //Categories_CatalogListForm,
    //Categories_CatalogObjectForm,

    Customers_CatalogListForm,
    Customers_CatalogObjectForm,

    // SalesInvoice_DocumentListForm,
    SalesInvoice_DocumentObjectForm,
    // Products_EditRow,
    // Products_AddRow,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    FormService,
    DataSourceHttpService,
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    FormBuilder,
  ],

  bootstrap: [AppMaterialComponent],
})
export class AppModule {}
