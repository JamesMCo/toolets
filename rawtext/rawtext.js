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
const box1_with       = document.querySelector("#box1_checkbox_right2");
const box2            = document.querySelector("#box2");
const box2_lang       = document.querySelector("#box2_checkbox_right");
const box2_with       = document.querySelector("#box2_checkbox_right2");
const box3            = document.querySelector("#box3");
const box3_lang       = document.querySelector("#box3_checkbox_right");
const box3_with       = document.querySelector("#box3_checkbox_right2");
const box4            = document.querySelector("#box4");
const box4_lang       = document.querySelector("#box4_checkbox_right");
const box4_with       = document.querySelector("#box4_checkbox_right2");
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
    box2.parentElement.nextElementSibling.classList.add("d-none");
    box3.parentElement.classList.add("d-none");
    box3.parentElement.nextElementSibling.classList.add("d-none");
    box4.parentElement.classList.add("d-none");
    box4.parentElement.nextElementSibling.classList.add("d-none");

    preview.classList.add("plain");
    preview.classList.remove("announce");
    preview.classList.remove("say");
    preview.classList.remove("sign");

    preview.innerHTML = "";
    out.innerHTML     = "";
    clearInterval(obf_loop);
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
    toggle_with({"target":box2_with});
    box3.parentElement.classList.add("d-none");
    box3.parentElement.nextElementSibling.classList.add("d-none");
    box4.parentElement.classList.add("d-none");
    box4.parentElement.nextElementSibling.classList.add("d-none");

    preview.classList.remove("plain");
    preview.classList.add("announce");
    preview.classList.remove("say");
    preview.classList.remove("sign");

    preview.innerHTML = "";
    out.innerHTML     = "";
    clearInterval(obf_loop);
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
    toggle_with({"target":box2_with});
    box3.parentElement.classList.add("d-none");
    box3.parentElement.nextElementSibling.classList.add("d-none");
    box4.parentElement.classList.add("d-none");
    box4.parentElement.nextElementSibling.classList.add("d-none");

    preview.classList.remove("plain");
    preview.classList.remove("announce");
    preview.classList.add("say");
    preview.classList.remove("sign");

    preview.innerHTML = "";
    out.innerHTML     = "";
    clearInterval(obf_loop);
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
    toggle_with({"target":box2_with});
    box3.parentElement.classList.remove("d-none");
    toggle_with({"target":box3_with});
    box4.parentElement.classList.remove("d-none");
    toggle_with({"target":box4_with});

    preview.classList.remove("plain");
    preview.classList.remove("announce");
    preview.classList.remove("say");
    preview.classList.add("sign");

    preview.innerHTML = "";
    out.innerHTML     = "";
    clearInterval(obf_loop);
}

lang_checkbox_click = (event) => {
    if (event.target.parentElement.nextElementSibling.lastElementChild.checked) {
        alert("Using an inner rawtext element requires using \"translate\" in the outer element (i.e. the text could be from the language file, even if it does not resolve to a line in the language file)");
        event.target.checked = true;
    }
}

toggle_with = (event) => {
    if (event.target.checked) {
        event.target.parentElement.previousElementSibling.lastElementChild.checked = true; // Not able to use inner rawtext element without the outer element using "translate"
        event.target.parentElement.parentElement.classList.remove("mb-3");
        event.target.parentElement.parentElement.classList.add("mb-0");
        event.target.parentElement.parentElement.nextElementSibling.classList.remove("d-none");
    }
    else {
        event.target.parentElement.parentElement.classList.remove("mb-0");
        event.target.parentElement.parentElement.classList.add("mb-3");
        event.target.parentElement.parentElement.nextElementSibling.classList.add("d-none");
    }
}

with_dropdown_change = (event) => {
    if (event.target.selectedIndex === 0) {
        event.target.nextElementSibling.setAttribute("list", "");

        event.target.nextElementSibling.nextElementSibling.classList.add("d-none");
        event.target.nextElementSibling.placeholder = "";
        event.target.nextElementSibling.nextElementSibling.placeholder = "";
    }
    else if (event.target.selectedIndex === 1) {
        event.target.nextElementSibling.setAttribute("list", "autocomplete_lang_list");

        event.target.nextElementSibling.nextElementSibling.classList.add("d-none");
        event.target.nextElementSibling.placeholder = "";
        event.target.nextElementSibling.nextElementSibling.placeholder = "";
    }
    else if (event.target.selectedIndex === 2) {
        event.target.nextElementSibling.setAttribute("list", "selector_selector_list");

        event.target.nextElementSibling.nextElementSibling.classList.add("d-none");
        event.target.nextElementSibling.placeholder = "";
        event.target.nextElementSibling.nextElementSibling.placeholder = "";
    }
    else if (event.target.selectedIndex === 3) {
        event.target.nextElementSibling.setAttribute("list", "score_selector_list");

        event.target.nextElementSibling.nextElementSibling.classList.remove("d-none");
        event.target.nextElementSibling.placeholder = "Selector";
        event.target.nextElementSibling.nextElementSibling.placeholder = "Objective";
    }
}

