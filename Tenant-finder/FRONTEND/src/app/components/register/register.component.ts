import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

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

  ngOnInit() {}

}
