---
---
const widearm = /((custom|steve|s)_.*)|(.*_(custom|steve|s))\.png/;
const slimarm = /((customSlim|alex|a|slim)_.*)|(.*_(customSlim|alex|a|slim))\.png/;
const output  = document.querySelector("#output");

handle_file_change = async (event) => {
    // Called when a new file is selected in the input element
    let reader = new FileReader();

    // Read the file and convert it to base64 data:image/...
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
        // Called when the conversion finishes

        output.src = event.target.result;
    }
}

mask = () => {
    console.log("Not implemented");
}

save = () => {
    console.log("Not implemented");
}