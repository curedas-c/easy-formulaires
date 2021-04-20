import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.page.html',
  styleUrls: ['./form-create.page.scss'],
})
export class FormCreatePage implements OnInit {
  formName = '';
  formLogo: any;
  formLogoName: string;

  constructor() {}

  ngOnInit() {}

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
}
