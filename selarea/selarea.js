---
---
const x1  = document.querySelector("#x1");
const y1  = document.querySelector("#y1");
const z1  = document.querySelector("#z1");
const x2  = document.querySelector("#x2");
const y2  = document.querySelector("#y2");
const z2  = document.querySelector("#z2");
const sel = document.querySelector("#selector");
const out = document.querySelector("#out");
const errors   = document.querySelector("#errors");

selarea = (x1, y1, z1, x2, y2, z2) => {
    let origin = [Math.min(x1, x2), Math.min(y1, y2), Math.min(z1, z2)];
    let delta  = [Math.abs(x1 - x2), Math.abs(y1 - y2), Math.abs(z1 - z2)];

    return sel.value + "[x=" + origin[0] + ",y=" + origin[1] + ",z=" + origin[2] + ",dx=" + delta[0] + ",dy=" + delta[1] + ",dz=" + delta[2] + "]";
}

safe_selarea = () => {
    let v_x1, v_y1, v_z1, v_x2, v_y2, v_z2;

    // Attempt to convert each input to a Number,
    // Throw an error if any input is empty or NaN
    try {
        v_x1 = (x1.value !== "") ? Number(x1.value) : Number.NaN;
        if (Number.isNaN(v_x1)) { throw "TypeError: x1 is not an integer"; }

        v_y1 = (y1.value !== "") ? Number(y1.value) : Number.NaN;
        if (Number.isNaN(v_y1)) { throw "TypeError: y1 is not an integer"; }

        v_z1 = (z1.value !== "") ? Number(z1.value) : Number.NaN;
        if (Number.isNaN(v_z1)) { throw "TypeError: z1 is not an integer"; }

        v_x2 = (x2.value !== "") ? Number(x2.value) : Number.NaN;
        if (Number.isNaN(v_x2)) { throw "TypeError: x2 is not an integer"; }

        v_y2 = (y2.value !== "") ? Number(y2.value) : Number.NaN;
        if (Number.isNaN(v_y2)) { throw "TypeError: y2 is not an integer"; }

        v_z2 = (z2.value !== "") ? Number(z2.value) : Number.NaN;
        if (Number.isNaN(v_z2)) { throw "TypeError: z2 is not an integer"; }
    }
    catch (e) {
        // Show the error in an alert
        error(e);
        return;
    }

    out.value = selarea(v_x1, v_y1, v_z1, v_x2, v_y2, v_z2);
}

error = (m) => {
    errors.innerHTML += `{% include alert.html type="alert-danger" classes="fade show" message="${m}" dismiss=true %}`;
}