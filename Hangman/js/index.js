const data = "What is your name"
const blob = new Blob([data], { type: "octet-stream" });
const href = URL.createObjectURL(blob) // makes a url using the blob data

// URL.revokeObjectURL(href) //deletes the url
Object.assign(document.createElement("a"), {href, style:"display:none"});

//get content of a file
fetch("http://127.0.0.1:5500/Hangman/test.txt")
    .then((result) => { return result.text(); })
    .then((content) => {console.log(content) });