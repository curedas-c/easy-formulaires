import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-show',
  templateUrl: './form-show.component.html',
  styleUrls: ['./form-show.component.scss'],
})
export class FormShowComponent implements OnInit {
  formName = 'Example';
  formLogo: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  goTable() {
    this.router.navigateByUrl('/form-view/table');
  }
}
