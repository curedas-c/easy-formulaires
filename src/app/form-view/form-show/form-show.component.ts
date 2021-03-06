import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormStateService } from '../../@core/services/form-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toFormGroup } from '../../@shared/utils/form-construtor';
import { FormGroup } from '@angular/forms';
import { InputModel } from 'src/app/@shared/models/input.model';
import { ToastService } from 'src/app/@core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-form-show',
  templateUrl: './form-show.component.html',
  styleUrls: ['./form-show.component.scss'],
})
export class FormShowComponent implements OnInit, OnDestroy {
  formName;
  formLogo;
  fieldList: InputModel<string>[] = [];
  generatedForm = new FormGroup({});
  haveAlert = false;
  trueText: string;
  falseText: string;
  private unsubscribe$ = new Subject();

  constructor(private router: Router, private formState: FormStateService) {}

  ngOnInit() {
    this.formState.currentForm$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentForm) => {
        this.formName = currentForm.formName;
        this.formLogo = currentForm.formLogo;
        this.fieldList = currentForm.fieldList;
        this.generatedForm = toFormGroup(currentForm.fieldList);
        this.trueText = currentForm.trueText;
        this.falseText = currentForm.falseText;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goTable() {
    this.router.navigateByUrl('/form-view/table');
  }
}
