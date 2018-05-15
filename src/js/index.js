var btnMispell = document.getElementById('misspelify');
btnMispell.addEventListener('click', function(e) {
    var sentenceElem = document.getElementById('correct');
    var sentence = sentenceElem.value;
    var words = sentence.split(' ');
    words.forEach(function(word, i) {
        console.log(word + i)
    });

    var wrongSpan = document.getElementById('wrong');
    wrongSpan.innerText = words.reverse().join('');
});