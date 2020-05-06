import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from './shared';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  constructor(private service: TicTacToeService) { }

  ngOnInit(): void {
  	this.service.init();
  }

  get startGame(): boolean {
  	return this.service.showStart;
  }

  get showTable(): boolean {
  	return this.service.showTable;
  }

  get endGame(): boolean {
  	return this.service.showEnd;
  }

  initGame(): void{
    this.service.initGame();
  }

  play(posX: number, posY: number): void {
  	this.service.play(posX, posY);
  }

  showX(posX: number, posY: number): boolean {
  	return this.service.showX(posX, posY);
  }

  showO(posX: number, posY: number): boolean {
  	return this.service.showO(posX, posY);
  }

  showWinner(posX: number, posY: number): boolean {
  	return this.service.showWinner(posX, posY);
  }

  get player(): number {
  	return this.service.player;
  }

  newGame(): void {
  	this.service.newGame();
  }

}
