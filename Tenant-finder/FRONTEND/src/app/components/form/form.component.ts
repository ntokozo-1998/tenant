import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { CategoryService } from 'app/services/category.service';
import { RentalService } from 'app/services/rental.service';
import { RentalsComponent } from '../rentals/rentals.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent  implements OnInit {

  category!:any;
  image_link!:any;
  fileUploaded: any = 'no';
  submitted :boolean = false;
  sub:any;
  editRentalId:any
  rental!:any;
  myRental!:any;
  usertype!:string;
  title:string = 'Create Rental';
  ifVerrified: boolean = false;


  AddRentalForm: UntypedFormGroup = new UntypedFormGroup({
    UserID: new UntypedFormControl(''),
    // image: new FormControl(''),
    price: new UntypedFormControl(''),
    usertype: new UntypedFormControl(''),
    address:new UntypedFormControl(''),
    description: new UntypedFormControl(''),
    categoryID: new UntypedFormControl('')
  });

  

  update_dp = new UntypedFormGroup({
    file:new UntypedFormControl(),
    upload_preset: new UntypedFormControl()}
  );
  users: any;

  myForm() {
    this.AddRentalForm = this.fb.group({
      price:  ['', [ Validators.required, Validators.pattern('^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$') ]],
      usertype: ['', [ Validators.required]],
      color: ['', [ Validators.required]],
      address: ['', [ Validators.required]],
      description: ['', [ Validators.required]],
      categoryID: ['', [ Validators.required]]
    });
  }
  get formValidation(): { [key: string]: AbstractControl } {
    return this.AddRentalForm.controls;
  }

  // pattern="(\d{3})([\.])(\d{2})"
  cloudinaryUrl: string = 'https://api.cloudinary.com/v1_1/dbgjhr9ir/image/upload';
  file: any;
  isUpdating: boolean = false;

  constructor(private categoryService: CategoryService, private rentalService: RentalService, 
    public fb: UntypedFormBuilder, private http:HttpClient, private router: Router, private route: ActivatedRoute,
    private authServive:AuthService) { }

  ngOnInit(): void {

    if('loggedEmail' in sessionStorage)
    {

    }
    else
    {
      this.router.navigate(['/auth/login']);
    }

    this.myForm();

    
    this.categoryService.GetAllCategory().subscribe((res:any) => {
      this.category = res;
    });

    this.sub = this.route.params.subscribe(params => {
      return this.editRentalId = params['id'];
    });

    if(this.editRentalId != undefined)
    {
      this.title = "Edit Rental";

      this.populateDate(this.editRentalId)
    }
this.getAllUsers();
  }

  populateDate(editRentalId:any)
  {
    this.rentalService.GetAllPostedRental().subscribe((res:any) => {
      let result = res;
      this.rental = result.filter((res:any) => Number(res.livestockID) === Number(editRentalId))
      this.myRental = this.rental[0];

      if(this.rental!= undefined)
      {

        let indexofEmptyStr = String(this.rental[0].age).indexOf(" ");
        let lenghtStr = String(this.rental[0].age).length;
        this.usertype = String(this.rental[0].age).slice((Number(indexofEmptyStr) + 1), Number(lenghtStr))

        let priceStr = String(String(this.rental[0].price).slice(1, this.rental[0].price?.length));
        let indexofEmptyStrprice = String(priceStr).indexOf(',');
        let lenghtStrPrice = String(priceStr).length;
        let prices = String(priceStr).slice(0, (Number(indexofEmptyStrprice) + 1)) + String(priceStr).slice((Number(indexofEmptyStrprice) + 1), Number(lenghtStrPrice))

        console.log(prices.split(',').join(''));

        // this.breedService.GetAllBreed().subscribe((res:any) => {
        //   let result = res;
    
        //   // this.breed = result.filter((resss:any) => String(resss.categoryID) === String(this.rental[0].categoryID));
        // });

        this.AddRentalForm.setValue({
          price: Number(prices.split(',').join('')),
          gender: this.rental[0].gender,
          usertype: String(this.rental[0].age).slice((Number(indexofEmptyStr) + 1), Number(lenghtStr)),
          address: this.rental[0].address,
          description: this.rental[0].description,
          categoryID: this.category[0].categoryID,
        })

        console.log("felicia", this.AddRentalForm.value)

        this.imageSrc = String(this.myRental.image);

        console.log('ntoki', this.imageSrc)
      }

    });

  }

  
  // checkSelected(event:any)
  // {
  //   this.breedService.GetAllBreed().subscribe((res:any) => {
  //     let result = res;

  //     // this.breed = result.filter((resss:any) => String(resss.categoryID) === String(event.target.value));
  //   });

  // }

  async onFileChange(event :any)
  {
    if(event.target.files.length>0)
    {
      this.file =  event.target.files[0];
    }

  }
  addRental()
  {

    // ---------------------picture-------------- 

    // this.showSpinner();

    const formData = new FormData();    
    formData.append("file",this.file)    
    formData.append("upload_preset","nq04upkl"); 

    this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{     
      this.image_link = res.url;
      this.image.link = this.image_link;

      console.log(this.image.link)



      let rentalDetails = {
        UserID: Number(sessionStorage.getItem('loggedID')), 
        image: this.image.link, 
        price: this.AddRentalForm.value.price,
        status: 'Available',
        categoryID: this.AddRentalForm.value.categoryID,
        description: this.AddRentalForm.value.description,
        address: this.AddRentalForm.value.address
      }


      

      // this.showSpinner();
        this.rentalService.CreateRental(rentalDetails).subscribe((next:any) => {
          // this.natification.success("Successfully Added!");
          console.log(rentalDetails)
         
          this.router.navigate(['/seller']);
    
          this.submitted = false;
        }, (err:any) => {
          // if(err.status === 201)
          // {
          //   this.natification.success("Successfully Added!");
          //   this.router.navigate(['/seller']);
          // }
          // else if(err.status === 400)
          // {
          //   this.natification.danger("Something went wrong, please try again!")
          // }
          // else{
          //   this.natification.warning("Something went wrong, please try again!");
          // }
      });
  

  
    }
    , (ERROR) => {
      // if(ERROR.status === 201)
      // {
      //   this.natification.success("Successfully Added!");
      //   this.router.navigate(['/seller']);
      // }
      // else if(ERROR.status === 400)
      // {
      //    this.natification.danger("Something went wrong, please try again!");
      // }
      // else{
      //   this.natification.danger("Something went wrong, please try again!");
      // }
    }) 

    this.submitted = true;

  }  

