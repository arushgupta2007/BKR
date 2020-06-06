class ButtonGroupControlUser {
    constructor (nodeId, where) {
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

        this.button_list.appendChild(this.private_chat);
        this.button_list.appendChild(this.video_toggle);
        this.button_list.appendChild(this.voice_toggle);
        this.button_list.appendChild(this.drop_call);
    }

    addChatListner(function_to_run) {
        this.private_chat.addEventListener('click', function_to_run);
    }

    addVideoListner (function_to_run) {
        this.video_toggle.addEventListener('click', function_to_run);
    }

    addVoiceListner (function_to_run) {
        this.voice_toggle.addEventListener('click', function_to_run);
    }

    addDropListner (function_to_run) {
        this.drop_call.addEventListener('click', function_to_run);
    }
}