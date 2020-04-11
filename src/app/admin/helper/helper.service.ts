import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ToasterService } from './../../shared/toaster/toaster.service';
import { Toaster, ToasterType } from './../../shared/toaster/toaster';

@Injectable()
export class HelperService {
  constructor(private http: Http, private toasterService: ToasterService) {

  }



  success(message: string, id:string) {
    this.toasterService.toaster(new Toaster({
      message,
      type: ToasterType.Success,
      toasterId: id
    }));
  }

  error(message: string,id:string) {
    this.toasterService.toaster(new Toaster({
      message,
      type: ToasterType.Error,
      toasterId: id
    }));
  }

  info(message: string,id:string) {
    this.toasterService.toaster(new Toaster({
      message,
      type: ToasterType.Info,
      toasterId: id
    }));
  }

  warn(message: string,id:string) {
    this.toasterService.toaster(new Toaster({
      message,
      type: ToasterType.Warning,
      toasterId: id
    }));
  }

  clear(id:string) {
    this.toasterService.clear(id);
  }
}


