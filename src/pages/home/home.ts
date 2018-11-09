import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: Product[] = [];
  loading = false;

  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) {}

  scan() {
    this.barcodeScanner.scan().then(data => {
      data.text && this.getPrices(data);
    });
  }

  getPrices(data: any) {
    this.log(data);
    this.data = [];
    this.loading = true;
    this.productService.getPrices(data.text)
      .subscribe((res) => {
        this.loading = false;
        this.log(res);
        this.data = res;
        this.cd.markForCheck();
      }, (err) => console.log(err));
  }

  log(data){
    console.log(JSON.stringify(data));
  }

}
