import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  step = 1;
  message= 'Hang tight...'


  user = {
    name:'',
    surname :'',
    email :'',
    password:'',
    account :''
  }
  constructor() { }

  ngOnInit() {
  }

}