generate = () => {
    clearInterval(obf_loop);

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

    if (document.querySelector(".obfuscated")) {
        obf_loop = setInterval(obfuscate_text, 200);
    }
}

perform_replace = (outer, outer_in_lang, inner) => {
    let main_pattern = null;
    let pos_pattern  = null;
    let num_pattern  = null;
    if (outer_in_lang) {main_pattern = /%s|%1/g;   pos_pattern = /%s/g;  num_pattern = /%1/g;}
    else               {main_pattern = /%%s|%%1/g; pos_pattern = /%%s/g; num_pattern = /%%1/g;}

    let matches = 0;
    let last_split_index = 0;
    let output = "";

    for (match of outer.matchAll(main_pattern)) {
        output += outer.slice(last_split_index, match.index);
        if (matches === 0) {
            output += inner.replace(/%s|%1/g, "");
            last_split_index = match.index + 2 + (!outer_in_lang);
        }
        else {
            if (outer.slice(match.index).search(num_pattern) === 0) {
                output += inner.replace(/%s|%1/g, "");
                last_split_index = match.index + 2 + (!outer_in_lang);
            }
            else {
                // Positional requested, but not the first one, so returns empty
                last_split_index = match.index + 2 + (!outer_in_lang);
            }
        }

        matches++;
    }
    output += outer.slice(last_split_index);
    return output;
}

format = (text) => {
    state_change = (event, data=null) => {
        if      (event === "colour")     {colour     = data;}
        else if (event === "obfuscated") {obfuscated = true;}
        else if (event === "bold")       {bold       = true;}
        else if (event === "italic")     {italic     = true;}
        else if (event === "reset")      {colour = def_col; obfuscated = false; bold = false; italic = false;}

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

    let def_col    = (text[1] == "f") ? "FFFFFF" : "000000";
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
        else if (text[i] === "\\") {
            if (i === text.length - 1) {
                output += "\\";
            }
            else {
                if (text[i+1] === "n") {
                    output += "<br>";
                }
                else {
                    output += text[i+1];
                }
                i++;
            }
        }
        else if (text[i] === " ") {
            output += "&nbsp;";
        }
        else {
            output += text[i];
        }
    }
    output += "</span>";
    return output;
}

