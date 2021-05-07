import { InputModel } from "./input.model";

export class FormModel {
  formID: string;
  formName: string;
  formLogo: ArrayBuffer;
  fieldList:  InputModel<string>[];

  constructor(
    options: {
      formID: string;
      formName: string;
      formLogo?: ArrayBuffer;
      fieldList: InputModel<string>[];
    }
  ) {
    this.formID = options.formID;
    this.formName = options.formName;
    this.formLogo = options.formLogo;
    this.fieldList = options.fieldList;
  }
}
