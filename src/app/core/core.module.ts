import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';

import { RouterModule } from '@angular/router'
import { UserApiService } from '../auth/interfaces/user-api.service';
import { AuthService } from '../auth/services/auth.service';
import { NavItemsService } from './services/nav-items.service';

@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      provide: UserApiService,
      useClass: AuthService
    },
    NavItemsService
  ],
  exports: [NavBarComponent, FooterComponent]
})
export class CoreModule { }
