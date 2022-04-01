require('./bootstrap');

import Alpine from "alpinejs";
import game from "./game";

document.addEventListener('alpine:init', () => {
    Alpine.data('game', () => game)
})
window.Alpine = Alpine;
Alpine.start()
