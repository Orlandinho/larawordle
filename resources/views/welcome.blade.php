<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wordle</title>
        <link rel="stylesheet" href="{{ asset("css/app.css") }}">
        <script src="{{ asset("js/app.js") }}" defer></script>
    </head>
    <body>
        <main x-data="game"
             @keyup.window="onKeyPress($event.key)"
        >
            <div id="game">
                <template x-for="row in board">
                    <div class="row">
                        <template x-for="tile in row">
                            <div class="tile" :class="tile.status" x-text="tile.letter"></div>
                        </template>
                    </div>
                </template>
            </div>
            <output x-text="message"></output>
        </main>
    </body>
</html>
