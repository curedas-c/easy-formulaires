import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormModel } from '../../@shared/models/form.model';
import { StateService } from './state.service';
import { StorageService } from './storage.service';

interface FormState {
  forms: FormModel[];
  currentForm: FormModel;
}

const initialState: FormState = {
  forms: [],
  currentForm: undefined
};


@Injectable({
  providedIn: 'root'
})
export class FormStateService extends StateService<FormState> {

  formList$: Observable<FormModel[]> = this.select((state) => state.forms.slice().reverse());
  currentForm$: Observable<FormModel> = this.select((state) => state.currentForm);

  constructor(private storage: StorageService) {
    super(initialState);
  }

  addForm(newForm: FormModel) {
    this.setState({
      forms: [...this.state.forms, newForm]
    });
    // save to local storage
    this.storage.setKeyValue('formList', [...this.state.forms]);
  }

  setCurrentForm(form: FormModel) {
    this.setState({ currentForm: form });
  }

  initState() {
    this.storage.getKeyValue('formList').then((list: any []) => {
      if (list && list.length > 0) {
        this.setState({
          forms: [...this.state.forms, ...list]
        });
      }
    });
  }

  clearState() {
    this.setState(initialState);
    this.storage.setKeyValue('formList', []);
  }
}
