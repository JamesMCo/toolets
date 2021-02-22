clipboard = (obj) => {
    // Copy the value of obj to the clipboard

    obj.select();
    obj.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

$(document).ready(() => {
    try {
        bsCustomFileInput.init();
    } catch (err) {
        // pass
    }
})