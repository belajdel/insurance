import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ObligComponent} from './modules/Obligatoire/oblig/oblig.component';
import {LoginAmanaComponent} from './modules/login-amana/login-amana.component';
import {TableobligComponent} from './modules/Obligatoire/tableoblig/tableoblig.component';
import {dashbordComponent} from './modules/dashbord/dashbord.component';
import {ObligUpdateComponent} from './modules/Obligatoire/oblig-update/oblig-update.component';
import {PdfObligComponent} from './modules/Obligatoire/pdf-oblig/pdf-oblig.component';
import {TravelComponent} from './modules/Travel Assurance/travel/travel.component';
import {TravelUpdateComponent} from './modules/Travel Assurance/travel-update/travel-update.component';
import {SanteComponent} from './modules/SanteAssurance/sante/sante.component';
import {RapportObligComponent} from './modules/Mes Rapports/rapport-oblig/rapport-oblig.component';
import {TroismeComponent} from './modules/Trosime Assurance/troisme/troisme.component';
import {AddUserComponent} from './modules/User Crud/add-user/add-user.component';
import {UpdateUserComponent} from './modules/User Crud/update-user/update-user.component';
import {UpdateSanteComponent} from './modules/SanteAssurance/update-sante/update-sante.component';
import {BureauComponent} from './modules/Bureau Crud/bureau/bureau.component';
import {UpdateBureauComponent} from './modules/Bureau Crud/update-bureau/update-bureau.component';
import {UpdateTroismeComponent} from './modules/Trosime Assurance/update-troisme/update-troisme.component';
import {RapportTroismeComponent} from './modules/Mes Rapports/rapport-troisme/rapport-troisme.component';
import {RapportSanteComponent} from './modules/Mes Rapports/rapport-sante/rapport-sante.component';
import {RapportTravelComponent} from './modules/Mes Rapports/rapport-travel/rapport-travel.component';
import {RapportTousComponent} from './modules/Mes Rapports/rapport-tous/rapport-tous.component';
import {DemandePaymentComponent} from './modules/credi/demande-payment/demande-payment.component';
import {PaymentComponent} from './modules/credi/payment/payment.component';
import {authGuard, loginGuard} from "./core/guards/auth.guard";
import {roleGuard} from "./core/guards/role.guard";
import {Role} from "./public/enum/Role";
import {LoginIctComponent} from './modules/login-ict/login-ict.component';
import {BureauTabComponent} from "./modules/Bureau Crud/bureau-tab/bureau-tab.component";
import {UserTabComponent} from "./modules/User Crud/user-tab/user-tab.component";
import {TravelTabComponent} from "./modules/Travel Assurance/travel-tab/travel-tab.component";
import {TroismeTabComponent} from "./modules/Trosime Assurance/troisme-tab/troisme-tab.component";
import {SanteTabComponent} from "./modules/SanteAssurance/sante-tab/sante-tab.component";
import {MychartComponent} from "./modules/Mes Charts/mychart/mychart.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', redirectTo: 'dashboard/home', pathMatch: 'full'},
  {path: 'login', component: LoginAmanaComponent, canActivate: [loginGuard]},
  {
    path: 'dashboard', component: dashbordComponent, canActivate: [authGuard],
    children: [
      {
        path: 'home', canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director, Role.User]},
        component: MychartComponent
      },
      {
        path: 'offices', canActivate: [roleGuard], data: {role: [Role.Admin]},
        children: [
          {path: '', component: BureauTabComponent},
          {path: 'update', component: UpdateBureauComponent},
          {path: 'add', component: BureauComponent},
        ]
      },
      {
        path: 'users', canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director]},
        children: [
          {path: '', component: UserTabComponent},
          {path: 'update', component: UpdateUserComponent},
          {path: 'add', component: AddUserComponent},
        ]
      },
      {
        path: 'obligatoryInsurances', canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director, Role.User]},
        children: [
          {path: '', component: TableobligComponent},
          {path: 'update', component: ObligUpdateComponent},
          {path: 'add', component: ObligComponent},
          /*{path: 'pdfOblig/:id', component: PdfObligComponent},*/
        ]
      },
      {
        path: 'travelInsurances', canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director, Role.User]},
        children: [
          {path: '', component: TravelTabComponent},
          {path: 'update', component: TravelUpdateComponent},
          {path: 'add', component: TravelComponent}
        ]
      },
      {
        path: 'healthInsurances', canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director, Role.User]},
        children: [
          {path: '', component: SanteTabComponent},
          {path: 'add', component: SanteComponent},
          {path: 'update', component: UpdateSanteComponent},
        ]
      },
      {
        path: 'thirdInsurance', canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director, Role.User]},
        children: [
          {path: '', component: TroismeTabComponent},
          {path: 'add', component: TroismeComponent},
          {path: 'update', component: UpdateTroismeComponent},
        ]
      },
      {
        path: 'reports', canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director, Role.User]},
        children: [
          {path: 'obligatory', component: RapportObligComponent},
          {path: 'travel', component: RapportTravelComponent},
          {path: 'health', component: RapportSanteComponent},
          {path: 'third', component: RapportTroismeComponent},
          {path: 'all', component: RapportTousComponent},
        ]
      },
      {
        path: 'credit', canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director, Role.User]},
        children: [
          {path: 'demand', component: DemandePaymentComponent},
          {path: 'payment', component: PaymentComponent},
        ]
      }
    ]
  },
  /*{path: 'addOblig', component: ObligComponent},

  {path: 'table', component: TableobligComponent},
  /!*{path: 'dashboard', component: dashbordComponent, canActivate: [authGuard]},*!/
  {path: 'updateOblig', component: ObligUpdateComponent},
  {path: 'travel', component: TravelComponent},
  {path: 'updateTravel/:id', component: TravelUpdateComponent},
  {path: 'pdfOblig/:id', component: PdfObligComponent},
  {path: 'sante', component: SanteComponent},
  {path: 'RapportOblig', component: RapportObligComponent},
  {path: 'troisme', component: TroismeComponent},
  {path: 'addUser', component: AddUserComponent, canActivate: [roleGuard], data: {role: [Role.Admin, Role.Director]}},
  {path: 'updateUser/:id', component: UpdateUserComponent},
  {path: 'updateSante', component: UpdateSanteComponent},
  {path: 'addBeureau', component: BureauComponent},
  {path: 'updateBureau/:id', component: UpdateBureauComponent},
  {path: 'updateTroisme/:id', component: UpdateTroismeComponent},
  {path: 'RapportTroisme', component: RapportTroismeComponent},
  {path: 'RapportSante', component: RapportSanteComponent},
  {path: 'RapportTravel', component: RapportTravelComponent},
  {path: 'RapportTous', component: RapportTousComponent},
  {path: 'DemandePayment', component: DemandePaymentComponent},
  {path: 'Payment/:id', component: PaymentComponent},
  {path: 'testlogin', component: TestloginComponent, canActivate: [loginGuard]},*/


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
