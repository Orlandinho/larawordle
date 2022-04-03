import Tile from "./Tile";

export default {
    theWord: 'jesus',
    guessesAllowed: 3,
    currentRowIndex: 0,
    state: 'active',
    message: '',

    init() {
        this.board = Array.from({length: this.guessesAllowed}, () => {
            return Array.from({length: this.theWord.length}, () => new Tile);
        });
    },

    onKeyPress(key) {
        if (/^[A-z]$/.test(key)) {
            this.fillTile(key);
            this.message = '';
        } else if (key === 'Enter') {
            this.submitGuess();
        }
    },

    fillTile(key) {
        for (let tile of this.currentRow) {
            if (!tile.letter) {
                tile.letter = key;

                break;
            }
        }
    },

    get currentRow() {
        return this.board[this.currentRowIndex];
    },

    get currentGuess() {
       return this.currentRow.map(tile => tile.letter).join('');
    },

    submitGuess() {
        let guess = this.currentGuess;
        if(this.currentGuess.length < this.theWord.length) {
            return;
        }

        this.refreshCurrentStatusForCurrentRow();

        if (guess === this.theWord) {
            this.message = 'You win!';
        } else if (this.guessesAllowed === this.currentRowIndex + 1) {
            this.message = 'Game over';
            this.state = 'complete';
        } else {
            this.message = 'One less try';
            this.currentRowIndex++;
        }
    },

    refreshCurrentStatusForCurrentRow() {
        this.currentRow.forEach((tile, index) => {

            tile.status = this.theWord.includes(tile.letter) ? 'present' : 'absent';

            if (this.currentGuess[index] === this.theWord[index]) {
                tile.status = 'correct';
            }
        });
    }
}
