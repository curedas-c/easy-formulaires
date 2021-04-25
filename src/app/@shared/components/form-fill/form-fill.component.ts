import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-fill',
  templateUrl: './form-fill.component.html',
  styleUrls: ['./form-fill.component.scss'],
})
export class FormFillComponent implements OnInit {
  @Input() formName = '';
  @Input() formLogo: any;

  constructor() {}

  ngOnInit() {}
}
