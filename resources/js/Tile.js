export default class Tile {
    letter = '';
    status = '';

    fill(key) {
        this.letter = key.toUpperCase();
    }

    empty() {
        this.letter = ''
    }

    updateTile(theWord, currentGuess) {
        this.status = theWord.includes(this.letter) ? 'present' : 'absent';

        if (currentGuess.indexOf(this.letter) === theWord.indexOf(this.letter)) {
            this.status = 'correct';
        }
    }
}
