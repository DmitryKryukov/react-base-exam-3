function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    let tempArray = array;
    for (let i = tempArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
    }
    return tempArray;
}

function getScreenDimensions(): { width: number; height: number } {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return { width, height };
}


export { getRandomInt, shuffleArray, getScreenDimensions }