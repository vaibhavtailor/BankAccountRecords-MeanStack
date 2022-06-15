import { Account } from './../../shared/account';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css'],
})

export class AccountsListComponent implements OnInit {
  AccountData: any = [];
  dataSource!: MatTableDataSource<Account>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    '_id',
    'account_name',
    'account_email',
    'phone',
    'action'
  ];

  constructor(private accountApi: ApiService) {
    this.accountApi.GetAccounts().subscribe(data => {
      this.AccountData = data;
      this.dataSource = new MatTableDataSource<Account>(this.AccountData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {}

  deleteAccount(index: number, e: { _id: any; }) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        (this.paginator.pageIndex * this.paginator.pageSize) + index, 1 );
      this.dataSource.data = data;
      this.accountApi.DeleteAccount(e._id).subscribe()
    }
  }
}