import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormStateService } from '../@core/services/form-state.service';
import { FormModel } from '../@shared/models/form.model';
import { FormDataStateService } from '../@core/services/form-data-state.service';
import { ComponentInjectorService } from '../@core/services/component-injector.service';
import { takeUntil } from 'rxjs/operators';
import { PushNotificationService } from '../@core/services/push-notification.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit, OnDestroy {
  formList$: Observable<FormModel[]> = this.formState.formList$;
  private unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private formState: FormStateService,
    private formDataState: FormDataStateService,
    private ci: ComponentInjectorService,
    private pushNotification: PushNotificationService
  ) {}

  ngOnInit() {
    this.formList$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(list => {
        if (list.length < 1) {
          this.ci.showAdvise('#advise-container', 'list-empty');
        }
        else {
          if (this.ci.adviseCompRef) {
            this.ci.hideAdvise();
          }
        }
      });
    this.pushNotification.init();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  goFill(currentForm: FormModel) {
    this.setCurrentForm(currentForm);
    this.router.navigateByUrl('/form-view/fill');
  }

  goTable(currentForm: FormModel) {
    this.setCurrentForm(currentForm);
    this.router.navigateByUrl('/form-view/table');
  }

  setCurrentForm(currentForm: FormModel) {
    this.formState.setCurrentForm(currentForm);
    this.formDataState.getFormData(currentForm.formID);
  }

  deleteForm(form: FormModel) {
    this.formState.deleteForm(form);
  }
}
