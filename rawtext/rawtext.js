---
---
const preview         = document.querySelector("#preview");
const out             = document.querySelector("#out");
const plain_button    = document.querySelector("#plain_button");
const announce_button = document.querySelector("#announce_button");
const say_button      = document.querySelector("#say_button");
const sign_button     = document.querySelector("#sign_button");
const datalist        = document.querySelector("#autocomplete_lang_list");
const box1            = document.querySelector("#box1");
const box1_lang       = document.querySelector("#box1_checkbox_right");
const box2            = document.querySelector("#box2");
const box2_lang       = document.querySelector("#box2_checkbox_right");
const box3            = document.querySelector("#box3");
const box3_lang       = document.querySelector("#box3_checkbox_right");
const box4            = document.querySelector("#box4");
const box4_lang       = document.querySelector("#box4_checkbox_right");
let lang              = new Map();
let obf_loop          = null;

handle_file_change = (event) => {
    // Called when a new file is selected in the input element
    let reader = new FileReader();

    // Read the file
    reader.readAsText(event.target.files[0]);

    reader.onload = (event) => {
        // Called when the conversion finishes

        // Read the language file into the lang map
        
        datalist.innerHTML = "";
        lang.clear();
        for (line of event.target.result.split("\n")) {
            line = line.trim();
            
            // Discount empty lines or lines that are purely comments
            if (line === "" || line.startsWith("#")) {
                continue;
            }

            let key = line.split("=")[0].trim();
            let val = line.split("=").slice(1).join("=").split("##")[0];
            lang.set(key, val);
            datalist.innerHTML += `<option value="${key}">`;
        }
    }
}

init_plain = () => {
    plain_button.classList.remove("btn-danger");
    plain_button.classList.add("btn-secondary");
    announce_button.classList.add("btn-danger");
    announce_button.classList.remove("btn-secondary");
    say_button.classList.add("btn-danger");
    say_button.classList.remove("btn-secondary");
    sign_button.classList.add("btn-danger");
    sign_button.classList.remove("btn-secondary");

    box2.parentElement.classList.add("d-none");
    box3.parentElement.classList.add("d-none");
    box4.parentElement.classList.add("d-none");

    preview.classList.add("plain");
    preview.classList.remove("announce");
    preview.classList.remove("say");
    preview.classList.remove("sign");

    preview.innerHTML = "";
    out.innerHTML     = "";
}

init_announcement = () => {
    plain_button.classList.add("btn-danger");
    plain_button.classList.remove("btn-secondary");
    announce_button.classList.remove("btn-danger");
    announce_button.classList.add("btn-secondary");
    say_button.classList.add("btn-danger");
    say_button.classList.remove("btn-secondary");
    sign_button.classList.add("btn-danger");
    sign_button.classList.remove("btn-secondary");

    box2.parentElement.classList.remove("d-none");
    box3.parentElement.classList.add("d-none");
    box4.parentElement.classList.add("d-none");

    preview.classList.remove("plain");
    preview.classList.add("announce");
    preview.classList.remove("say");
    preview.classList.remove("sign");

    preview.innerHTML = "";
    out.innerHTML     = "";
}

init_say = () => {
    plain_button.classList.add("btn-danger");
    plain_button.classList.remove("btn-secondary");
    announce_button.classList.add("btn-danger");
    announce_button.classList.remove("btn-secondary");
    say_button.classList.remove("btn-danger");
    say_button.classList.add("btn-secondary");
    sign_button.classList.add("btn-danger");
    sign_button.classList.remove("btn-secondary");

    box2.parentElement.classList.remove("d-none");
    box3.parentElement.classList.add("d-none");
    box4.parentElement.classList.add("d-none");

    preview.classList.remove("plain");
    preview.classList.remove("announce");
    preview.classList.add("say");
    preview.classList.remove("sign");

    preview.innerHTML = "";
    out.innerHTML     = "";
}

