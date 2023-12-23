console.log("hello World");

function submitForm(e) {
    e.preventDefault();
    const [start, goal] = [startInput.value.toLowerCase(), goalInput.value.toLowerCase()]
    
    if (!areValid(start, goal)) {
        alert("INVALID")
        return;
    }

    fetch(
        `/api/calc?start=${startInput.value}&goal=${goalInput.value}`,
        { method: 'GET'}
        )
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
}

function areValid(...values){
    for(const value in values){
        if(
            value.length !== 2 ||
            
        ) return false;
    }
    return true;
}