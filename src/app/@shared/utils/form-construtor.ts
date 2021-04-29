import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputModel } from '../models/input.model';

export const toFormGroup = (fields: InputModel<string>[]) => {
  const group: any = {};

  fields.forEach((field) => {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.controlType === 'email') {
      validators.push(Validators.email);
    }

    group[field.label] = validators.length > 0
      ? new FormControl(field.value || '', validators)
      : new FormControl(field.value || '');
  });
  return new FormGroup(group);
};
