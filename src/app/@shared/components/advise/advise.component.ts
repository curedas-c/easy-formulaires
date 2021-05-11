import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-advise',
  templateUrl: './advise.component.html',
  styleUrls: ['./advise.component.scss'],
})
export class AdviseComponent implements OnInit {

  @Input() iconType: string;
  @Input() shouldCenter: boolean;
  constructor() { }

  ngOnInit() {}

}
