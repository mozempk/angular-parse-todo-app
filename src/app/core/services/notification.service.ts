import { Injectable } from '@angular/core';
import { IAuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ITodoService } from 'src/app/todos/services/todo.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  private toastServiceOptions:any = {
    closeButton: true,
    timeOut: 3000,
    progressBar: true,
    progressAnimation: 'decreasing',
    easing: 'ease-in',
    easeTime: 300,
    positionClass: 'toast-bottom-right'
  }
  constructor(private authService: IAuthService, private todoService: ITodoService, private toastService: ToastrService) {
    
    this.authService.getNotificationMessage().subscribe(m => {
      if (m !== undefined) {
        this.displayToast(m)
        this.authService.setNotificationMessage()
      }
    });

    this.todoService.getNotificationMessage().subscribe(m => {
      if (m !== undefined) {
        this.displayToast(m)
        this.todoService.setNotificationMessage()
      }
    })

  }

  displayToast(m:any) {
    switch (m.type){
      
      case 'success':
        this.toastService.success(m.message,'Success', this.toastServiceOptions)
        break;
      
      case 'info':
        this.toastService.info(m.message,'Info', this.toastServiceOptions)
        break;

      case 'error':
        this.toastService.error(m.message,'Error', this.toastServiceOptions)
        break;

      case 'warning':
        this.toastService.warning(m.message,"Warning", this.toastServiceOptions)
        break;
    }

  }
}
