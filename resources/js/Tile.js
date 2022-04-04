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

    updateStatus(theWord) {
        if (! theWord.includes(this.letter)) {
            return this.status = 'absent';
        }

        if (this.letter === theWord[this.position]) {
            return this.status = 'correct'
        }

        return this.status = 'present'
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
        for (let tile of row) {
            if (theWord.includes(tile.letter)) {
                tile.status = 'present';

                theWord[theWord.indexOf(tile.letter)] = null;
            }
        }

        //absent letters
        for (let tile of row.filter(tile => ! tile.status)) {
                tile.status = 'absent'
        }
    }
}
