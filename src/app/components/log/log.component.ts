import { Component, Input, OnInit } from '@angular/core';
import { Col } from 'src/app/interfaces/col';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {

  @Input('encryptedGame') encryptedGame: string;
  @Input('colClick') colClick: [{col:Col,indexRow: number, indexCol: number }];
  constructor() { }

  ngOnInit() {}

}
