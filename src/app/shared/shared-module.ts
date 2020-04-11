import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ToasterComponent } from '.././shared/toaster/toaster.component';
import { ToasterService } from '.././shared/toaster/toaster.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ToasterComponent],
  providers:[ToasterService],
  exports: [ToasterComponent]
})

export class SharedModule {}
