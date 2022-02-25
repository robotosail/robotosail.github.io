const btn = document.getElementById("generateBtn");
const letterlength = document.getElementById("letters")
const numberslength = document.getElementById("numbers")
const characterslength = document.getElementById("characters");
const order = document.getElementById("order");
let value;
let result1;
let result2;
let result3;
let result4;

function generator() {
    result1 = ""
    result2 = ""
    result3 = ""
    result4 = ""
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "1234567890";
    const characters = "!@#$%^&*()-/;";
    for (let i = 0; i < Number(letterlength.value); i++){
        result1 += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < Number(numberslength.value); i++){
        result2 += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    for (let i = 0; i < Number(characterslength.value); i++){
        result3 += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // if (!result4) {
        
    //     result4 = result1 + result2 + result3;
    // }
    document.getElementById("Password").innerText = result4;
}

btn.addEventListener("click", generator)

//give the user a little freedom
order.addEventListener("input", function(e){
    value = e.target.value;
    if (value) {
        if (value === "letters/numbers/characters") {
            result4 = result1 + result2 + result3;
        }
        else if (value === "letters/characters/numbers") {
            result4 = result1 + result3 + result2;
        }
        else if (value === "numbers/letters/characters") {
            result4 = result2 + result1 + result3;
        }
        else if (value === "numbers/characters/letters") {
            result4 = result2 + result3 + result1;
        }
        else if (value === "characters/numbers/letters") {
            result4 = result3 + result2 + result1;
        }
        else if (value === "characters/letters/numbers") {
            result4 = result3 + result1 + result2;
        }
        else if (value === "random") {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-/;";
            let result = "";
            for (let i = 0; i < characters.length; i++){
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            result4 = result1 + result2 + result3 || result1 + result3 + result2 || result2 + result1 + result3 || result2 + result3 + result1 || result3 + result2 + result || result3 + result1 + result2;
        }
    }
    else {
        value = "letters/numbers/characters"
    }
    document.getElementById("Password").innerText = result4;
});
