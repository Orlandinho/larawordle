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
        <div id="game">
            <div class="row">
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
            </div>
            <div class="row">
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
            </div>
            <div class="row">
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
            </div>
        </div>
    </body>
</html>
