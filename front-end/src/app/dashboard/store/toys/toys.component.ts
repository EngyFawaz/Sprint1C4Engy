import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ToysService } from './toys.service'
@Component({
  selector: 'app-toys',
  template: '<ng2-smart-table [settings]="settings" [source]="data" (createConfirm)="onCreateCall($event)" (editConfirm)="onEditCall($event)" (deleteConfirm)="onDeleteCall($event)" ></ng2-smart-table>',
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
    delete:{
      confirmDelete: true,
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
    this.toysService.updateEngy(event.newData._id, event.newData.name, event.newData.price).subscribe();
}

onDeleteCall(event){
 event.confirm.resolve(event.data._id);
 console.log(event.data._id);
 this.toysService.deleteEngy(event.data._id).subscribe();
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

