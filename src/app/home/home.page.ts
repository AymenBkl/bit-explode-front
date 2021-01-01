import { Component, OnInit } from '@angular/core';
import { Col } from '../interfaces/col';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  col : Col = {color:"green",value:1,clicked:false}
  map : Array<Array<Col>>;
  incrementBy: number = 2;

  constructor() {}
  async ngOnInit() {
    this.map = await Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Object.assign({color:"green",value:1,clicked:false})));
    this.createMine();
    console.log(this.map)
  }

  updateMatrix(){
  }


  createMine(){
    this.map[Math.floor(Math.random() * 6)][Math.floor(Math.random() * 6)] = {color:"red",value:0,clicked:false}
  }

  clickCol(cel: Col){
    if (!cel.clicked){
    cel.clicked = true;
    if (cel.color == 'red'){
      console.log("you lose");
    }
    else {
      cel.value += this.incrementBy;
      this.incrementBy += 2;
    }
  }
  }
 

}
