window.onload = () => {
    let b1 = document.getElementById("myBtn");
    // b1.addEventListener("click", () => {
    //     console.log('test');
    // });
    b1.onclick = () => {
        let div = document.getElementById("change");
        let c = div.classList;
        if (c.contains("day")){
            c.remove("day");
            c.add("night");
            b1.textContent = "Day";
        } else {
            c.remove("night");
            c.add("day");
            b1.textContent = "Night";
        }
    }

    handleTyping();
}

function handleTyping(){
    
    let typingDiv = document.getElementById("typing");

    document.addEventListener("keydown", (event) => {
        console.log(event.key);
        
        let newText = event.key;
        let oldText = typingDiv.innerHTML;

        typingDiv.innerHTML = oldText + newText;
    });
}