export class FormDataModel {
  formID: string;
  formData: any[];

  constructor(options: { formID: string; formData?: any[] }) {
    this.formID = options.formID;
    this.formData = options.formData;
  }
}
