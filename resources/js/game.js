import Tile from "./Tile";

export default {
    wordLength: 4,
    guessesAllowed: 4,
    currentRowIndex: 0,

    init() {
        this.board = Array.from({length: this.guessesAllowed}, () => {
            return Array.from({length: this.wordLength}, () => new Tile)
        })
    },

    onKeyPress(key) {
        if (/^[A-z]$/.test(key)) {
            this.fillTile(key)
        } else if (key === 'Enter') {
            alert('I Pressed enter');
        }
    },

    fillTile(key) {
        for (let tile of this.currentRow()) {
            if (!tile.letter) {
                tile.letter = key

                break;
            }
        }

        if (this.currentTileIndex === this.wordLength - 1) {
            this.currentRowIndex++;
            this.currentTileIndex = 0;
        } else {
            this.currentTileIndex++;
        }
    },

    currentRow() {
        return this.board[this.currentRowIndex]
    }
}
