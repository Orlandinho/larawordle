export default class Tile {
    letter = '';
    status = '';

    constructor(position) {
        this.position = position;
    }
    fill(key) {
        this.letter = key.toUpperCase();
    }

    empty() {
        this.letter = ''
    }

    static updateStatusForRow(row, theWord) {
        theWord = theWord.split('')

        //check for correct letters
        for (let tile of row) {
            if (theWord[tile.position] === tile.letter) {
                tile.status = 'correct';

                theWord[tile.position] = null;
            }
        }

        //check for present letters
        for (let tile of row.filter(tile => ! tile.status)) {
            if (theWord.includes(tile.letter)) {
                tile.status = "present";

                theWord[theWord.indexOf(tile.letter)] = null;
            }
        }

        //absent letters
        for (let tile of row.filter(tile => ! tile.status)) {
                tile.status = 'absent'
        }
    }
}
