import Tile from "./Tile";
import names from "./names";

export default {
    theWord: names[Math.floor(Math.random()*names.length)],
    guessesAllowed: 3,
    currentRowIndex: 0,
    state: 'active',
    errors: false,
    message: '',
    letters: [
        'QWERTYUIOP'.split(''),
        'ASDFGHJKL'.split(''),
        ['Enter', ...'ZXCVBNM'.split(''), 'Backspace']
    ],

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
            return Array.from({length: this.theWord.length}, (item, index) => new Tile(index));
        });
    },

    matchingTileForKey(key) {
      return this.board
          .flat()
          .filter(tile => tile.status)
          .sort((t1, t2) => {
              return t2.status === 'correct'
          })
          .find(tile => tile.letter === key.toLowerCase())
    },

    onKeyPress(key) {
        if (/^[A-z]$/.test(key)) {
            this.fillTile(key);
            this.message = '';
        } else if (key === 'Backspace') {
            this.emptyTile();
            this.errors = false;
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

        if(! names.includes(this.currentGuess)) {
            this.errors = true;
            this.message = 'Not a biblical name';
            return;
        }

        Tile.updateStatusForRow(this.currentRow, this.theWord);

        if (this.currentGuess === this.theWord) {
            this.state = 'complete';
            this.message = 'You win!';
        } else if (this.remainingGuesses === 0) {
            this.state = 'complete';
            this.message = 'The right answer is ' + this.theWord;
        } else {
            this.currentRowIndex++
            this.message = 'Try Again';
        }
    },
}
