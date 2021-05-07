import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormStateService } from '../@core/services/form-state.service';
import { FormModel } from '../@shared/models/form.model';
import { FormDataStateService } from '../@core/services/form-data-state.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  formList$: Observable<FormModel[]> = this.formState.formList$;

  constructor(private router: Router, private formState: FormStateService, private formDataState: FormDataStateService) { }

  ngOnInit() {
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
}
