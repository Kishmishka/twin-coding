import penguin from '../img/avatars/penguin.svg';
import frog from '../img/avatars/frog.svg';
import anteater from '../img/avatars/anteater.svg';
import crocodile from '../img/avatars/crocodile.svg';
import chameleon from '../img/avatars/chameleon.svg';
import owl from '../img/avatars/owl.svg';
import tortoise from '../img/avatars/tortoise.svg';
import elephant from '../img/avatars/elephant.svg';
import shark from '../img/avatars/shark.svg';
import fish from '../img/avatars/fish.svg';
import toucan from '../img/avatars/toucan.svg';
import cobra from '../img/avatars/cobra.svg';
import stingray from '../img/avatars/stingray.svg';
import squirrel from '../img/avatars/squirrel.svg';
import duck from '../img/avatars/duck.svg';
import sheep from '../img/avatars/sheep.svg';

// Пользовательский хук служащий для отрисовки автатарки по имени пользователя
function useAvatar(name: string) {
    switch (name) {
        case 'Загорелый пингвин':
            return penguin;
        case 'Равнодушная лягушка':
            return frog;
        case 'Безудержный муравьед':
            return anteater;
        case 'Суетной крокодил':
            return crocodile;
        case 'Мутный хамелеон':
            return chameleon;
        case 'Внушительный филин':
            return owl;
        case 'Неуловимая чарепаха':
            return tortoise;
        case 'Скрытный слон':
            return elephant;
        case 'Заинтересованная акула':
            return shark;
        case 'Сухопутная рыба':
            return fish;
        case 'Приземленный тукан':
            return toucan;
        case 'Прямолинейная кобра':
            return cobra;
        case 'Забагованный скат':
            return stingray;
        case 'Рекурсивная белка':
            return squirrel;
        case 'Относительная утка':
            return duck;
        case 'Виртуозный барашек':
            return sheep;
        default:
            return '';
    }
}

export { useAvatar };