init_sign = () => {
    plain_button.classList.add("btn-danger");
    plain_button.classList.remove("btn-secondary");
    announce_button.classList.add("btn-danger");
    announce_button.classList.remove("btn-secondary");
    say_button.classList.add("btn-danger");
    say_button.classList.remove("btn-secondary");
    sign_button.classList.remove("btn-danger");
    sign_button.classList.add("btn-secondary");

    box2.parentElement.classList.remove("d-none");
    box3.parentElement.classList.remove("d-none");
    box4.parentElement.classList.remove("d-none");

    preview.classList.remove("plain");
    preview.classList.remove("announce");
    preview.classList.remove("say");
    preview.classList.add("sign");

    preview.innerHTML = "";
    out.innerHTML     = "";
}

generate = () => {
    if (plain_button.classList.contains("btn-secondary")) {
        preview.innerHTML = generate_plain_preview();
        out.innerHTML     = generate_plain_rawtext();
    }
    else if (announce_button.classList.contains("btn-secondary")) {
        preview.innerHTML = generate_announcement_preview();
        out.innerHTML     = generate_announcement_rawtext();
    }
    else if (say_button.classList.contains("btn-secondary")) {
        preview.innerHTML = generate_say_preview();
        out.innerHTML     = generate_say_rawtext();
    }
    else if (sign_button.classList.contains("btn-secondary")) {
        preview.innerHTML = generate_sign_preview();
        out.innerHTML     = generate_sign_rawtext();
    }
}

format = (text) => {
    state_change = (event, data=null) => {
        if      (event === "colour")     {colour     = data;}
        else if (event === "obfuscated") {obfuscated = true;}
        else if (event === "bold")       {bold       = true;}
        else if (event === "italic")     {italic     = true;}
        else if (event === "reset")      {colour = "FFFFFF"; obfuscated = false; bold = false; italic = false;}

        if (output === "<span>") {output = "";} else {output += "</span>";}
        output += "<span ";
        if (obfuscated) {output += "class=\"obfuscated\" ";}
        output += "style=\"";
        if (colour)     {output += `color: #${colour};`;}
        if (bold)       {output += "font-weight: bold;";}
        if (italic)     {output += "font-style: italic;";}
        output += "\">";
    }
    
    let output     = "<span>";

    let colour     = false;
    let obfuscated = false;
    let bold       = false;
    let italic     = false;

    for (let i = 0; i < text.length; i++) {
        if (text[i] === "§") {
            if (i === text.length - 1) {
                output += "§";
            }
            else {
                switch (text[i+1]) {
                    case "0":
                        state_change("colour", "000000");
                        break;
                    case "1":
                        state_change("colour", "0000AA");
                        break;
                    case "2":
                        state_change("colour", "00AA00");
                        break;
                    case "3":
                        state_change("colour", "00AAAA");
                        break;
                    case "4":
                        state_change("colour", "AA0000");
                        break;
                    case "5":
                        state_change("colour", "AA00AA");
                        break;
                    case "6":
                        state_change("colour", "FFAA00");
                        break;
                    case "7":
                        state_change("colour", "AAAAAA");
                        break;
                    case "8":
                        state_change("colour", "555555");
                        break;
                    case "9":
                        state_change("colour", "5555FF");
                        break;
                    case "a":
                        state_change("colour", "55FF55");
                        break;
                    case "b":
                        state_change("colour", "55FFFF");
                        break;
                    case "c":
                        state_change("colour", "FF5555");
                        break;
                    case "d":
                        state_change("colour", "FF55FF");
                        break;
                    case "e":
                        state_change("colour", "FFFF55");
                        break;
                    case "f":
                        state_change("colour", "FFFFFF");
                        break;
                    case "g":
                        state_change("colour", "DDD605");
                        break;
                    case "k":
                        state_change("obfuscated");
                        break;
                    case "l":
                        state_change("bold");
                        break;
                    case "o":
                        state_change("italic");
                        break;
                    case "r":
                        state_change("reset");
                        break;
                }
                i++;
            }
        }
        else {
            output += text[i];
        }
    }
    output += "</span>";
    return output;
}

