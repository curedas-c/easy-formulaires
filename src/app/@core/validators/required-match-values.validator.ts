import {
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

export const requiredMatchValuesValidator = (
  field: string,
  fieldToWatch: string,
  matchValues: any[]
): ValidatorFn => (control: AbstractControl) => {
  const fieldToCheck = control.get(field);
  const fieldNotEmpty = control.get(fieldToWatch);
  if (matchValues.includes(fieldToCheck.value) && fieldNotEmpty.value === '') {
    return { requiredMatchValues: { valid: false } };
  }
  return null;
};
