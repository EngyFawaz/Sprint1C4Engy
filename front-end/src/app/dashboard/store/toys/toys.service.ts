import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ToysService {

  constructor(private httpClient: HttpClient) { }

  createEngy(name:string, price:number, component:String , seller: String) {
    return this.httpClient.post(environment.apiUrl + 'Engy/createEngy', {'name':name, 'price':price ,'component': component, 'seller':seller});
  }

  getEngy(){
    return this.httpClient.get(environment.apiUrl + 'Engy/getEngy');
  }

  updateEngy(id:object, name:string, price:number) {
    return this.httpClient.patch(environment.apiUrl + 'Engy/updateEngy/'+id,{'name':name, 'price':price});
  }

  deleteEngy(id:object){
    return this.httpClient.delete(environment.apiUrl+ 'Engy/deleteEngy/'+id);
  }

}