generate_plain_preview = () => {
    let val1_found_in_lang = box1_lang.checked && lang.has(box1.value);
    let val1               = (val1_found_in_lang) ? lang.get(box1.value) : box1.value;
    let val1_string        = "";
    if (box1_with.checked) {
        if (box1_with_select.selectedIndex === 1 && lang.has(box1_with_input.value)) {
            val1_string = perform_replace(val1, val1_found_in_lang, lang.get(box1_with_input.value));
        }
        else if (box1_with_select.selectedIndex === 3) {
            val1_string = perform_replace(val1, val1_found_in_lang, "0");
        }
        else {
            val1_string = perform_replace(val1, val1_found_in_lang, box1_with_input.value);
        }
    }
    else {
        val1_string = val1;
    }

    return format(`§f${val1_string}`); // Prepend §f to force white text, as this matches text and title default settings
}
generate_announcement_preview = () => {
    if (!box1.value || !box2.value) {
        return format("§f[%s] %s"); // Prepend §f to force white text, matching default chat settings
    }
    
    let val1_found_in_lang = box1_lang.checked && lang.has(box1.value);
    let val1               = (val1_found_in_lang) ? lang.get(box1.value) : box1.value;
    let val1_string        = "";
    if (box1_with.checked) {
        if (box1_with_select.selectedIndex === 1 && lang.has(box1_with_input.value)) {
            val1_string = perform_replace(val1, val1_found_in_lang, lang.get(box1_with_input.value));
        }
        else if (box1_with_select.selectedIndex === 3) {
            val1_string = perform_replace(val1, val1_found_in_lang, "0");
        }
        else {
            val1_string = perform_replace(val1, val1_found_in_lang, box1_with_input.value);
        }
    }
    else {
        val1_string = val1;
    }

    let val2_found_in_lang = box2_lang.checked && lang.has(box2.value);
    let val2               = (val2_found_in_lang) ? lang.get(box2.value) : box2.value;
    let val2_string        = "";
    if (box2_with.checked) {
        if (box2_with_select.selectedIndex === 1 && lang.has(box2_with_input.value)) {
            val2_string = perform_replace(val2, val2_found_in_lang, lang.get(box2_with_input.value));
        }
        else if (box2_with_select.selectedIndex === 3) {
            val2_string = perform_replace(val2, val2_found_in_lang, "0");
        }
        else {
            val2_string = perform_replace(val2, val2_found_in_lang, box2_with_input.value);
        }
    }
    else {
        val2_string = val2;
    }

    return format(`§f[${val1_string}] ${val2_string}`); // Prepend §f to force white text, matching default chat settings
}
generate_say_preview = () => {
    if (!box1.value || !box2.value) {
        return format("§f&lt;%s&gt; %s"); // Prepend §f to force white text, matching default chat settings
    }
    
    let val1_found_in_lang = box1_lang.checked && lang.has(box1.value);
    let val1               = (val1_found_in_lang) ? lang.get(box1.value) : box1.value;
    let val1_string        = "";
    if (box1_with.checked) {
        if (box1_with_select.selectedIndex === 1 && lang.has(box1_with_input.value)) {
            val1_string = perform_replace(val1, val1_found_in_lang, lang.get(box1_with_input.value));
        }
        else if (box1_with_select.selectedIndex === 3) {
            val1_string = perform_replace(val1, val1_found_in_lang, "0");
        }
        else {
            val1_string = perform_replace(val1, val1_found_in_lang, box1_with_input.value);
        }
    }
    else {
        val1_string = val1;
    }

    let val2_found_in_lang = box2_lang.checked && lang.has(box2.value);
    let val2               = (val2_found_in_lang) ? lang.get(box2.value) : box2.value;
    let val2_string        = "";
    if (box2_with.checked) {
        if (box2_with_select.selectedIndex === 1 && lang.has(box2_with_input.value)) {
            val2_string = perform_replace(val2, val2_found_in_lang, lang.get(box2_with_input.value));
        }
        else if (box2_with_select.selectedIndex === 3) {
            val2_string = perform_replace(val2, val2_found_in_lang, "0");
        }
        else {
            val2_string = perform_replace(val2, val2_found_in_lang, box2_with_input.value);
        }
    }
    else {
        val2_string = val2;
    }

    return format(`§f&lt;${val1_string}&gt; ${val2_string}`); // Prepend §f to force white text, matching default chat settings
}
generate_sign_preview = () => {
    let warn = false;

    let val1_found_in_lang = box1_lang.checked && lang.has(box1.value);
    let val1               = (val1_found_in_lang) ? lang.get(box1.value) : box1.value;
    let val1_string        = "";
    if (box1_with.checked) {
        if (box1_with_select.selectedIndex === 1 && lang.has(box1_with_input.value)) {
            val1_string = perform_replace(val1, val1_found_in_lang, lang.get(box1_with_input.value));
        }
        else if (box1_with_select.selectedIndex === 2 || box1_with_select.selectedIndex === 3) {
            val1_string = perform_replace(val1, val1_found_in_lang, "");
            warn = true;
        }
        else {
            val1_string = perform_replace(val1, val1_found_in_lang, box1_with_input.value);
        }
    }
    else {
        val1_string = val1;
    }

    let val2_found_in_lang = box2_lang.checked && lang.has(box2.value);
    let val2               = (val2_found_in_lang) ? lang.get(box2.value) : box2.value;
    let val2_string        = "";
    if (box2_with.checked) {
        if (box2_with_select.selectedIndex === 1 && lang.has(box2_with_input.value)) {
            val2_string = perform_replace(val2, val2_found_in_lang, lang.get(box2_with_input.value));
        }
        else if (box2_with_select.selectedIndex === 2 || box2_with_select.selectedIndex === 3) {
            val2_string = perform_replace(val2, val2_found_in_lang, "");
            warn = true;
        }
        else {
            val2_string = perform_replace(val2, val2_found_in_lang, box2_with_input.value);
        }
    }
    else {
        val2_string = val2;
    }

    let val3_found_in_lang = box3_lang.checked && lang.has(box3.value);
    let val3               = (val3_found_in_lang) ? lang.get(box3.value) : box3.value;
    let val3_string        = "";
    if (box3_with.checked) {
        if (box3_with_select.selectedIndex === 1 && lang.has(box3_with_input.value)) {
            val3_string = perform_replace(val3, val3_found_in_lang, lang.get(box3_with_input.value));
        }
        else if (box3_with_select.selectedIndex === 2 || box3_with_select.selectedIndex === 3) {
            val3_string = perform_replace(val3, val3_found_in_lang, "");
            warn = true;
        }
        else {
            val3_string = perform_replace(val3, val3_found_in_lang, box3_with_input.value);
        }
    }
    else {
        val3_string = val3;
    }

    let val4_found_in_lang = box4_lang.checked && lang.has(box4.value);
    let val4               = (val4_found_in_lang) ? lang.get(box4.value) : box4.value;
    let val4_string        = "";
    if (box4_with.checked) {
        if (box4_with_select.selectedIndex === 1 && lang.has(box4_with_input.value)) {
            val4_string = perform_replace(val4, val4_found_in_lang, lang.get(box4_with_input.value));
        }
        else if (box4_with_select.selectedIndex === 2 || box4_with_select.selectedIndex === 3) {
            val4_string = perform_replace(val4, val4_found_in_lang, "");
            warn = true;
        }
        else {
            val4_string = perform_replace(val4, val4_found_in_lang, box4_with_input.value);
        }
    }
    else {
        val4_string = val4;
    }

    return "<span class=\"warning\">Warning: text may exceed maximum sign length and wrap to next line</span>" + ((warn) ? "<br><span class=\"warning\">Warning: selectors and scores do not work in signs</span>" : "") + "<hr>" + format(`§0${val1_string}<br>§0${val2_string}<br>§0${val3_string}<br>§0${val4_string}`); // Prepend §0 to force black text, matching sign appearance
}

