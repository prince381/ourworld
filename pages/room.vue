<template>
    <div class="stream-ground">
        <div class="stream-content">
            <div class="remote-stream">
                <video id="remote-video" autoplay></video>
                <div class="call-waiting" v-if="callWaiting">
                    <img :src="callTo.photo" alt="remote user" class="remote-user" v-if="callTo.photo">
                    <img src="~/assets/img/placeholder.png" alt="remote user" class="remote-user" v-if="!callTo.photo">
                </div>
            </div>
            <div class="local-stream">
                <video id="local-video" autoplay></video>
            </div>
            <div class="controls">
                <div class="mute-audio">
                    <button class="cancel-audio">
                        <i class="fas fa-microphone-slash"></i>
                    </button>
                </div>
                <div class="mute-video">
                    <button class="cancel-video">
                        <i class="fas fa-video-slash"></i>
                    </button>
                </div>
                <div class="end-stream">
                    <button class="stream-end">
                        <i class="far fa-stop-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>