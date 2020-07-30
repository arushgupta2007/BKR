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
        this.canvas_parent.classList.add("row");
        if (!this.canvas_parent) {
            console.error("Canvas Parent Not Found");
            return;
        }

        this.isDrawing = false;
        this.strokeColor = "#000000";
        this.strokeWidth = 5;
        this.pencil_eraser_offset = 20;

        this.toolbar = document.createElement("div");
        this.toolbar.setAttribute("id", canvas_parent_id + "-whiteboard-toolbar");
        this.toolbar.style.width = "100%";
        this.toolbar.style.height = "35px";
        this.toolbar.style.display = "inline-flex";
        this.toolbar.style.justifyContent = "space-around";
        this.toolbar.className = "col pr-0 mb-1";
        this.canvas_parent.appendChild(this.toolbar);

        this.colorPickerParent = document.createElement("div");
        this.colorPickerParent.setAttribute("id", canvas_parent_id + "-colorPickerParentWhiteboard");
        this.toolbar.appendChild(this.colorPickerParent);
        this.pickr = Pickr.create({
            el: '#' + canvas_parent_id + '-colorPickerParentWhiteboard',
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

        this.strokeSliderParent = document.createElement("div");
        this.strokeSliderParent.className = "whiteboard-stroke-slider-parent";
        this.strokeSliderParent.style.width = "100%";
        this.strokeSliderParent.style.position = "relative";
        this.strokeSliderParent.style.marginRight = "20px";
        this.strokeSliderParent.innerHTML = `
            <div><b> - </b></div>
            <input type="range" min="1" max="100" value="5" class="whiteboard-stroke-slider" 
                id="${this.canvas_parent_id}-whiteboard-stroke-slider">
            <div><b> + </b></div>
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

        this.saveButton = document.createElement("button");
        this.saveButton.className = "btn btn-light whiteboard-toolbar-button";
        this.saveButton.innerHTML = '<i class="fas fa-save" style="color: black"></i>';

        this.divider = document.createElement("div");
        this.divider.classList.add("w-100");
        this.canvas_parent.appendChild(this.divider);

        this.whiteboard = document.createElement("canvas");
        this.whiteboard.style.display = "inline";
        this.whiteboard.style.borderColor = "#dae0e5";
        this.whiteboard.setAttribute("id", `${this.canvas_parent_id}-canvas-whiteboard`);
        this.whiteboard.style.cursor = 'url("/static/home/images/pencil.png"), auto';
        this.onResize();
        this.canvas_parent.appendChild(this.whiteboard);

        this.commonColorParent = document.createElement("div");
        this.commonColorParent.style.display = "inline";
        this.commonColorParent.className = "col";
        this.canvas_parent.appendChild(this.commonColorParent);
        var colors = ["#f15556", "#ffd736", "#45eb6f", "#258ae6", "#ffffff", "#eeeeee", "#b1b2b6", "#000000", "#4064ad", "#532e1b"];
        colors.forEach((color, index) => {
            var color_button = document.createElement("button");
            color_button.className = "btn p-0";
            color_button.style.backgroundColor = color;
            color_button.style.borderColor = "#dae0e5";
            color_button.style.width = "20px";
            color_button.style.height = "20px";
            color_button.style.borderRadius = "50%";
            color_button.style.marginBottom = "20px";
            color_button.style.display = "block";
            color_button.addEventListener("click", () => {
                this.strokeColor = color;
                this.pickr.setColor(color);
                this.whiteboard.style.cursor = 'url("/static/home/images/pencil.png"), auto';
            });
            this.commonColorParent.appendChild(color_button);
        })

        this.pencilButton.addEventListener("click", () => {
            var color = this.pickr.getColor();
            this.strokeColor = "#" + color.toHEXA()[0] + color.toHEXA()[1] + color.toHEXA()[2];
            this.eraseButton.classList.remove("active");
            this.pencilButton.classList.add("active");
            this.whiteboard.style.cursor = 'url("/static/home/images/pencil.png"), auto';
        });

        this.eraseButton.addEventListener("click", () => {
            this.strokeColor = "#ffffff";
            this.pencilButton.classList.remove("active");
            this.eraseButton.classList.add("active");
            this.whiteboard.style.cursor = 'url("/static/home/images/eraser.png"), auto';
        });

        this.saveButton.addEventListener("click", () => {
            var filename = "BKR-Whiteboard.png";
            var element = document.createElement('a');
            element.setAttribute('href', this.whiteboard.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        })

        // this.toolbar.appendChild(this.increaseStokeSizeButton);
        // this.toolbar.appendChild(this.decreaseStokeSizeButton);
        this.toolbar.appendChild(this.strokeSliderParent);
        this.toolbar.appendChild(this.pencilButton);
        this.toolbar.appendChild(this.eraseButton);
        this.toolbar.appendChild(this.clearButton);
        this.toolbar.appendChild(this.saveButton);

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

        this.whiteboard.addEventListener("mousedown", (e) => {
            this.isDrawing = true;
            this.canvas_ctx.beginPath();
            var rect = e.target.getBoundingClientRect();
            var x_where = e.clientX - rect.left;
            var y_where = e.clientY - rect.top + this.pencil_eraser_offset;
            this.canvas_ctx.moveTo(x_where, y_where);
        })

        this.whiteboard.addEventListener("mouseup", () => {
            this.isDrawing = false;
            this.canvas_ctx.closePath();
        });

        this.whiteboard.addEventListener("mousemove", (e) => {
            if (!this.isDrawing) return;
            if (this.pickr.isOpen()) return;
            this.canvas_ctx.strokeStyle = this.strokeColor;
            this.canvas_ctx.lineWidth = this.strokeWidth;
            this.canvas_ctx.lineCap = "round";
            var rect = e.target.getBoundingClientRect();
            var x_where = e.clientX - rect.left;
            var y_where = e.clientY - rect.top + this.pencil_eraser_offset;
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
        this.whiteboard.width = 700;
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

class WhiteboardScreen {
    constructor(screen_parent_id, where_button_dropdown_id, callback_stream) {
        this.screen_parent = document.getElementById(screen_parent_id);
        this.where_button_dropdown = document.getElementById(where_button_dropdown_id);
        this.callback_stream = callback_stream;

        this.screen_dropdown_parent = document.createElement("div");
        this.screen_dropdown_parent.className = "dropdown";

        this.screen_dropdown = document.createElement("button");
        this.screen_dropdown.className = "btn btn-light dropdown-toggle";
        this.screen_dropdown.setAttribute("data-toggle", "dropdown");
        this.screen_dropdown.innerText = "Worksheet 1";
        this.screen_dropdown.style.zIndex = "10000";

        this.screen_dropdown_list = document.createElement("div");
        this.screen_dropdown_list.className = "dropdown-menu";
        this.screen_dropdown_list.style.zIndex = "10000";

        this.screen_dropdown_parent.appendChild(this.screen_dropdown);
        this.screen_dropdown_parent.appendChild(this.screen_dropdown_list);

        this.screen_list = [];

        for (var i = 0; i < 5; i++) {
            var whiteboard_no = i + 1;
            var screen = document.createElement("div");
            screen.className = "canvas-container";
            screen.setAttribute("id", `whiteboard-screen-${whiteboard_no}`);
            this.screen_parent.appendChild(screen);
            var whiteboard_instance = new Whiteboard(`whiteboard-screen-${whiteboard_no}`);
            this.screen_list.push(whiteboard_instance);
            var dropdown_button = document.createElement("button");
            dropdown_button.className = "dropdown-item";
            dropdown_button.innerText = `Worksheet ${whiteboard_no}`;
            var to_append = {whiteboard_instance: whiteboard_instance, dropdown_button: dropdown_button};
            this.screen_list.push(to_append);
            if (i === 0) {
                $(dropdown_button).click(() => {
                    this.showWhiteboard(1);
                })
            } else if (i === 1) {
                $(dropdown_button).click(() => {
                    this.showWhiteboard(2);
                })
            } else if (i === 2) {
                $(dropdown_button).click(() => {
                    this.showWhiteboard(3);
                })
            } else if (i === 3) {
                $(dropdown_button).click(() => {
                    this.showWhiteboard(4);
                })
            } else if (i === 4) {
                $(dropdown_button).click(() => {
                    this.showWhiteboard(5);
                })
            }
            this.screen_dropdown_list.appendChild(dropdown_button);
        }

        this.where_button_dropdown.appendChild(this.screen_dropdown_parent);
    }

    showWhiteboard(whiteboard_no) {
        $(".canvas-container").hide();
        $("#whiteboard-screen-" + whiteboard_no).show();
        var canvas_stream = document.getElementById(`whiteboard-screen-${whiteboard_no}-canvas-whiteboard`)
                            .captureStream(30).getVideoTracks()[0];
        if (this.callback_stream) {
            this.callback_stream(canvas_stream);
        } else {
            console.log("No Callback");
        }
        this.screen_dropdown.innerText = "Worksheet " + whiteboard_no;
    }
}