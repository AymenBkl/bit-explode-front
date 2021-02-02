import { Component, Input, OnInit } from '@angular/core';
import { Col } from 'src/app/interfaces/col';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {

  @Input('game') game: Game;
  @Input('colClick') colClick: [{col:Col,indexRow: number, indexCol: number }];
  constructor() { }

  ngOnInit() {
    console.log(this.game);
  }

}
