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
  @Input() fieldList: InputModel<string>[] = [];
  @Input() isOverview = false;
  @Input() generatedForm: FormGroup = new FormGroup({});

  constructor() {}

  ngOnInit() {}

  submitEntry() {
    if (this.isOverview) {
      return;
    }
  }

  // Getters
  get haveFields() {
    return this.fieldList.length >= 1;
  }
}
