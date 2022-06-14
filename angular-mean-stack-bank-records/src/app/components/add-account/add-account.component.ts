import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Account_number {
  name: string;
}

type account_number = any

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
})

export class AddAccountComponent implements OnInit {
  visible = true;
  selectable = true;
  selected: Boolean = false;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetAccountForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  accountForm!: FormGroup;
  account_numberArray: Account_number[] = [];
  phoneArray: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private accountApi: ApiService
  ) {}

  ngOnInit() {
    this.submitDetailFrom();
  }

  submitDetailFrom() {
    this.accountForm = this.fb.group({
      account_name: ['', [Validators.required]],
      account_email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      account_numbers: [this.account_numberArray],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }


  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.account_numberArray.length < 5) {
      this.account_numberArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(account_number: account_number): void {
    const index = this.account_numberArray.indexOf(account_number);
    if (index >= 0) {
      this.account_numberArray.splice(index, 1);
    }
  }

  /* Date */
  formatDate(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    // this.accountForm.get('dob').setValue(convertDate, {
    //   onlyself: true
    // })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.accountForm.controls[controlName].hasError(errorName);
  }

  /* Submit Detail */
  submitAccountForm() {
    if (this.accountForm.valid) {
      this.accountApi.AddAccount(this.accountForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/accounts-list'))
      });
    }
  }

}