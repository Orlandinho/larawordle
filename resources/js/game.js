import Tile from "./Tile";

export default {
    theWord: 'jesus',
    guessesAllowed: 4,
    currentRowIndex: 0,

    init() {
        this.board = Array.from({length: this.guessesAllowed}, () => {
            return Array.from({length: this.theWord.length}, () => new Tile)
        })
    },

    onKeyPress(key) {
        if (/^[A-z]$/.test(key)) {
            this.fillTile(key)
        } else if (key === 'Enter') {
            this.submitGuess()
        }
    },

    fillTile(key) {
        for (let tile of this.currentRow) {
            if (!tile.letter) {
                tile.letter = key

                break;
            }
        }
    },

    get currentRow() {
        return this.board[this.currentRowIndex]
    },

    get currentGuess() {
       return this.currentRow.map(tile => tile.letter).join('')
    },

    submitGuess() {
        let guess = this.currentGuess;
        if(this.currentGuess.length < this.theWord.length) {
            return
        }

        if (guess === this.theWord) {
            alert("You win!")
        } else {
            alert("One less try")
            this.currentRowIndex++;
        }
    }
}
