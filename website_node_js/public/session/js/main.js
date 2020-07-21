class ButtonGroupControlUser {
    constructor(nodeId, where) {
        this.button_list = document.createElement("div");
        this.button_list.className = "button_list_video btn-button-group";
        this.button_list.setAttribute("id", "button-list-" + nodeId + "-" + where);

        this.private_chat = document.createElement("button");
        this.private_chat.className = "btn btn-circle btn-sm btn-button-group private-chat-desktop private-chat-" + nodeId;
        this.private_chat.setAttribute("id", "private-chat-button-" + nodeId + "-" + where);
        this.private_chat.innerHTML = '<i class="fas fa-comment-alt"></i>';

        this.video_toggle = document.createElement("button");
        this.video_toggle.className = "btn btn-primary btn-circle btn-sm btn-button-group video-toggle-dektop video-toggle-" + nodeId;
        this.video_toggle.setAttribute("id", "video-toggle-button-" + nodeId + "-" + where);
        this.video_toggle.innerHTML = '<i class="fas fa-video"></i>';

        this.voice_toggle = document.createElement("button");
        this.voice_toggle.className = "btn btn-success btn-circle btn-sm btn-button-group voice-toggle-dektop voice-toggle-" + nodeId;
        this.voice_toggle.setAttribute("id", "audio-toggle-button-" + nodeId + "-" + where);
        this.voice_toggle.innerHTML = '<i class="fas fa-microphone"></i>';

        this.drop_call = document.createElement("button");
        this.drop_call.className = "btn btn-danger btn-circle btn-sm btn-button-group drop-call-desktop drop-call-" + nodeId;
        this.drop_call.setAttribute("id", "drop-call-button-" + nodeId + "-" + where);
        this.drop_call.innerHTML = '<i class="fas fa-phone" style="transform: rotate(-135deg);"></i>';

        this.full_screen = document.createElement("button");
        this.full_screen.className = "btn btn-light btn-circle btn-sm btn-button-group full-screen-desktop full-screen-" + nodeId;
        this.full_screen.setAttribute("id", "full-screen-" + nodeId + "-" + where);
        this.full_screen.innerHTML = '<i class="fas fa-expand black-icon"></i>';

        if (where === 'part') {
            this.private_chat.className += " small-font-and-size-button";
            this.video_toggle.className += " small-font-and-size-button";
            this.voice_toggle.className += " small-font-and-size-button";
            this.drop_call.className += " small-font-and-size-button";
            this.full_screen.className += " small-font-and-size-button";
        }

        this.button_list.appendChild(this.private_chat);
        this.button_list.appendChild(this.video_toggle);
        this.button_list.appendChild(this.voice_toggle);
        this.button_list.appendChild(this.drop_call);
        if (where !== 'part') {
            this.button_list.appendChild(this.full_screen);
        }
    }

    addChatListner(function_to_run) {
        this.private_chat.addEventListener('click', function_to_run);
    }

    addVideoListner(function_to_run) {
        this.video_toggle.addEventListener('click', function_to_run);
    }

    addVoiceListner(function_to_run) {
        this.voice_toggle.addEventListener('click', function_to_run);
    }

    addDropListner(function_to_run) {
        this.drop_call.addEventListener('click', function_to_run);
    }

    addFullScreenListner(function_to_run) {
        this.full_screen.addEventListener('click', function_to_run);
    }
}

