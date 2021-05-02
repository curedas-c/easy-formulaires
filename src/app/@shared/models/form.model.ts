import { InputModel } from "./input.model";

export class FormModel {
  formName: string;
  formLogo: ArrayBuffer;
  fieldList:  InputModel<string>[];

  constructor(
    options: {
      formName: string;
      formLogo?: ArrayBuffer;
      fieldList: InputModel<string>[];
    }
  ) {
    this.formName = options.formName;
    this.formLogo = options.formLogo;
    this.fieldList = options.fieldList;
  }
}
