//192.168.1.43:8081

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export interface Product {
  id: string;
  name: string;
  price: string;
  img?: string;
}

export const marketsLogo = {
  'dia': 'https://pbs.twimg.com/profile_images/950351971214675976/FnURv3vT_400x400.jpg',
  'eci': 'https://pbs.twimg.com/profile_images/1053554825290567681/wPE3GSD__400x400.jpg',
  'hipercor': 'https://pbs.twimg.com/profile_images/899886684103376896/y_Je-C3t_400x400.jpg',
  'erosky': 'https://pbs.twimg.com/profile_images/899531306425606144/d_Iw5SBK_400x400.jpg',
  'alcampo': 'https://pbs.twimg.com/profile_images/1053327648066322432/fMF6pVOF_400x400.jpg',
  'tudespensa': 'https://pbs.twimg.com/profile_images/932553434531852288/YzragjZU_400x400.jpg',
  'carrefour': 'https://pbs.twimg.com/profile_images/756103478011920384/TcT7yjGR_400x400.jpg',
};

@Injectable()
export class ProductService {

  url = 'http://192.168.1.43:3000';

  constructor(private http: HttpClient) { }

  getPrices(ean: string): Observable<Product[]> {
    console.log(ean);
    return this.http.get(`${this.url}/product/${ean}`)
      .pipe(map(this.mapResults.bind(this)));
  }

  mapResults(res) {
    return res.result.map((e) => ({
      id: e.id,
      name: e.name,
      price: e.price ? e.price : 'No encontrado',
      imgUrl: marketsLogo[e.id]
    }));
  }
}