class Whiteboard {
    constructor(canvas_parent_id) {
        this.canvas_parent_id = canvas_parent_id
        this.canvas_parent = document.getElementById(canvas_parent_id);
        if (!this.canvas_parent) {
            console.error("Canvas Parent Not Found");
            return;
        }

        this.isDrawing = false;
        this.strokeColor = "#000000";
        this.strokeWidth = 5;

        this.toolbar = document.createElement("div");
        this.toolbar.setAttribute("id", "whiteboard-toolbar");
        this.toolbar.style.width = "100%";
        this.toolbar.style.display = "inline-flex";
        this.toolbar.style.justifyContent = "space-around";
        this.canvas_parent.appendChild(this.toolbar);

        this.colorPickerParent = document.createElement("div");
        this.colorPickerParent.setAttribute("id", "colorPickerParentWhiteboard");
        this.toolbar.appendChild(this.colorPickerParent);
        this.pickr = Pickr.create({
            el: '#colorPickerParentWhiteboard',
            theme: 'classic',
            default: '#000000',
            defaultRepresentation: 'HEX',
            position: 'top-middle',
            swatches: [
                'rgb(244, 67, 54)',
                'rgb(233, 30, 99)',
                'rgb(156, 39, 176)',
                'rgb(103, 58, 183)',
                'rgb(63, 81, 181)',
                'rgb(33, 150, 243)',
                'rgb(3, 169, 244)',
                'rgb(0, 188, 212)',
                'rgb(0, 150, 136)',
                'rgb(76, 175, 80)',
                'rgb(139, 195, 74)',
                'rgb(205, 220, 57)',
                'rgb(255, 235, 59)',
                'rgb(255, 193, 7,)'
            ],
            components: {
                // Main components
                preview: true,
                opacity: false,
                hue: true,

                // Input / output Options
                interaction: {
                    hex: true,
                    rgba: false,
                    hsla: false,
                    hsva: false,
                    cmyk: false,
                    input: true,
                    clear: false,
                    save: true
                }
            }
        });
        // this.increaseStokeSizeButton = document.createElement("button");
        // this.increaseStokeSizeButton.className = "btn btn-light whiteboard-toolbar-button";
        // this.increaseStokeSizeButton.innerHTML = "+";
        // this.increaseStokeSizeButton.addEventListener("click",  () => {this.increaseStokeSize()});

        // this.decreaseStokeSizeButton = document.createElement("button");
        // this.decreaseStokeSizeButton.className = "btn btn-light whiteboard-toolbar-button";
        // this.decreaseStokeSizeButton.innerHTML = "-";
        // this.decreaseStokeSizeButton.addEventListener("click", () => {this.decreaseStokeSize()});

        this.strokeSliderParent = document.createElement("div");
        this.strokeSliderParent.className = "whiteboard-stroke-slider-parent";
        this.strokeSliderParent.style.width = "100%";
        this.strokeSliderParent.style.position = "relative";
        this.strokeSliderParent.innerHTML = `
            <div><b> - </b></div>
            <input type="range" min="1" max="100" value="5" class="whiteboard-stroke-slider" 
                id="${this.canvas_parent_id}-whiteboard-stroke-slider">
            <div><b> + </b></div>"
        `;


        this.pencilButton = document.createElement("button");
        this.pencilButton.className = "btn btn-light active whiteboard-toolbar-button";
        this.pencilButton.innerHTML = '<i class="fas fa-pencil-alt" style="color: black;"></i>';
        
        this.eraseButton = document.createElement("button");
        this.eraseButton.className = "btn btn-light whiteboard-toolbar-button";
        this.eraseButton.innerHTML = '<i class="fas fa-eraser" style="color: black;"></i>';

        this.clearButton = document.createElement("button");
        this.clearButton.className = "btn btn-light whiteboard-toolbar-button";
        this.clearButton.innerHTML = '<i class="fas fa-trash" style="color: black;"></i>';

        this.whiteboard = document.createElement("canvas");
        this.whiteboard.setAttribute("id", "canvas-whiteboard");
        this.onResize();
        this.canvas_parent.appendChild(this.whiteboard);

        this.pencilButton.addEventListener("click", () => {
            var color = this.pickr.getColor();
            this.strokeColor = "#" + color.toHEXA()[0] + color.toHEXA()[1] + color.toHEXA()[2];
            this.eraseButton.classList.remove("active");
            this.pencilButton.classList.add("active");
        });

        this.eraseButton.addEventListener("click", () => {
            this.strokeColor = "#ffffff";
            this.pencilButton.classList.remove("active");
            this.eraseButton.classList.add("active");
        });

        // this.toolbar.appendChild(this.increaseStokeSizeButton);
        // this.toolbar.appendChild(this.decreaseStokeSizeButton);
        this.toolbar.appendChild(this.strokeSliderParent);
        this.toolbar.appendChild(this.pencilButton);
        this.toolbar.appendChild(this.eraseButton);
        this.toolbar.appendChild(this.clearButton);

        this.pickr.on("save", (color) => {
            this.strokeColor = "#" + color.toHEXA()[0] + color.toHEXA()[1] + color.toHEXA()[2];
            this.eraseButton.classList.remove("active");
            this.pencilButton.classList.add("active");
        });

        this.onResize();
        this.canvas_ctx = this.whiteboard.getContext("2d");
        this.canvas_ctx.fillStyle = "#ffffff";
        this.canvas_ctx.fillRect(0, 0, this.whiteboard.width, this.whiteboard.height);

        this.clearButton.addEventListener("click", () => {
            this.canvas_ctx.fillStyle = "#ffffff";
            this.canvas_ctx.fillRect(0, 0, this.whiteboard.width, this.whiteboard.height);
        });

        var strokeSlider = document.getElementById(this.canvas_parent_id + "-whiteboard-stroke-slider");
        strokeSlider.oninput = () => {
            this.strokeWidth = strokeSlider.value;
        }

        window.addEventListener("mousedown", (e) => {
            this.isDrawing = true;
            this.canvas_ctx.beginPath();
            var rect = e.target.getBoundingClientRect();
            var x_where = e.clientX - rect.left;
            var y_where = e.clientY - rect.top;
            this.canvas_ctx.moveTo(x_where, y_where);
        })

        window.addEventListener("mouseup", () => {
            this.isDrawing = false;
            this.canvas_ctx.closePath();
        });

        window.addEventListener("mousemove", (e) => {
            if (!this.isDrawing) return;
            if (this.pickr.isOpen()) return;
            this.canvas_ctx.strokeStyle = this.strokeColor;
            this.canvas_ctx.lineWidth = this.strokeWidth;
            this.canvas_ctx.lineCap = "round";
            var rect = e.target.getBoundingClientRect();
            var x_where = e.clientX - rect.left;
            var y_where = e.clientY - rect.top;
            this.canvas_ctx.lineTo(x_where, y_where);
            this.canvas_ctx.stroke();
        })
        window.addEventListener("resize", () => {
            this.onResize();
        })
    }

    onResize() {
        console.log($("#" + this.canvas_parent_id).outerHeight());
        console.log($("#whiteboard-toolbar").outerHeight());
        console.log($("#" + this.canvas_parent_id).width());
        this.whiteboard.height = 480;
        this.whiteboard.width = 640;
    }

    increaseStokeSize() {
        if (this.strokeWidth < 50) {
            this.strokeWidth++;
        }
    }
    decreaseStokeSize() {
        if (this.strokeWidth > 1) {
            this.strokeWidth--;
        }
    }
    eraseWhiteboard() {

    }
}