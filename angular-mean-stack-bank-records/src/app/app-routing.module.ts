import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-account'},
  { path: 'add-account', component: AddAccountComponent},
  { path: 'edit-account/:id', component: EditAccountComponent},
  { path: 'accounts-list', component: AccountsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
