import { InputModel } from './input.model';

export class FormModel {
  formID: string;
  formName: string;
  formLogo: ArrayBuffer;
  fieldList: InputModel<string>[];
  trueText: string;
  falseText: string;

  constructor(options: {
    formID: string;
    formName: string;
    formLogo?: ArrayBuffer;
    fieldList: InputModel<string>[];
    trueText: string;
    falseText: string;
  }) {
    this.formID = options.formID;
    this.formName = options.formName;
    this.formLogo = options.formLogo;
    this.fieldList = options.fieldList;
    this.trueText = options.trueText || 'Yes';
    this.falseText = options.falseText || 'No';
  }
}
