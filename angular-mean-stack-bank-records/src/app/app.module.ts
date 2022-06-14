import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAccountComponent,
    EditAccountComponent,
    AccountsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
