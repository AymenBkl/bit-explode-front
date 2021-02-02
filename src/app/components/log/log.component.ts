import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('container') private container: ElementRef;
  constructor() { }

  ngOnInit() {
    this.scrollToBottom();        

  }

  ngAfterViewChecked() {
    console.log("here");        
    this.scrollToBottom();        
} 

  scrollToBottom(): void {
    try {
        this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
