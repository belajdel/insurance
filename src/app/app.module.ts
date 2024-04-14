import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAmanaComponent } from './modules/login-amana/login-amana.component';
import { ObligComponent } from './modules/Obligatoire/oblig/oblig.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableobligComponent } from './modules/Obligatoire/tableoblig/tableoblig.component';
import { dashbordComponent } from './modules/dashbord/dashbord.component'; // Import FormsModule or ReactiveFormsModule
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ObligUpdateComponent } from './modules/Obligatoire/oblig-update/oblig-update.component';
import { PdfObligComponent } from './modules/Obligatoire/pdf-oblig/pdf-oblig.component';
import { MychartComponent } from './modules/Mes Charts/mychart/mychart.component';
import { NgChartsModule } from 'ng2-charts';
import { TravelComponent } from './modules/Travel Assurance/travel/travel.component';
import { TravelTabComponent } from './modules/Travel Assurance/travel-tab/travel-tab.component';
import { LineChartComponent } from './modules/Mes Charts/line-chart/line-chart.component';
import { TravelUpdateComponent } from './modules/Travel Assurance/travel-update/travel-update.component';
import { SanteComponent } from './modules/SanteAssurance/sante/sante.component';
import { RapportObligComponent } from './modules/Mes Rapports/rapport-oblig/rapport-oblig.component';
import { TroismeTabComponent } from './modules/Trosime Assurance/troisme-tab/troisme-tab.component';
import { SanteTabComponent } from './modules/SanteAssurance/sante-tab/sante-tab.component';
import { TroismeComponent } from './modules/Trosime Assurance/troisme/troisme.component';
import { AddUserComponent } from './modules/User Crud/add-user/add-user.component';
import { UserTabComponent } from './modules/User Crud/user-tab/user-tab.component';
import { UpdateUserComponent } from './modules/User Crud/update-user/update-user.component';
import { UpdateSanteComponent } from './modules/SanteAssurance/update-sante/update-sante.component';
import { BureauTabComponent } from './modules/Bureau Crud/bureau-tab/bureau-tab.component';
import { BureauComponent } from './modules/Bureau Crud/bureau/bureau.component';
import { UpdateBureauComponent } from './modules/Bureau Crud/update-bureau/update-bureau.component';
import { UpdateTroismeComponent } from './modules/Trosime Assurance/update-troisme/update-troisme.component';
import { RapportTroismeComponent } from './modules/Mes Rapports/rapport-troisme/rapport-troisme.component';
import { RapportSanteComponent } from './modules/Mes Rapports/rapport-sante/rapport-sante.component';
import { RapportTravelComponent } from './modules/Mes Rapports/rapport-travel/rapport-travel.component';
import { RapportTousComponent } from './modules/Mes Rapports/rapport-tous/rapport-tous.component';
import { DemandePaymentComponent } from './modules/credi/demande-payment/demande-payment.component';
import { PaymentComponent } from './modules/credi/payment/payment.component';
import { PaymentTabComponent } from './modules/credi/payment-tab/payment-tab.component';
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import { AddAssuranceSantePersonneComponent } from './modules/SanteAssurance/sante/add-assurance-sante-personne/add-assurance-sante-personne.component';
import { AddAssuranceSanteGroupeComponent } from './modules/SanteAssurance/sante/add-assurance-sante-groupe/add-assurance-sante-groupe.component';
import {LoginIctComponent} from './modules/login-ict/login-ict.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingButtonComponent} from "./public/components";
import {MatGridListModule} from "@angular/material/grid-list";
import {ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {
  UpdateAssuranceSanteGroupeComponent
} from "./modules/SanteAssurance/update-sante/update-assurance-sante-groupe/update-assurance-sante-groupe.component";
import {
  UpdateAssuranceSantePersonneComponent
} from "./modules/SanteAssurance/update-sante/update-assurance-sante-personne/update-assurance-sante-personne.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SideNavbarComponent} from "./public/components/side-navbar/side-navbar.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDividerModule} from "@angular/material/divider";
import {BodyComponentComponent} from "./modules/body-component/body-component.component";
import {TableComponent} from "./public/components/table/table.component";
import {FormComponent} from "./public/components/form/form.component";
import {MatCardModule} from "@angular/material/card";
import {DialogComponent} from "./public/components/dialog/dialog.component";
import { NgIconsModule } from '@ng-icons/core';
import {heroArrowLeft} from "@ng-icons/heroicons/outline";
import {circumAirportSign1} from "@ng-icons/circum-icons";
import {MyErrorStateMatcher} from "./core/validators/my-error-state-matcher";
import {LoginComponent} from "./public/components/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginAmanaComponent,
    ObligComponent,
    TableobligComponent,
    dashbordComponent,
    ObligUpdateComponent,
    PdfObligComponent,
    MychartComponent,
    TravelComponent,
    TravelTabComponent,
    LineChartComponent,
    TravelUpdateComponent,
    SanteComponent,
    RapportObligComponent,
    TroismeTabComponent,
    SanteTabComponent,
    TroismeComponent,
    AddUserComponent,
    UserTabComponent,
    UpdateUserComponent,
    UpdateSanteComponent,
    BureauTabComponent,
    BureauComponent,
    UpdateBureauComponent,
    UpdateTroismeComponent,
    RapportTroismeComponent,
    RapportSanteComponent,
    RapportTravelComponent,
    RapportTousComponent,
    DemandePaymentComponent,
    PaymentComponent,
    PaymentTabComponent,
    AddAssuranceSantePersonneComponent,
    AddAssuranceSanteGroupeComponent,
    LoginIctComponent,
    UpdateAssuranceSanteGroupeComponent,
    UpdateAssuranceSantePersonneComponent,
    BodyComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LoadingButtonComponent,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    SideNavbarComponent,
    TableComponent,
    FormComponent,
    DialogComponent,
    LoginComponent,

  ],
  providers: [
    TableComponent,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    {
      provide:MyErrorStateMatcher,
      useClass:ShowOnDirtyErrorStateMatcher
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
