var btnMispell = document.getElementById('misspelify');
var wrongSpan = document.getElementById('wrong');

btnMispell.addEventListener('click', misspelify);
wrongSpan.addEventListener('click', copyText);

function misspelify() {
    var sentenceElem = document.getElementById('correct');
    var sentence = sentenceElem.value;
    var words = sentence.split(' ').map(damageWord);
    
    wrongSpan.innerText = words.join(' ');
}

function copyText(e) {
    e.target.focus();
    e.target.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    console.log(e.target.innerText);
}

function damageWord(word) {
    var availableFunctions = [
        swapLetters,
        unpressRandomLetter,
        addNeighbourLetter,
        replaceByNeighbourLetter
    ];
    var random = Math.floor(Math.random() * 4);
    return availableFunctions[random](word);
}

function swapLetters(word) {
    var newWord = '';
    var expWord = word.split('');
    for (var index in expWord) {
        if (ok() && index < expWord.length-1) {
            var nextLetter = expWord[index-(-1)];
            expWord[index-(-1)] = expWord[index];
            expWord[index] = nextLetter;
        }
        newWord += expWord[index];
    }
    return newWord;
}

function unpressRandomLetter(word) {
    var newWord = '';
    var expWord = word.split('');
    for (var index in expWord) {
        if (ok()) {
            newWord += expWord[index];
        }
    }
    return newWord;
}

function addNeighbourLetter(word) {
    var newWord = '';
    var expWord = word.split('');
    for (var index in expWord) {
        newWord += expWord[index];
        if (ok()) {
            newWord += getNeighbourLetter(expWord[index]);
        }
    }
    return newWord;
}

function replaceByNeighbourLetter(word) {
    var newWord = '';
    var expWord = word.split('');
    for (var index in expWord) {
        if (ok()) {
            newWord += getNeighbourLetter(expWord[index]);
        } else {
            newWord += expWord[index];
        }
    }
    return newWord;
}

function getNeighbourLetter(letter) {
    var isUpperCase = letter == letter.toUpperCase();
    var mapNeighbourLetters = {
        '\'': ['1','q'],
        '1': ['\'','q','2'],
        '2': ['1','q','w',3],
        '3': ['2','w','e','4'],
        '4': ['3','e','r','5'],
        '5': ['4','r','t','6'],
        '6': ['5','t','y','7'],
        '7': ['6','y','u','8'],
        '8': ['7','u','i','9'],
        '9': ['8','i','o','0'],
        '0': ['9','o','p','-'],
        '-': ['0','p','´','='],
        '=': ['-','´','['],
        'q': ['1','2','w','a'],
        'w': ['q','2','3','e','s'],
        'e': ['w','3','4','r','d'],
        'r': ['e','4','5','t','f'],
        't': ['r','5','6','y','g'],
        'y': ['t','6','7','u','h'],
        'u': ['y','7','8','i','j'],
        'i': ['u','8','9','o','k'],
        'o': ['i','9','0','p','l'],
        'p': ['o','0','-','´','ç'],
        '´': ['p','-','=','[','~'],
        '[': ['´','=',']','',''],
        'a': ['q','s','z'],
        's': ['w','d','x','a'],
        'd': ['e','f','c','s'],
        'f': ['r','g','v','d'],
        'g': ['t','h','b','f'],
        'h': ['y','j','n','g'],
        'j': ['u','k','m','h'],
        'k': ['i','l',',','j'],
        'l': ['o','ç','.','k'],
        'ç': ['p','~',';','l'],
        '~': ['´',']','/','ç'],
        ']': ['[','~'],
        '\\': ['a','z'],
        'z': ['\\','a','s','x'],
        'x': ['z','s','d','c'],
        'c': ['x','d','f','v'],
        'v': ['c','f','g','b'],
        'b': ['v','g','h','n'],
        'n': ['b','h','j','m'],
        'm': ['n','j','k',','],
        ',': ['m','k','l','.'],
        '.': [',','l','ç',';'],
        ';': ['.','ç','~','/'],
        '/': [';','~',']']
    };
    var neighbourLetters = mapNeighbourLetters[letter.toLowerCase()];
    return isUpperCase
        ? neighbourLetters[Math.floor(Math.random() * neighbourLetters.length)].toUpperCase()
        : neighbourLetters[Math.floor(Math.random() * neighbourLetters.length)];
}

function ok() {
    return Math.floor(Math.random() * 100) % 2 == 0;
}