generate_single_rawtext = (boxno) => {
    let box             = null;
    let box_lang        = null;
    let box_with        = null;
    let box_with_select = null;
    let box_with_input  = null;
    let box_with_input2 = null;

    switch (boxno) {
        case 1:
            box             = box1;
            box_lang        = box1_lang;
            box_with        = box1_with;
            box_with_select = document.querySelector("#box1_with_select");
            box_with_input  = document.querySelector("#box1_with_input");
            box_with_input2 = document.querySelector("#box1_with_input2");
            break;
        case 2:
            box             = box2;
            box_lang        = box2_lang;
            box_with        = box2_with;
            box_with_select = document.querySelector("#box2_with_select");
            box_with_input  = document.querySelector("#box2_with_input");
            box_with_input2 = document.querySelector("#box2_with_input2");
            break;
        case 3:
            box             = box3;
            box_lang        = box3_lang;
            box_with        = box3_with;
            box_with_select = document.querySelector("#box3_with_select");
            box_with_input  = document.querySelector("#box3_with_input");
            box_with_input2 = document.querySelector("#box3_with_input2");
            break;
        case 4:
            box             = box4;
            box_lang        = box4_lang;
            box_with        = box4_with;
            box_with_select = document.querySelector("#box4_with_select");
            box_with_input  = document.querySelector("#box4_with_input");
            box_with_input2 = document.querySelector("#box4_with_input2");
            break;
    }

    if (box_with.checked) {
        if (box_with_select.selectedIndex === 0) {
            return `{"rawtext":[{"${box_lang.checked ? "translate" : "text"}":"${box.value}","with":{"rawtext":[{"text":"${box_with_input.value}"}]}}]}`;
        }
        else if (box_with_select.selectedIndex === 1) {
            return `{"rawtext":[{"${box_lang.checked ? "translate" : "text"}":"${box.value}","with":{"rawtext":[{"translate":"${box_with_input.value}"}]}}]}`;
        }
        else if (box_with_select.selectedIndex === 2) {
            return `{"rawtext":[{"${box_lang.checked ? "translate" : "text"}":"${box.value}","with":{"rawtext":[{"selector":"${box_with_input.value}"}]}}]}`;
        }
        else if (box_with_select.selectedIndex === 3) {
            return `{"rawtext":[{"${box_lang.checked ? "translate" : "text"}":"${box.value}","with":{"rawtext":[{"score":{"name":"${box_with_input.value}","objective":"${box_with_input2.value}"}}]}}]}`;
        }
    }
    else {
        return `{"rawtext":[{"${box_lang.checked ? "translate" : "text"}":"${box.value}"}]}`;
    }
    return `{"rawtext":[{"translate":"rasa.test","with":{"rawtext":[{"selector":"@a"}]}}]}`
}

generate_plain_rawtext = () => {
    return generate_single_rawtext(1);
}
generate_announcement_rawtext = () => {
    return `{"rawtext":[{"translate":"chat.type.announcement","with":{"rawtext":[${generate_single_rawtext(1)},${generate_single_rawtext(2)}]}}]}`;
}
generate_say_rawtext = () => {
    return `{"rawtext":[{"translate":"chat.type.text","with":{"rawtext":[${generate_single_rawtext(1)},${generate_single_rawtext(2)}]}}]}`;}
generate_sign_rawtext = () => {
    return `{"rawtext":[{"translate":"%%s\\n%%s\\n%%s\\n%%s","with":{"rawtext":[${generate_single_rawtext(1)},${generate_single_rawtext(2)},${generate_single_rawtext(3)},${generate_single_rawtext(4)}]}}]}`;
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