// userNotVerified()
// {
//   this.natification.danger("Cannot create livestock,User not verified");
// }


  upload()
  {
    // this.showSpinner();
    let id = this.myRental.rentalID;

    let rentalDetails = {
      image: this.image_link, 
      price: this.AddRentalForm.value.price,
      status: 'Available',
      categoryID: this.AddRentalForm.value.categoryID,
      description: this.AddRentalForm.value.description,
      quantity: this.AddRentalForm.value.quantity,
      address: this.AddRentalForm.value.address,
    }

   
  
      this.rentalService.updateRental(id,rentalDetails).subscribe((next:any) => {
        
        this.router.navigate(['/seller']);
    
        this.submitted = false;
      }, (err) => {
        if(err.status === 200)
        {
          let msg ="Successfully Edited!";
          //  this.natification.success(msg);
           this.router.navigate(['/seller']);
        }
        else if(err.status === 201)
        {
          let msg ="Successfully Edited!";
          // this.natification.success(msg);

          this.router.navigate(['/seller']);
        }
        else if(err.status === 400)
        {
          let msg ="Something went wrong, please try again!";
          //  this.natification.danger(msg)
        }
        else{
          let msg = "Something went wrong, please try again!";
        //  this.natification.danger(msg)
        }
    });
      // this.router.navigate(['/homes']);
  } 
  
  async getAllUsers(){
    await this.authServive.GetAllUsers().subscribe((ans:any) => {
       let result = ans;   
       this.users = result.filter((res:any) => String(res.email) === String(sessionStorage.getItem('loggedEmail')))

       console.log(this.users)
       if((this.users[0].status).toUpperCase === 'Not-Verified'.toUpperCase)
       {
        this.ifVerrified = false;
        console.log(this.users[0].status)
       }
       else
       {
        this.ifVerrified = true;
       }
  });
}
  editRental(){

    

    const formData = new FormData();

    if(this.fileUploaded ==  'yes'){
      formData.append("file",this.file)    
      formData.append("upload_preset","nq04upkl"); 
  
      this.http.post(this.cloudinaryUrl,formData).subscribe((res:any)=>{     
        this.image_link = res.url;
        this.image.link = this.image_link;

        this.upload();
      })  

    }

    else{
      this.image_link = this.myRental.image
      this.upload()

    }
  }

  image = {
    link : '' 
  }

  activeColor: string = 'green';
    baseColor: string = '#ccc';
    overlayColor: string = 'rgba(255,255,255,0.5)';
    
    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageSrc: string = '';
    
    handleDragEnter() {
        this.dragging = true;
    }
    
    handleDragLeave() {
        this.dragging = false;
    }
    
    handleDrop(e:any) {
        e.preventDefault();
        this.dragging = false;
        this.handleInputChange(e);
    }
    
    handleImageLoad() {
        this.imageLoaded = true;
    }

    handleInputChange(e:any) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        if(e.target.files.length>0)
        {
          this.file =  e.target.files[0];
          this.fileUploaded =  'yes';
        }

        this.loaded = false;

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);

    }
    
    _handleReaderLoaded(e:any) {
        var reader = e.target;
        this.imageSrc = reader.result;
        this.loaded = true;
    }

    // showSpinner()
    // {
    //   this.spinner.show();
  
    //   setTimeout(()=>{
    //     this.spinner.hide();
    //   }, 2000)
  
    // }
    

}

