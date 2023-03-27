import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { LandlordComponent } from './components/landlord/landlord.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'rentals', component:LoginComponent},
  {path: 'landing', component:LandingComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'form', component:FormComponent},
  {path: 'landlord', component:LandlordComponent},
  {path: 'tenant', component:TenantsComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
