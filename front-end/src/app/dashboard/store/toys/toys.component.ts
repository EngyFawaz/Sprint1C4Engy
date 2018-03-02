import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToysService } from './toys.service'
@Component({
  selector: 'app-toys',
  template: '<ng2-smart-table [settings]="settings" [source]="data" (createConfirm)="onCreateCall($event)" (editConfirm)="onEditCall($event)" ></ng2-smart-table>',
  providers: [ToysService]
})
export class ToysComponent implements OnInit {
  settings = {
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      name: {
        title: 'Product Name'
      },
      price: {
        title: 'Price'
      },
      createdAt: {
        title: 'Created At'
      },
      updatedAt:{
        title: 'Updated At'
      },
      component:{
        title: 'Store'
      },
      seller:{
        title: 'Seller Name'
      }
    }
  };

  data = [];
  constructor(private toysService:ToysService){

  }
  onCreateCall(event){
       event.confirm.resolve(event.newData);
       this.toysService.createEngy(event.newData.name, event.newData.price,event.newData.component,event.newData.seller).subscribe();
  }
  onEditCall(event){
       event.confirm.resolve(event.newData);
       this.toysService.updateEngy(event.newData.name, event.newData.price).subscribe();
  }
  ngOnInit() {
    this.toysService.getEngy().subscribe(
      (res: any) => {
       // console.log(res.data)
       if(res.hasOwnProperty('data')){
        this.data = res.data;}
      }
    );
   }

}

