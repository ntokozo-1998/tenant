import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { JwtService } from 'app/services/jwt.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  private subscriptions : Subscription[] = [];
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });


  constructor(private authService: AuthService,private router:Router,private jwt :JwtService) { }
 

  ngOnInit(): void {

    // this.spinner.show();
    if(localStorage.getItem('token')!= null && localStorage.getItem('usertype') == "tenants")
    {
      this.router.navigateByUrl('/tenants');
    }else if(localStorage.getItem('token')!= null && localStorage.getItem('usertype') == "landlord"){

      this.router.navigateByUrl('/lordland');
    }
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      // this.spinner.hide();
    }, 1000);
  }

  onLogin(form : FormGroup)
  {
    console.log("first")
    
    // this.spinner.show();
        setTimeout(() => {
      /** spinner ends after 5 seconds */
        // this.spinner.hide();
        }, 2000);

    this.subscriptions.push(
      this.authService.login(form.value).subscribe((data: any)=>{
        this.authService.saveToken(data.token);

        const {email,fullname,usertype,user_id,password} = this.jwt.getData(data.token);
        localStorage.setItem('usertype', usertype);
        localStorage.setItem('email',email);
        localStorage.setItem('fullname',fullname);
        localStorage.setItem('user_id',user_id);
        localStorage.setItem('password',password);

        if(usertype =="Tenant") //route to relevent page
        {
          // this.toastr.success("Welcome "+name);
          this.router.navigateByUrl('/tenants');
        }else if(this.jwt.getData(data.token).account =="landlord") //route to relevent page
        {
          // this.toastr.success("Welcome "+name);
          this.router.navigateByUrl('/landlord');
        } 

    },(error:HttpErrorResponse)=>{
      // this.toastr.error(error.error.message);
    })
    )    
  }

}
