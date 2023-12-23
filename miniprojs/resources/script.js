console.log("hello World");

function submitForm(e) {
    e.preventDefault();
    const [start, goal] = [startInput.value.toLowerCase(), goalInput.value.toLowerCase()]
    
    if (!areValid(start, goal)) {
        display.innerHTML = 'invalid parameters'
        return;
    }

    display.innerHTML = 'PROCESSING'

    fetch(
        `/api/calc?start=${startInput.value}&goal=${goalInput.value}`,
        { method: 'GET'}
        )
        .then(res => res.json())
        .then(res => {
            console.log(res);
            display.innerHTML = res.result;

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