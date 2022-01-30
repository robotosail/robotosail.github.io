const form = document.getElementById("form");
const box = document.getElementById("box");
const response = document.getElementById("response");
const tip1 = document.getElementById("tip1");
const tip2 = document.getElementById("tip2");
const tip3 = document.getElementById("tip3");
const tip = document.getElementsByClassName("tip");

let tiprate;
let value, input;


    writeMessage({ text: "What is your bill?", bot: true });

tip1.addEventListener("click", () => {
    tiprate = 10;
})

tip2.addEventListener("click", () => {
    tiprate = 12;
})
tip3.addEventListener("click", () => {
    tiprate = 15;
})


function writeMessage({ text, bot, answer }) {
    this.text = text;
    let message = document.createElement("div");
    message.setAttribute("id", "message");
    message.setAttribute("class", "border-2px-black width-40 padding-10px margin-10px left-55 pos-relative text align-justify messages");
    message.innerHTML = this.text;
    message.style.cssText = "background:lightblue;";
    box.appendChild(message);
    if (bot === true) {
        message.style.left = "0";
    }
    box.scrollTo(0, box.scrollHeight);
    if (answer === true) {
        input = document.createElement("input");
        input.classList.add("messages")
        input.placeholder = "be quick when you answer";
        box.appendChild(input);
        response.disabled = true;
        input.focus();
        input.addEventListener("input", () => {
            setTimeout(function () {
                input.disabled = true;
                response.disabled = false;
                response.focus();
                value = input.value;
                const value1 = value.replace(/_/g, "");
                value = value1;
                // value = Number(value1) + 1;
                console.log(value)
            }, 900);
        });
    }
    return value;
}

function entermessage(e) {
    e.preventDefault();
    const text = response.value;
    let answer;
    response.value = "";
        
    if (Number(text) ) {
        answer = text;
        writeMessage({ text: text });
        if (tiprate) {
            calculate(Number(answer), tiprate);
        }
        else {
            writeMessage({ text: "please set a tipping rate", answer: true, bot: true});
            if (value) {
                tiprate = value;
                console.log(tiprate);
                calculate(Number(answer), tiprate);
            }
        }

    }
     if (text === "clear") {
        const messages = document.getElementsByClassName("messages");
        for (let i = 0; i < 1; i++) {
            box.innerHTML = "";
            writeMessage({ text: "What is your bill?", bot: true });
        }
    }
    else {
        writeMessage({ text: "numbers only", bot: true });

    }
}

form.addEventListener("submit", entermessage);

function calculate(answer, tip) {
    let math = Number((tip * answer) / 100);
    const bill = Number(answer + math);
    if (!Number.isInteger(math)) {
        // writeMessage({ text: `You should give a tip of ${math} cents`, bot: true });

        writeMessage({ text: "How many people are you?", bot: true, answer: true });
        let getInterval = setInterval(function () {
            if (value && Number(value)) {
                clearInterval(getInterval);
                writeMessage({ text: `Each of you pay \$${(bill / value).toFixed(2)}`, bot: true });
                value = undefined;
            }
        }, 1000);
    }
    else {
        // writeMessage({ text: `You should give a tip of \$${math}`, bot: true });
        writeMessage({ text: "How many people are you?", bot: true, answer: true});
        let getInterval = setInterval(function () {
            if (value && Number(value)) {
                clearInterval(getInterval);
                writeMessage({ text: `Each of you pay \$${(bill / value).toFixed(2)}`, bot: true });
                value = undefined;
            }
        }, 1000);
        return;
    }
     
}


for (let i = 0; i < tip.length; i++){
    for (let j = 0; j < tip[i].length; j++){
            tip[i].addEventListener("click", function () {

            if (tip[j].classList.contains("bg-lightblue")) {
                tip[i].classList.remove("bg-lightblue");
                tip[i].classList.add("bg-aqua");
            }
            else {
                tip[i].classList.add("bg-lightblue");
                tip[i].classList.remove("bg-aqua");
            }
        })
        }
}