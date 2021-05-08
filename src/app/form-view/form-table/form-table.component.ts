import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormDataStateService } from 'src/app/@core/services/form-data-state.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormStateService } from 'src/app/@core/services/form-state.service';
import { FileService } from 'src/app/@core/services/file.service';
import { FileExtension } from 'src/app/@shared/models/fileExtension.model';
import { ToastService } from 'src/app/@core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss'],
})
export class FormTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  dataSource = new MatTableDataSource([]);
  propertyList;
  formName = '';
  fileType: FileExtension = 'CSV';
  private unsubscribe$ = new Subject();

  constructor(
    private formDataState: FormDataStateService,
    private formState: FormStateService,
    private cdr: ChangeDetectorRef,
    private fileService: FileService,
    private toast: ToastService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getFormName();
    this.getFormData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getFormName() {
    this.formState.currentForm$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((currentForm) => {
        if (currentForm) {
          this.formName = currentForm.formName;
        }
      });
  }

  getFormData() {
    this.formDataState.currentFormData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data) {
          this.dataSource = new MatTableDataSource(data.formData);
          if (data.formData.length > 0) {
            this.propertyList = Object.keys(data.formData[0]);
            this.cdr.detectChanges();
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }
        }
      });
  }

  saveFile() {
    const options = {
      fileName: this.formName,
      data: this.dataSource.data,
      type: this.fileType
    };

    this.fileService.saveOnStorage(options).then(isFileSaved => {
      if (isFileSaved) {
        this.toast.presentToast(
          this.translate.instant('TOAST.FILE_SAVED'),
          'primary'
        );
      }
      else {
        this.toast.presentToast(
          this.translate.instant('TOAST.FILE_NOT_SAVED'),
          'danger'
        );
      }
    });
  }

  shareFile() {
    const options = {
      fileName: this.formName,
      data: this.dataSource.data,
      type: this.fileType
    };

    this.fileService.share(options);
  }
}
