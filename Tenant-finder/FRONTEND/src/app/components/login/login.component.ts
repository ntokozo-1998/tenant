import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { JwtService } from 'app/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  message= 'Hang tight...'

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  forgotPasswordForm = new FormGroup({
    email: new FormControl()
  });

  constructor(private authService: AuthService,private router:Router,private jwt :JwtService) { }

  ngOnInit(): void {
    //this.toast.info({summary: 'Login successful',position:'tr',detail: 'Success',duration: 3000})
    

    if(sessionStorage.getItem('token')!= null && sessionStorage.getItem('account') == "Client")
    {
      // this.spinner.show();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        // this.spinner.hide();
        this.router.navigateByUrl('/tenant');
          }, 2000);
      
    }else if(sessionStorage.getItem('token')!= null && sessionStorage.getItem('usertype') == "Landlord"){

      
      setTimeout(() => {
        /** spinner ends after 5 seconds */
          // this.spinner.hide();
          this.router.navigateByUrl('/landlord');
          }, 2000);
    }

   


   
  }




  onLogin(form : FormGroup)
  {
    
    // this.spinner.show();
     
      this.authService.login(form.value).subscribe((data: any)=>{
        this.authService.saveToken(data.token);
  
        const {email,password,usertype,user_id} = this.jwt.getData(data.token);
        sessionStorage.setItem('usertype', usertype);
        sessionStorage.setItem('email',email);
        sessionStorage.setItem('password',password);
        sessionStorage.setItem('user_id',user_id);


        setTimeout(() => { 
          this.message = 'Logging you in...'
        },2000);
    
        setTimeout(() => { 
          this.message = 'Welcome to DevLav.com'
        }, 4000);
    
        setTimeout(() => { 

          if(usertype == "Tenant") //route to relevent page
          {
            
            this.router.navigateByUrl('/tenant');
          }else if(this.jwt.getData(data.token).account =="Landlord") //route to relevent page
          {
            
            this.router.navigateByUrl('/landlord');
          }

          // this.spinner.hide();
        }, 6000); 

    },(error:HttpErrorResponse)=>{

      // this.spinner.hide();
      // this.toast.error({detail:"Sorry!",summary:error.error.message});
    })
       
  }


  forgotPasswordSubmit(form: FormGroup)
  {
    // this.spinner.show()
    this.authService.forgotPassword(form.value).subscribe((data: any)=>{
      setTimeout(() => {
        // this.spinner.hide();
        // this.toast.success({detail:"Good News!", summary:'Credentials sent to your email',position:'tr',duration:3000})
      
        
        this.router.navigateByUrl('');
      }, 1000);
     

    },(error:HttpErrorResponse)=>{
      form.reset()
      
      setTimeout(() => {
        // this.spinner.hide();
        // this.toast.error({detail:"Sorry!", summary:'No user registered with this email',position:'tr',duration:3000})
      }, 1000);
    });



  }

}