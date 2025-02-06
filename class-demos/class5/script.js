let x = 0;
const color = ["ffbe0b", "fb5607", "ff006e", "8338ec", "3a86ff"];

window.onload = () => {

    for(let i = 0; i < 50; i++){

        // creating element
        const span = document.createElement('span');
        const node = document.createTextNode(' ' + i + ' created! ');

        // adding text to element
        span.appendChild(node);
        span.classList.add('text-body');
        span.style.color = randomColor(color);
        span.style.backgroundColor = randomColor(color);

        // add it to the webpage
        document.body.appendChild(span);

    }

    // 2 parameters
    // 1. function (action) to be executed
    // 2. time that requires to pass before that function is executed
    // setInterval(time, 1000)
    // const canvas = document.getElementById('canvas');
}

function time(){
    // x++;
    // console.log(x + ' seconds has passed');
    // java script 如果用 + 會自動轉換成字符串，如果用 , 會展示数据类型
    const date = new Date();
    console.log(date.toLocaleTimeString());
}

function randomColor(arr){
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}