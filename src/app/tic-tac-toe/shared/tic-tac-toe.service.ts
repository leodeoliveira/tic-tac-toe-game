import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  private readonly SIZE_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private table: any;
  private numMoviments: number;
  private hasWinner: any;

  private _player: number;
  private _showStart: boolean;
  private _showTable: boolean;
  private _showEnd: boolean;

  constructor() { }

  init(): void {
    this._showStart = true;
    this._showTable = false;
    this._showEnd = false;
    this.numMoviments = 0;
    this._player = this.X;
    this.hasWinner = false;
    this.initTable();
  }

  initTable(): void {
    this.table = [this.SIZE_TAB];
    for (let i = 0; i < this.SIZE_TAB; i++) {
      this.table[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  get showStart(): boolean {
    return this._showStart;
  }


  get showTable(): boolean {
    return this._showTable;
  }

  get showEnd(): boolean {
    return this._showEnd;
  }

  get player(): number {
    return this._player;
  }

  initGame(): void {
    this._showStart = false;
    this._showEnd = false;
    this._showTable= true;
  }

  play(posX: number, posY: number): void {
    if (this.table[posX][posY] !== this.EMPTY || 
      this.hasWinner) {
      return;
    }

    this.table[posX][posY] = this._player;
    this.numMoviments++;
    this.hasWinner = this.endGame(posX, posY, 
      this.table, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;

    if (!this.hasWinner && this.numMoviments < 9) {
      this.cpuPlay();
    }

    if (this.hasWinner !== false) {
      this._showEnd = true;
    }

    if (!this.hasWinner && this.numMoviments === 9) {
      this._player = 0;
      this._showEnd = true;
    }
  }

  endGame(line: number, col: number, 
      table: any, player: number) {
    let end: any = false;

    if (table[line][0] === player && 
      table[line][1] === player && 
      table[line][2] === player) {
      end = [[line, 0], [line, 1], [line, 2]];
    }

    if (table[0][col] === player && 
      table[1][col] === player && 
      table[2][col] === player) {
      end = [[0, col], [1, col], [2, col]];
    }

    if (table[0][0] === player && 
      table[1][1] === player && 
      table[2][2] === player) {
      end = [[0, 0], [1, 1], [2, 2]];
    }

    if (table[0][2] === player && 
      table[1][1] === player && 
      table[2][0] === player) {
      end = [[0, 2], [1, 1], [2, 0]];
    }

    return end;
  }

  cpuPlay(): void {
    let move: number[] = this.getMove(this.O);

    if (move.length <= 0) {
      move = this.getMove(this.X);
    }

    if (move.length <= 0) {
      let moves: any = [];
      for (let i=0; i<this.SIZE_TAB; i++) {
        for (let j=0; j<this.SIZE_TAB; j++) {
          if (this.table[i][j] === this.EMPTY) {
            moves.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (moves.length - 1)));
      move = [moves[k][0], moves[k][1]];
    }

    this.table[move[0]][move[1]] = this._player;
    this.numMoviments++;
    this.hasWinner = this.endGame(move[0], move[1],
        this.table, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }

  getMove(player: number): number[] {
    let tab = this.table;
    for (let lin = 0; lin < this.SIZE_TAB; lin++) {
      for (let col = 0; col < this.SIZE_TAB; col++) {
        if (tab[lin][col] !== this.EMPTY) {
          continue;
        }
        tab[lin][col] = player;
        if (this.endGame(lin, col, tab, player)) {
          return [lin, col];
        }
        tab[lin][col] = this.EMPTY;
      }
    }
    return [];
  }

  showX(posX: number, posY: number): boolean {
    return this.table[posX][posY] === this.X;
  }

  showO(posX: number, posY: number): boolean {
    return this.table[posX][posY] === this.O;
  }

  showWinner(posX: number, posY: number): boolean {
    let shoWinner: boolean = false;

    if (!this.hasWinner) {
      return shoWinner;
    }

    for (let pos of this.hasWinner) {
      if (pos[0] === posX && pos[1] === posY) {
        shoWinner = true;
        break;
      }
    }

    return shoWinner;
  }

  newGame(): void {
    this.init();
    this._showEnd = false;
    this._showStart = false;
    this._showTable = true;
  }

}
