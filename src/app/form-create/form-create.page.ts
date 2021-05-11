import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { InputModel } from '../@shared/models/input.model';
import { requiredMatchValuesValidator } from '../@core/validators/required-match-values.validator';
import { FormModel } from '../@shared/models/form.model';
import { FormStateService } from '../@core/services/form-state.service';
import { toFormGroup } from 'src/app/@shared/utils/form-construtor';
import { Router } from '@angular/router';
import { ToastService } from '../@core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';

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
  haveAlert = false;

  constructor(
    private fb: FormBuilder,
    private formState: FormStateService,
    private router: Router,
    private toast: ToastService,
    private translate: TranslateService,
    private location: Location
  ) {
    App.addListener('backButton', async () => {
      if (this.location.isCurrentPathEqualTo('/form-create')) {
        this.toast
        .presentAlert(this.translate.instant('TOAST.CONFIRM_MESSAGE'))
        .then((button) => {
          if (button.role !== 'cancel') {
            this.location.back();
          }
        });
      }
    });
  }

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
      this.toast.presentToast(
        this.translate.instant('TOAST.FIELD_EXIST'),
        'danger'
      );
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
      this.toast.presentToast(
        this.translate.instant('TOAST.FORM_NEED_NAME'),
        'danger'
      );
      return;
    }
    if (this.fieldList.length <= 0) {
      this.toast.presentToast(
        this.translate.instant('TOAST.FORM_NEED_FIELD'),
        'danger'
      );
      return;
    }

    const NEWFORM = new FormModel({
      formID: `${this.formName.replace('/s/g', '')}${Date.now()}`,
      formName: this.formName,
      formLogo: this.formLogo,
      fieldList: this.fieldList,
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

  get isFieldTrueFalse() {
    return this.fieldForm.controls.controlType.value === 'checkbox';
  }
}
