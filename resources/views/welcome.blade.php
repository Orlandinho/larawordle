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
        <div id="game" x-data="{ wordLength: 4, guessesAllowed: 4 }">
            <template x-for="row in Array.from({ length: guessesAllowed })">
                <div class="row">
                    <template x-for="tile in Array.from({ length: wordLength })">
                        <div class="tile"></div>
                    </template>
                </div>
            </template>
        </div>
    </body>
</html>
