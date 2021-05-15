import { Component, OnInit } from '@angular/core';
import { AdmobService } from '../@core/services/admob.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.page.html',
  styleUrls: ['./form-view.page.scss'],
})
export class FormViewPage implements OnInit {

  constructor(private ad: AdmobService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ad.hideBanner();
  }

  ionViewWillLeave() {
    this.ad.resumeBanner();
  }
}
