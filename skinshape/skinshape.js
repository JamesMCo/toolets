---
---
const widearm = /((custom|steve|s)_.*)|(.*_(custom|steve|s))\.png/;
const slimarm = /((customSlim|alex|a|slim)_.*)|(.*_(customSlim|alex|a|slim))\.png/;
const canvas  = document.querySelector("#canvas");
const ctx     = canvas.getContext("2d");

handle_file_change = async (event) => {
    // Called when a new file is selected in the input element
    let reader = new FileReader();

    // Create an ImageBitmap that can be drawn to the canvas
    let image = await createImageBitmap(event.target.files[0]);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
}