<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wordle</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="{{ asset("css/app.css") }}">
        <script src="{{ asset("js/app.js") }}" defer></script>
    </head>
    <body>
        <main x-data="game" @keyup.window="onKeyPress($event.key)">

            <output x-text="message"></output>

            <div id="game">
                <template x-for="(row, index) in board">
                    <div class="row" :class="{ 'current': currentRowIndex === index, 'invalid': currentRowIndex === index && errors }">
                        <template x-for="tile in row">
                            <div class="tile" :class="tile.status" x-text="tile.letter"></div>
                        </template>
                    </div>
                </template>
            </div>

            <div id="keyboard" @click.stop="$event.target.matches('button') && onKeyPress($event.target.textContent)">
                <template x-for="row in letters">
                    <div id="row">
                        <template x-for="key in row">
                            <button type="button" :class="matchingTileForKey(key)?.status" class="key" x-text="key"></button>
                        </template>
                    </div>
                </template>
            </div>

        </main>
    </body>
</html>
