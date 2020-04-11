import { Component, OnInit, Input } from '@angular/core';
import { Toaster, ToasterType } from '../toaster/toaster';

//import { Toaster, ToasterType } from '../_models/index';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  //moduleId: module.id,
  selector: 'alert',
  templateUrl: 'toaster.component.html'
})

export class ToasterComponent {
  @Input() id: string;

  toasters: Toaster[] = [];

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
    this.toasterService.getToaster(this.id).subscribe((toaster: Toaster) => {
      if (!toaster.message) {
        // clear alerts when an empty alert is received
        this.toasters = [];
        return;
      }

      // add alert to array
      this.toasters.push(toaster);
    });
  }

  removeToaster(toaster: Toaster) {
    this.toasters = this.toasters.filter(x => x !== toaster);
  }

  cssClass(toaster: Toaster) {
    if (!toaster) {
      return;
    }

    // return css class based on alert type
    switch (toaster.type) {
      case ToasterType.Success:
        return 'alert alert-success';
      case ToasterType.Error:
        return 'alert alert-danger';
      case ToasterType.Info:
        return 'alert alert-info';
      case ToasterType.Warning:
        return 'alert alert-warning';
    }
  }
}
