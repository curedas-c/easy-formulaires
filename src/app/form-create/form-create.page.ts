import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { InputModel } from '../@shared/models/input.model';
import { requiredMatchValuesValidator } from '../@core/validators/required-match-values.validator';
import { FormModel } from '../@shared/models/form.model';
import { FormStateService } from '../@core/services/form-state.service';
import { toFormGroup } from 'src/app/@shared/utils/form-construtor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.page.html',
  styleUrls: ['./form-create.page.scss'],
})
export class FormCreatePage implements OnInit {
  @ViewChild('slider') slide: IonSlides;
  formName = '';
  formLogo: any;
  formLogoName: string;

  fieldList: InputModel<string>[] = [];
  fieldForm: FormGroup;
  generatedForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private formState: FormStateService, private router: Router) {}

  ngOnInit() {
    this.initFieldForm();
  }

  // Events
  onNextButtonClicked() {
    this.slide.slideNext(500);
  }

  onFileChange($ev) {
    if ($ev.length === 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL($ev.target.files[0]);
    reader.onload = (_event) => {
      this.formLogo = reader.result;
      this.formLogoName = $ev.target.files[0].name;
    };
  }

  // Form
  initFieldForm() {
    this.fieldForm = this.fb.group(
      {
        value: [''],
        key: [''],
        label: ['', Validators.required], // yeah
        required: [false], //yeah
        order: [1],
        controlType: ['text', Validators.required], //yeah
        type: ['text'],
        options: [''], //yeah
      },
      {
        validator: requiredMatchValuesValidator('controlType', 'options', [
          'select',
          'multiselect',
        ]),
      }
    );
  }

  removeField(field: InputModel<string>) {
    this.fieldList = this.fieldList.filter((item) => item !== field);
    this.generateForm();
  }

  generateFields() {
    // create array of select values
    const optionFieldValue = this.fieldForm.controls.options.value;
    if (optionFieldValue !== '') {
      this.fieldForm.controls.options.patchValue(
        Array.from(optionFieldValue.split(','))
      );
    }

    // verify if fields doesn't exist
    const fieldToVerify = new InputModel(
      this.fieldForm.value
    ) as InputModel<string>;

    let isFieldExist = false;
    this.fieldList.forEach((field) => {
      if (field.label.toLowerCase() === fieldToVerify.label.toLowerCase()) {
        isFieldExist = true;
      }
    });

    if (isFieldExist) {
      // TODO: use popup service
      console.log('this field already exist');
      return;
    }

    this.fieldList.push(fieldToVerify);
    this.generateForm();
    this.resetForm();
  }

  generateForm() {
    this.generatedForm = toFormGroup(this.fieldList);
  }

  resetForm() {
    this.initFieldForm();
  }

  saveForm() {
    if (this.formName === '') {
      // TODO: use popup service
      console.log('form needs a name');
      return;
    }
    if (this.fieldList.length <= 0) {
      // TODO: use popup service
      console.log('form needs at least one field');
      return;
    }

    const NEWFORM = new FormModel({
      formName: this.formName,
      formLogo: this.formLogo,
      fieldList: this.fieldList
    });

    this.formState.addForm(NEWFORM);
    this.router.navigate(['/form-list']);
  }

  // Getters
  get haveMultipleValues() {
    return ['select', 'multiselect'].includes(
      this.fieldForm.controls.controlType.value
    );
  }

  get haveFields() {
    return this.fieldList.length >= 1;
  }

  get haveFieldOrInfo() {
    return this.formName !== '' || this.fieldList.length >= 1;
  }
}
