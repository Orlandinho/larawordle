import Tile from "./Tile";
import names from "./names";

let today = new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})
let wotd = names.data.filter(name => {
    return name.day === today
})

// theWord: names.data[Math.floor(Math.random()*names.data.length)],
export default {
    //theWord: wotd[0],
    theWord: names.data[Math.floor(Math.random()*names.data.length)],
    guessesAllowed: 5,
    currentRowIndex: 0,
    state: 'active',
    errors: false,
    message: '',
    letters: [
        'qwertyuiop'.split(''),
        'asdfghjkl'.split(''),
        ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
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
            return Array.from({length: this.theWord.name.length}, (item, index) => new Tile(index));
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
            if (! tile.letter) {
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
        if(this.currentGuess.length < this.theWord.name.length) {
            return;
        }

        if(! names.data.find( data => data.name === this.currentGuess)) {
            this.errors = true;
            this.message = 'Nome inválido ou não consta na base de dados ainda';
            return;
        }

        Tile.updateStatusForRow(this.currentRow, this.theWord.name);

        if (this.currentGuess === this.theWord.name) {
            this.state = 'complete';
            this.message = 'Parabéns! O nome pode ser encontrado em ' + this.theWord.ref;
        } else if (this.remainingGuesses === 0) {
            this.state = 'complete';
            this.message = 'A resposta correta é ' + this.theWord.name.toUpperCase() + '. Referencia: ' + this.theWord.ref;
        } else {
            this.currentRowIndex++
        }
    },
}
