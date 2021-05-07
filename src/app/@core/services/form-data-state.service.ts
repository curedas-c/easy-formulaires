import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormDataModel } from 'src/app/@shared/models/formData.model';
import { StateService } from './state.service';
import { StorageService } from './storage.service';

interface FormDataState {
  currentFormData: FormDataModel;
}

const initialState: FormDataState = {
  currentFormData: undefined
};


@Injectable({
  providedIn: 'root'
})
export class FormDataStateService extends StateService<FormDataState> {
  currentFormData$: Observable<FormDataModel> = this.select((state) => state.currentFormData);

  constructor(private storage: StorageService) {
    super(initialState);
  }

  addFormData(formID: string, newFormData: FormDataModel) {
    // save to local storage
    this.storage.setKeyValue(formID, this.state.currentFormData);
  }

  getFormData(formID: string) {
    this.storage.getKeyValue(formID).then((formData: FormDataModel) => {
      if (formData) {
        this.setState({ currentFormData: formData });
      }
      else {
        this.setState({ currentFormData: {formID, formData: []} });
      }
    });
  }
}
