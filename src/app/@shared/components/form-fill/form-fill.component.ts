import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormDataStateService } from 'src/app/@core/services/form-data-state.service';
import { InputModel } from '../../models/input.model';
import { FormDataModel } from '../../models/formData.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from '../../../@core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-fill',
  templateUrl: './form-fill.component.html',
  styleUrls: ['./form-fill.component.scss'],
})
export class FormFillComponent implements OnInit, OnDestroy {
  @Input() formName = '';
  @Input() trueText = '';
  @Input() falseText = '';
  @Input() formLogo: ArrayBuffer;
  @Input() fieldList: InputModel<string>[] = [];
  @Input() isOverview = false;
  @Input() generatedForm: FormGroup = new FormGroup({});
  currentFormData: FormDataModel;
  private unsubscribe$ = new Subject();

  constructor(private formDataState: FormDataStateService, private toast: ToastService, private translate: TranslateService) {}

  ngOnInit() {
    this.formDataState.currentFormData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data) {
          this.currentFormData = data;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitEntry() {
    if (this.isOverview) {
      return;
    }
    this.currentFormData.formData.push(this.generatedForm.value);
    this.formDataState.addFormData(this.currentFormData.formID, this.generatedForm.value);
    this.generatedForm.reset();
    this.toast.presentToast(this.translate.instant('TOAST.ENTRY_SAVED'), 'primary');
  }

  // Getters
  get haveFields() {
    return this.fieldList.length >= 1;
  }
}
