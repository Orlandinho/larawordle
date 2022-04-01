export default class Tile {
    letter = '';
    status = '';

    fill(key) {
        this.letter = key.toUpperCase();
    }

    empty() {
        this.letter = ''
    }
}
