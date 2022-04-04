import Tile from "./Tile";

export default {
    theWord: 'davi',
    guessesAllowed: 3,
    currentRowIndex: 0,
    state: 'active',
    message: '',

    get currentRow() {
        return this.board[this.currentRowIndex];
    },

    get currentGuess() {
        return this.currentRow.map(tile => tile.letter).join('');
    },

    get remainingGuesses() {
        return this.guessesAllowed - (this.currentRowIndex + 1)
    },

    init() {
        this.board = Array.from({length: this.guessesAllowed}, () => {
            return Array.from({length: this.theWord.length}, () => new Tile);
        });
    },

    onKeyPress(key) {
        if (/^[A-z]$/.test(key)) {
            this.fillTile(key);
            this.message = '';
        } else if (key === 'Backspace') {
            this.emptyTile();
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

    emptyTile() {
        for (let tile of [...this.currentRow].reverse()) {
            if (tile.letter) {
                tile.empty();

                break;
            }
        }
    },

    submitGuess() {
        if(this.currentGuess.length < this.theWord.length) {
            return;
        }

        for (let tile of this.currentRow) {
            tile.updateTile(this.theWord, this.currentGuess)
        }

        if (this.currentGuess === this.theWord) {
            this.state = 'complete';
            return this.message = 'You win!';
        }

        if (this.remainingGuesses === 0) {
            this.state = 'complete';
            return this.message = 'Game over';
        }

        this.currentRowIndex++;
        return this.message = 'One less try';
    },
}