generate_plain_preview = () => {
    val1 = (box1_lang.checked && lang.has(box1.value)) ? lang.get(box1.value) : box1.value;
    return format(`§f${val1}`); // Prepend §f to force white text, as this matches text and title default settings
}
generate_announcement_preview = () => {
    if (!box1.value || !box2.value) {
        return format("§f[%s] %s"); // Prepend §f to force white text, matching default chat settings
    }
    
    val1 = (box1_lang.checked && lang.has(box1.value)) ? lang.get(box1.value) : box1.value;
    val2 = (box2_lang.checked && lang.has(box2.value)) ? lang.get(box2.value) : box2.value;
    return format(`§f[${val1}] ${val2}`); // Prepend §f to force white text, matching default chat settings
}
generate_say_preview = () => {
    if (!box1.value || !box2.value) {
        return format("§f&lt;%s&gt; %s"); // Prepend §f to force white text, matching default chat settings
    }
    
    val1 = (box1_lang.checked && lang.has(box1.value)) ? lang.get(box1.value) : box1.value;
    val2 = (box2_lang.checked && lang.has(box2.value)) ? lang.get(box2.value) : box2.value;
    return format(`§f&lt;${val1}&gt; ${val2}`); // Prepend §f to force white text, matching default chat settings
}
generate_sign_preview = () => {    
    val1 = (box1_lang.checked && lang.has(box1.value)) ? lang.get(box1.value) : box1.value;
    val2 = (box2_lang.checked && lang.has(box2.value)) ? lang.get(box2.value) : box2.value;
    val3 = (box3_lang.checked && lang.has(box3.value)) ? lang.get(box3.value) : box3.value;
    val4 = (box4_lang.checked && lang.has(box4.value)) ? lang.get(box4.value) : box4.value;
    return "<span class=\"warning\">Warning: text may exceed maximum sign length and wrap to next line</span><hr>" + format(`§0${val1}<br>§0${val2}<br>§0${val3}<br>§0${val4}`); // Prepend §0 to force black text, matching sign appearance
}

generate_plain_rawtext = () => {
    return `{"rawtext":[{"${box1_lang.checked ? "translate" : "text"}":"${box1.value}"}]}`;
}
generate_announcement_rawtext = () => {
    return `{"rawtext":[{"translate":"chat.type.announcement","with":{"rawtext":[{"${box1_lang.checked ? "translate" : "text"}":"${box1.value}"},{"${box2_lang.checked ? "translate" : "text"}":"${box2.value}"}]}}]}`;
}
generate_say_rawtext = () => {
    return `{"rawtext":[{"translate":"chat.type.text","with":{"rawtext":[{"${box1_lang.checked ? "translate" : "text"}":"${box1.value}"},{"${box2_lang.checked ? "translate" : "text"}":"${box2.value}"}]}}]}`;
}
generate_sign_rawtext = () => {
    return `{"rawtext":[{"translate":"%%s\\n%%s\\n%%s\\n%%s","with":{"rawtext":[{"${box1_lang.checked ? "translate" : "text"}":"${box1.value}"},{"${box2_lang.checked ? "translate" : "text"}":"${box2.value}"},{"${box3_lang.checked ? "translate" : "text"}":"${box3.value}"},{"${box4_lang.checked ? "translate" : "text"}":"${box4.value}"}]}}]}`;
}

obfuscate_text = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345789";
    for (node of document.querySelectorAll(".obfuscated")) {
        node.innerHTML = node.innerHTML.split("").map((c) => {
            if (c == " ") {return " ";}
            else {return chars[Math.floor(Math.random()*chars.length)];}
        }).join("");
    }
}