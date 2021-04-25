import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goFill() {
    this.router.navigateByUrl('/form-view/fill');
  }

  goTable() {
    this.router.navigateByUrl('/form-view/table');
  }
}
