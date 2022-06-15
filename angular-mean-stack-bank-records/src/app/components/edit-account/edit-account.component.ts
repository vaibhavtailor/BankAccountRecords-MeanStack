import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

// export interface Account_number {
//   name: string;
// }

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})

export class EditAccountComponent implements OnInit {
  visible = true;
  selectable = true;
  selected: Boolean = false;
  removable = true;
  addOnBlur = true;
  //@ViewChild('chipList') chipList: any;
  @ViewChild('resetaccountForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  accountForm!: FormGroup;
  // account_numberArray: Account_number[] = [];
  // phoneArray: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit() {
    this.updateDetailForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private accountApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.accountApi.GetAccount(id).subscribe(data => {
      console.log(data.account_number)
      //this.account_number = data.account_number;
      this.accountForm = this.fb.group({
        account_name: [data.account_name, [Validators.required]],
        account_email: [data.account_email, [Validators.required]],
        account_number: [data.account_number, [Validators.required]],
        phone: [data.phone, [Validators.required]],
        dob: [data.dob, [Validators.required]],
        gender: [data.gender]
      })      
    })    
  }

  /* Reactive detail form */
  updateDetailForm() {
    this.accountForm = this.fb.group({
      account_name: ['', [Validators.required]],
      account_email: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  // /* Add dynamic languages */
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   // Add language
  //   if ((value || '').trim() && this.account_numberArray.length < 5) {
  //     this.account_numberArray.push({ name: value.trim() })
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // /* Remove dynamic languages */
  // remove(account_number: Account_number): void {
  //   const index = this.account_numberArray.indexOf(account_number);
  //   if (index >= 0) {
  //     this.account_numberArray.splice(index, 1);
  //   }
  // }

  /* Date */
  formatDate(e: { target: { value: string | number | Date; }; }) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    // this.accountForm.get('dob').setValue(convertDate, {
    //   onlyself: true
    // })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.accountForm.controls[controlName].hasError(errorName);
  }

  /* Update Account */
  updateAccountForm() {
    console.log(this.accountForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.accountApi.UpdateAccount(id, this.accountForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/accounts-list'))
      });
    }
  }
  
}