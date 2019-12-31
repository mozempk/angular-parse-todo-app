import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';

import { RouterModule } from '@angular/router';
import { NavItemsService } from './services/nav-items.service';
import { IAuthService } from '../auth/services/auth.service';
import { AuthService } from '../auth/services/impl/auth.impl.service';
import { NotificationService } from './services/notification.service'
@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService
    },
    NavItemsService,
    NotificationService
  ],
  exports: [NavBarComponent, FooterComponent]
})
export class CoreModule { }
