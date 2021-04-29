import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputModel } from '../../models/input.model';

@Component({
  selector: 'app-form-fill',
  templateUrl: './form-fill.component.html',
  styleUrls: ['./form-fill.component.scss'],
})
export class FormFillComponent implements OnInit {
  @Input() formName = '';
  @Input() formLogo: ArrayBuffer;
  @Input() form: FormGroup;
  @Input() fieldList: InputModel<string>[] = [];

  constructor() {}

  ngOnInit() {
  }

  // Getters
  haveFields() {
    return this.fieldList.length >= 1;
  }
}
