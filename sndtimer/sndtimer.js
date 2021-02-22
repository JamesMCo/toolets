---
---
const player           = document.querySelector("#player");
const player_back      = document.querySelector("#player_back");
const player_playpause = document.querySelector("#player_playpause");
const player_forward   = document.querySelector("#player_forward");
const player_timestamp = document.querySelector("#player_timestamp");
const desc             = document.querySelector("#desc");
const markers          = document.querySelector("#markers>tbody");
let timestamp_interval = null;

handle_file_change = (event) => {
    // Called when a new file is selected in the input element
    let reader = new FileReader();

    // Read the file and convert it to base64 data:audio/...
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
        // Called when the conversion finishes

        // Initialise the player
        player.pause();
        player.currentTime = 0;
        player.src = event.target.result;
        player.load()

        player_back.classList.remove("btn-secondary");
        player_back.classList.add("btn-danger");

        player_playpause.children[0].classList.remove("bi-pause-fill");
        player_playpause.children[0].classList.add("bi-play-fill");

        if (player.duration < 0.05) {
            player_forward.classList.remove("btn-secondary");
            player_forward.classList.add("btn-danger");
        } else {
            player_forward.classList.remove("btn-danger");
            player_forward.classList.add("btn-secondary");
        }

        player_timestamp.innerHTML = "0 ticks";

        // Clear out the list of marker points
        markers.innerHTML = "";
    }
}

create_marker_point = () => {
    let ticks = Math.floor(player.currentTime * 20);
    
    let row = document.createElement("template");
    row.innerHTML =    `<tr>
                            <td>
                                <a class="btn btn-secondary" onclick="this.parentElement.parentElement.remove();"><i class="bi bi-x"></i></a>
                                <a class="btn btn-secondary" onclick="player.currentTime = this.parentElement.parentElement.children[1].innerHTML / 20; player.play();"><i class="bi bi-play-fill"></i></a>
                            </td>
                            <td>${ticks}</td>
                            <td>${desc.value}</td>
                        </tr>`;

    let inserted = false;
    for (let i = 0; i < markers.childElementCount; i++) {
        if (parseInt(markers.children[i].children[1].innerHTML) > ticks) {
            markers.insertBefore(row.content.firstChild, markers.children[i]);
            inserted = true;
            break;
        }
    }
    if (!inserted) {
        markers.appendChild(row.content.firstChild);
    }

    desc.value = "";
}


// Player Controls
update_timestamp = () => {
    player_timestamp.innerHTML = Math.floor(player.currentTime * 20) + " ticks";
}

player.ontimeupdate = () => {
    if (player.paused) {
        player_playpause.children[0].classList.remove("bi-pause-fill");
        player_playpause.children[0].classList.add("bi-play-fill");

        if (player.currentTime == 0) {
            player_back.classList.remove("btn-secondary");
            player_back.classList.add("btn-danger");
        } else {
            player_back.classList.remove("btn-danger");
            player_back.classList.add("btn-secondary");
        }
        if (player.currentTime == player.duration) {
            player_forward.classList.remove("btn-secondary");
            player_forward.classList.add("btn-danger");
        } else {
            player_forward.classList.remove("btn-danger");
            player_forward.classList.add("btn-secondary");
        }
        update_timestamp();
    } else {
        player_back.classList.remove("btn-secondary");
        player_back.classList.add("btn-danger");

        player_playpause.children[0].classList.remove("bi-play-fill");
        player_playpause.children[0].classList.add("bi-pause-fill");

        player_forward.classList.remove("btn-secondary");
        player_forward.classList.add("btn-danger");
    }
}

player.onplay = () => {
    if (timestamp_interval === null) {
        timestamp_interval = setInterval(update_timestamp, 25);
    }
}

player.onpause = () => {
    player.currentTime = Math.floor(player.currentTime * 20) / 20;
    clearInterval(timestamp_interval);
    timestamp_interval = null;
}

control_play_pause = () => {
    if (player.src === "") {
        return;
    }

    if (player.paused) {
        player.play();

        player_back.classList.remove("btn-secondary");
        player_back.classList.add("btn-danger");

        player_playpause.children[0].classList.remove("bi-play-fill");
        player_playpause.children[0].classList.add("bi-pause-fill");

        player_forward.classList.remove("btn-secondary");
        player_forward.classList.add("btn-danger");

        timestamp_interval = setInterval(update_timestamp, 25);
    } else {
        player.pause();

        if (player.currentTime != 0) {
            player_back.classList.remove("btn-danger");
            player_back.classList.add("btn-secondary");
        }

        player_playpause.children[0].classList.remove("bi-pause-fill");
        player_playpause.children[0].classList.add("bi-play-fill");

        if (player.currentTime != player.duration) {
            player_forward.classList.remove("btn-danger");
            player_forward.classList.add("btn-secondary");
        }
    }
}

control_back = () => {
    if (!player.paused) {
        return;
    }

    if (player.currentTime >= 0.05) {
        player.currentTime -= 0.05;
    }
}

control_forward = () => {
    if (!player.paused) {
        return;
    }

    if (player.currentTime <= player.duration - 0.05) {
        player.currentTime += 0.05;
    }
}