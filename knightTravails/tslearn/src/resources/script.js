console.log("hello World");

const inputs = document.getElementsByTagName('input')
const startInput = document.querySelector('input[name="start"]')
const goalInput = document.querySelector('input[name="goal"]')
const display = document.getElementById('display')
const progress = document.getElementById('progress')

populateDisplay();

[...inputs].forEach(input => input.addEventListener('change', clearSquares))

function submitForm(e) {
    e.preventDefault();

    const [start, goal] = [startInput.value.toLowerCase(), goalInput.value.toLowerCase()]
    
    if (!areValid(start, goal)) {
        progress.innerHTML = 'invalid parameters'
        return;
    }

    progress.innerHTML = 'processing'

    fetch(
        `/api/calc?start=${startInput.value}&goal=${goalInput.value}`,
        { method: 'GET'}
        )
        .then(res => res.json())
        .then(res => {

            console.log(res.result);

            progress.innerHTML = '';
            const resultArr = res.result.split('->');
            resultArr.forEach((item, index) => {
                document.getElementById(item).textContent=index+1;
            })

        })
}

function areValid(...values){
    for(const value of values){
        if(
            value.length !== 2 ||
            value[0] < 'a' ||
            value[0] > 'h' ||
            value[1] < '1' ||
            value[1] > '8'
        ) return false;
    }
    return true;
}

function populateDisplay () {
    const squares = [];
    const [charA, charH] = ['a'.charCodeAt(0), 'h'.charCodeAt(0)];
    let fill, fillWhite = true;
    for(let row=8; row>=1; row--){
        for(let col=charA; col<=charH; col++){
            fill = fillWhite ? 'fill-white' : 'fill-black'
            squares.push(
                `<span class='square ${fill}' id='${String.fromCharCode(col) + row}'></span>`
            )
            fillWhite = !fillWhite
        }
        fillWhite = !fillWhite
    }
    display.innerHTML = squares.join('')
}

function clearSquares (){
    [...document.getElementsByClassName('square')].forEach(square => {
        square.textContent = '';
    })
}