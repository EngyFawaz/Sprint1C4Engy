import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ToysService {

  constructor(private httpClient: HttpClient) { }

  createEngy(name:string, price:number, sellername: String) {
    return this.httpClient.post(environment.apiUrl + 'Engy/createEngy', {'name':name, 'price':price , 'sellername':sellername});
  }

  getEngy(){
    return this.httpClient.get(environment.apiUrl + 'Engy/getEngy');
  }

  updateEngy(name:string, price:number) {
    return this.httpClient.patch(environment.apiUrl + 'Engy/updateEngy/:EngyId', {'name':name,'price':price});
  }

}
