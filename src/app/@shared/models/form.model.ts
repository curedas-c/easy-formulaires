import { FormGroup } from "@angular/forms";
import { InputModel } from "./input.model";

export class FormModel {
  formName: string;
  formLogo: ArrayBuffer;
  fieldList:  InputModel<string>[];
  generatedForm: FormGroup;

  constructor(
    options: {
      formName: string;
      formLogo?: ArrayBuffer;
      fieldList: InputModel<string>[];
      generatedForm?: FormGroup;
    }
  ) {
    this.formName = options.formName;
    this.formLogo = options.formLogo;
    this.fieldList = options.fieldList;
    this.generatedForm = options.generatedForm;
  }
}
