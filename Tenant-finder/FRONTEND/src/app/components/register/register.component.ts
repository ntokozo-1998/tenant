import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,ValidatorFn, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  selected: any = 'Tenant';

  private subscriptions : Subscription[] = [];

  registerForm = new FormGroup({
    password: new FormControl(),
    email: new FormControl(),
    fullname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    confirmPassword: new FormControl(),
    usertype: new FormControl()
  });

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) { }

  ngOnInit(): void {
    // this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      // this.spinner.hide();
    }, 1000);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'User register',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  onRegister(form : FormGroup)
  {
    if(form.valid)
    {
      if(form.value.confirmPassword == form.value.password)
      {
        this.subscriptions.push(
          this.authService.register(form.value).subscribe((response:any)=>{
            this.router.navigateByUrl('/login');
            // this.toastr.success("Welcome to Change World"+form.value.name+"!");
          },(error:HttpErrorResponse)=>{
            // this.toastr.error(JSON.stringify(error.error.message));
            console.log(error)
          })
        )
      }else{
        // this.toastr.warning("Passwords do not match");
      }
    }
  }

  checkSelected(event:any){
    this.selected = event.target.value;
    console.log(this.selected);
  }
}
