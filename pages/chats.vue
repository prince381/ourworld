<template>
    <div class="chats">
        <div class="chats-content">
            <div class="sidebar">
                <div class="sidebar-content">
                    <div class="title-wrapper">
                        <img src="~/assets/img/chat.png" alt="app image" class="app-img" width="70" height="70">
                        <h3 class="sidebar-title"><span class="big">O</span>ur<span class="big">W</span>orld</h3>
                    </div>
                    <div class="user-container">
                        <div class="container-content">
                            <div class="usr-img-wrapper">
                                <img :src="user.photo" alt="user image" v-if="user.photo">
                                <img src="~/assets/img/placeholder.png" alt="placeholder image" v-if="!user.photo">
                                <div class="status"></div>
                            </div>
                            <h3 class="usrname">{{ user.name }}</h3>
                            <p class="usrmail">{{ user.profession }}</p>
                            <p class="usr-country">{{ user.country }}</p>
                        </div>
                    </div>
                    <div class="active-users">
                        <div class="active-title-wrapper">
                            <h3 class="active-title">Active users <span class="act-usr">{{ users.length }}</span></h3>
                            <button class="to-chats">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div class="active-cover">
                            <ul class="active-list">
                                <li class="active-usr" v-for="(usr, indx) in users" :key="indx" @click="showUser(usr)">
                                    <div class="user-flex">
                                        <div class="avatar">
                                            <img :src="usr.photo" alt="user avatar" v-if="usr.photo">
                                            <img src="~/assets/img/placeholder.png" alt="placeholder image" v-if="!usr.photo">
                                        </div>
                                        <div class="usr-details">
                                            <div class="person-det">
                                                <h1 class="person-name">{{ usr.name }}</h1>
                                                <p class="person-country">{{ usr.country }}</p>
                                            </div>
                                            <button class="view" @click="showUser(usr)">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button class="logout">
                        signout <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
            <div class="middle-content">
                <div class="middle-content-wrapper">
                    <div class="message-box">
                        <div class="messages">
                            <div class="cnt-wrapper">
                                <div class="period-container" v-for="(val,key) in messages" :key="key">
                                    <div class="period-indicator">
                                        <span class="period">{{ val[0].date }}</span>
                                    </div>
                                    <ul class="msg-list">
                                        <li :class="{msg_item: true, by_user: byUser(message.sender_id)}" v-for="message in val" :key="message.key" :data-id="message.sender_id">
                                            <div class="msg-wrapper">
                                                <div class="sender-img">
                                                    <div class="sender-img-wrapper">
                                                        <img :src="message.sender_img" alt="user avatar" v-if="message.sender_img">
                                                        <img src="~/assets/img/placeholder.png" alt="placeholder image" v-if="!message.sender_img">
                                                    </div>
                                                    <div class="isonline" v-if="isOnline(message.sender_id)"></div>
                                                </div>
                                                <div class="read-msg">
                                                    <p class="msg-sndr">{{ message.sender_name }}</p>
                                                    <p class="msg-content" v-html="message.message"></p>
                                                    <p class="msg-time">{{ message.time }}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- <div class="scroll-end"></div> -->
                        </div>
                    </div>
                    <div class="type-send">
                        <div class="type-send-wrap">
                            <span class="img-icon">
                                <i class="fas fa-image"></i>
                            </span>
                            <span class="emoji-icon" @click="toggleEmojis">
                                <i class="fas fa-smile"></i>
                            </span>
                            <div id="msg">
                                <iframe name="messageBox" frameborder="0"></iframe>
                                <p class="placeholder">type message here...</p>
                            </div>
                            <button class="send-msg" @click="sendMsg">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                    <div class="emojis">
                        <div class="emojis-wrapper">
                            <ul class="emoji-list">
                                <li class="emj" v-for="(emj,idx) in emojis" :key="idx" v-html="emj" @click="addEmoji(emj)"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-view" @click="hideView">
                <div class="view-content">
                    <div class="view-wrapper">
                        <img :src="userView.photo" alt="cover image" class="cover-img" v-if="userView.photo">
                        <img src="~/assets/img/placeholder.png" alt="cover image" class="cover-img" v-if="!userView.photo">
                        <div class="view-img-wrapper">
                            <img :src="userView.photo" alt="user photo" v-if="userView.photo">
                            <img src="~/assets/img/placeholder.png" alt="user photo" v-if="!userView.photo">
                        </div>
                        <h1 class="view-name">{{ userView.name }}</h1>
                        <p class="view-job">{{ userView.profession }}</p>
                        <p class="view-location">
                            <i class="fas fa-map-marker-alt"></i> {{ userView.country }}
                        </p>
                        <a :href="'mailto:' + userView.email" class="view-mail">
                            <i class="fas fa-envelope"></i> {{ userView.email }}
                        </a>
                        <p class="view-desc">{{ userView.desc }}</p>
                        <div class="call-to-action">
                            <button class="vid-call">
                                <i class="fas fa-video"></i>
                            </button>
                            <button class="close-view" @click="closeView">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        <div class="call-request">
            <div class="request-content">
                <div class="request">
                    <h3 class="request-title">Call request</h3>
                    <p class="request-msg">{{ remoteUserName }} wants to have a video chat with you.</p>
                    <div class="request-btns">
                        <button class="cancel">reject</button>
                        <button class="accept">join</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db, storage } from '~/services/firebase'
import $ from 'jquery'

export default {
    async asyncData() {
        let icons = [];
        await fetch('https://raw.githubusercontent.com/prince381/emoji/main/emojis.json').then(res => res.json())
        .then(data => {
            let emjs = data.emojis;
            for (let i = emjs.length - 1; i >= 0; i--) {
                icons.push(emjs[i])
            }
        })
        return {
            emojis: icons
        }
    },
    data() {
        return {
            msg: '',
            readyMsg: '',
            emojis: {},
            messages: {},
            users: [],
            user: {},
            userView: {},
            callTo: {},
            callWaiting: true,
            userId: this.$store.state.auth.user.uid,
            remoteOffer: null,
            remoteUserName: ''
        }
    },
    methods: {
        showUser(user) {
            this.userView = user;
            let view = document.querySelector('.user-view');
            view.style.display = 'flex';
        },
        hideView(e) {
            let view = document.querySelector('.user-view');
            let wrapper = document.querySelector('.view-wrapper');
            if (!wrapper.contains(e.target)) {
                view.style.display = 'none';
            }
        },
        closeView() {
            let view = document.querySelector('.user-view');
            view.style.display = 'none';
        },
        codeDate(val) {
            let dt = new Date(val);
            let dateStr = dt.toDateString();
            let strCode = dateStr.split(' ').slice(1).join('_');
            let time = dt.toTimeString().split(' ')[0].slice(0,-3);
            return {keyCode: strCode, date: dateStr, time: time}
        },
        stripSpace(html) {
            let word = html.toString().replace(/&nbsp;/ig, ' ');
            return word;
        },
        sendMsg() {
            let content = messageBox.document.body.textContent;
            if (content.trim(' ') == '') return;
            
            let dateObject = this.codeDate(Date.now());
            let uuid = this.user.uid;
            let name = this.user.name;
            let photo = this.user.photo;
            let msgObject = {
                sender_id: uuid,
                sender_name: name,
                sender_img: photo,
                message: content,
                ...dateObject
            };

            db.ref('chats').push().set(msgObject)
            .then(() => {
                messageBox.document.body.textContent = '';
            })
        },
        isOnline(uid) {
            let usr = this.users.find(obj => obj.uid === uid);
            if (usr) {
                return true
            } else {
                return false
            }
        },
        byUser(id) {
            return id === this.user.uid;
        },
        scrollToEnd() {
            let msgBox = document.querySelector('.message-box');
            setTimeout(() => {
                let subNodes = document.querySelectorAll('.msg_item');
                if (subNodes) {
                    let lastNode = subNodes[subNodes.length - 1];
                    let ht = lastNode.getBoundingClientRect().bottom;
                    msgBox.scrollBy(0,ht)
                }
            }, 1000);
        },
        addEmoji(emj) {
            let ml = messageBox.document.body.textContent + emj;
            messageBox.document.body.innerHTML = ml;
        },
        toggleEmojis() {
            let emojis = document.querySelector('.emojis');
            emojis.classList.toggle('active');
        }
    },
    mounted() {
        const self = this;
        let socket = new WebSocket('wss://ourworld-signaling-server.herokuapp.com/');
        // let socket = new WebSocket('ws://localhost:9000');
        window.conn = socket;
        let callPeer, answerPeer, localStream, remoteStream;
        const room = document.querySelector('.stream-ground');
        const video = document.getElementById('local-video');
        const remoteVideo = document.getElementById('remote-video');
        const placeholder = document.querySelector('.placeholder');
        messageBox.document.designMode = 'On';
        let head = messageBox.document.querySelector('head'); 
        head.innerHTML = `
        <style>
            body {
                scrollbar-color: rgba(255,255,255,.3) #2d2d2d;
                scrollbar-width: thin;
                margin: 0;
                padding: 5px;
                color: #eee;
                word-wrap: break-word;
            }

            body::-webkit-scrollbar {
                width: 7px;
            }

            body::-webkit-scrollbar-track {
                background: none;
            }

            body::-webkit-scrollbar-thumb {
                width: 100%;
                border-radius: 1rem;
                background: rgba(255, 255, 255, 0.1);
            }

            body::-webkit-scrollbar-thumb:hover {
                background: rgba(255,255,255,.5);
            }
        </style>
        `

        function hidePlaceholder() {
            let content = messageBox.document.body.textContent;
            if (content && content.trim(' ') !== '') {
                placeholder.style.opacity = '0';
            } else {
                placeholder.style.opacity = '1';
            }

            window.requestAnimationFrame(hidePlaceholder)
        }

        hidePlaceholder()

        window.addEventListener('click',(e) => {
            let elClass = Array.from(e.target.classList);
            let emojis = document.querySelector('.emojis');
            
            if (elClass.includes('emj') || elClass.includes('fa-smile') || emojis.contains(e.target)) {
                return;
            } else {
                emojis.classList.remove('active');
            }
        })

        var config = {
            iceServers: [
                {
                    "urls": [
                        "stun:stun.l.google.com:19302",
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302"
                    ]
                }
            ]
        }

        db.ref(`users/${this.userId}`).once('value').then(snapshot => {
            let data = snapshot.val();
            this.user = {uid: this.userId, engaged: false, ...data};
            socket.send(JSON.stringify(this.user))
        })

        socket.onmessage = (ev) => {
            let msg = JSON.parse(ev.data);

            if (msg.type == 'user_action') {

                let activeUsers = [];
                msg.users.forEach(usr => {
                  if (usr.uid !== this.user.uid) {
                      activeUsers.push(usr)
                  }
                })
                this.users = activeUsers;
                let notificatoin = `${msg.name} has ${msg.action} the chat!`;
                console.log(notificatoin)

            }
        }

        db.ref(`call_bucket/${this.userId}`).on('value', snapshot => {
            let data = snapshot.val();
            switch(data.type) {
                case 'offer':
                    this.remoteOffer = data;
                    this.remoteUserName = data.contactName;
                    const modal = document.querySelector('.call-request');
                    const content = document.querySelector('.chats-content');
                    modal.classList.add('incoming');
                    content.classList.add('cloud');
                    break;
                case 'answer':
                    let remoteSdp = new RTCSessionDescription(JSON.parse(data.sdp));
                    let remoteCandidate = new RTCIceCandidate(JSON.parse(data.candidate));
                    callPeer.setRemoteDescription(remoteSdp);
                    callPeer.addIceCandidate(remoteCandidate);
                    console.log(data)
                    break;
                case 'rejected':
                    video.src = null;
                    remoteVideo.src = null;
                    room.style.display = 'none';

                    for (let track of localStream.getTracks()) {
                        track.stop()
                    }

                    callPeer.close();
                    callPeer = null;
                    self.callWaiting = true;
                    clearCallHistory(self.user.uid,self.callTo.uid);
                    break;
                case 'aborted':
                    const alertModal = document.querySelector('.call-request');
                    const msgContent = document.querySelector('.chats-content');
                    alertModal.classList.remove('incoming');
                    msgContent.classList.remove('cloud')
                default:
                    console.log(data)
                    break;
            }
        })

        function isEngaged(user) {
            return new Promise((resolve, reject) => {
                db.ref(`call_bucket/${user}`).once('value')
                .then(snapshot => {
                    let data = snapshot.val();
                    resolve(data.engaged)
                })
            })
        }

        function gatherCandidates(peer) {
            return new Promise((resolve, reject) => {
                let cddt;

                peer.onicecandidate = (e) => {
                    let candidate = e.candidate;
                    if (candidate && candidate.candidate) {
                        cddt = candidate;
                    }
                }

                peer.onicegatheringstatechange = (e) => {
                    let state = peer.iceGatheringState;
                    if (state == 'complete') {
                        resolve(cddt)
                    }
                }
            })
        }

        function clearCallHistory(user1,user2,setType='none') {
            db.ref(`call_bucket/${user1}`).update({
                "type": setType,
                "contactName": '',
                "contactId": '',
                "sdp": '',
                "candidate": '',
                "engaged": false
            })
            .then(_ => {
                db.ref(`call_bucket/${user2}`).update({
                    "type": setType,
                    "contactName": '',
                    "contactId": '',
                    "sdp": '',
                    "candidate": '',
                    "engaged": false
                })
            })
        }

        let callBtn = document.querySelector('.vid-call');
        callBtn.addEventListener('click', async () => {
            let uuid = self.userView.uid;
            self.callTo = self.userView;
            let constraints = { audio: true, video: { width: 1280, height: 720 } };
            let engaged = await isEngaged(uuid);

            if (engaged) {
                alert('User already engaged!')
                return;
            }
            
            // Start video stream
            room.style.display = 'block';
            navigator.mediaDevices.getUserMedia(constraints)
            .then(mediaStream => {
                localStream = mediaStream;
                video.srcObject = localStream;
                video.onloadedmetadata = function(e) {
                    video.play()
                }
                // Create a peer connection
                callPeer = new RTCPeerConnection(config);
                for (let track of localStream.getTracks()) {
                    callPeer.addTrack(track, localStream);
                }

                let callOffer;
                // Create an offer with ice candidates
                callPeer.createOffer().then(offer => {
                    callOffer = offer;
                    // set local description
                    return callPeer.setLocalDescription(offer)
                }).then(() => {
                    // Gather ice candidates
                    gatherCandidates(callPeer).then(candidate => {
                        const offer = {
                            sdp: callOffer.sdp,
                            type: callOffer.type
                        }
                        // Send offer and candidates to the remote peer
                        db.ref(`call_bucket/${self.user.uid}`).update({
                            "engaged": true
                        })
                        .then(_ => {
                            db.ref(`call_bucket/${uuid}`).update({
                                "type": 'offer',
                                "contactName": self.user.name,
                                "contactId": self.user.uid,
                                "sdp": JSON.stringify(offer),
                                "candidate": JSON.stringify(candidate),
                                "engaged": true
                            })
                            .then(_ => {
                                console.log('sent!')
                            })
                        })
                    })
                })

                callPeer.ontrack = (ev) => {
                    self.callWaiting = false;
                    if (ev.streams && ev.streams[0]) {
                        remoteVideo.srcObject = ev.streams[0];
                    } else {
                        if (!remoteStream) {
                            remoteStream = new MediaStream();
                            remoteVideo.srcObject = remoteStream;
                        }
                        remoteStream.addTrack(ev.track);
                        remoteVideo.srcObject = remoteStream;
                    }
                }

                callPeer.onconnectionstatechange = () => {
                    if (callPeer.connectionState == 'closed') {
                        for (let track of localStream.getTracks()) {
                            track.stop()
                        }
                        video.src = null;
                        remoteVideo.src = null;
                        room.style.display = 'none';
                        callPeer.close();
                        callPeer = null;
                        self.callWaiting = true;

                        clearCallHistory(self.user.uid, uuid, 'aborted')
                    }
                }

                let endCall = document.querySelector('.stream-end');
                // End video stream when button is clicked.
                endCall.addEventListener('click',() => {
                    for (let track of localStream.getTracks()) {
                        track.stop()
                    }
                    video.src = null;
                    room.style.display = 'none';

                    if (callPeer) {
                        callPeer.close()
                        callPeer = null;
                    }

                    if (answerPeer) {
                        answerPeer.close()
                        answerPeer = null;
                    }

                    localStream = null;
                    self.callWaiting = true;
                    clearCallHistory(self.user.uid, uuid, 'aborted')
                })

            }).catch(err => {
                console.log(err)
            })
        })

        // Reject incoming video call
        const rejectBtn = document.querySelector('.cancel');
        rejectBtn.addEventListener('click', () => {
            let modal = document.querySelector('.call-request');
            let content = document.querySelector('.chats-content');
            modal.classList.remove('incoming');
            content.classList.remove('cloud');
            db.ref(`call_bucket/${self.remoteOffer.contactId}`).update({
                'type': 'rejected'
            })
        })

        // Accept incoming video call
        const acceptCall = document.querySelector('.accept');
        acceptCall.addEventListener('click', (e) => {
            let modal = document.querySelector('.call-request');
            let content = document.querySelector('.chats-content');
            modal.classList.remove('incoming');
            content.classList.remove('cloud');

            room.style.display = 'block';
            let constraints = { audio: true, video: { width: 1280, height: 720 } };
            // { width: 1280, height: 720 }

            navigator.mediaDevices.getUserMedia(constraints)
            .then(mediaStream => {
                localStream = mediaStream;
                video.srcObject = localStream;
                video.onloadedmetadata = () => {
                    video.play()
                }

                answerPeer = new RTCPeerConnection(config);
                for (let track of localStream.getTracks()) {
                    answerPeer.addTrack(track, localStream)
                }

                const desc = self.remoteOffer.sdp;
                const candt = self.remoteOffer.candidate
                const callerSdp = new RTCSessionDescription(JSON.parse(desc));
                const callerCndt = new RTCIceCandidate(JSON.parse(candt));
                answerPeer.setRemoteDescription(callerSdp);
                answerPeer.addIceCandidate(callerCndt);

                let myAnswer;
                // Create an offer with ice candidates
                answerPeer.createAnswer().then(ans => {
                    myAnswer = ans;
                    // set local description
                    return answerPeer.setLocalDescription(ans)
                }).then(() => {
                    // Gather ice candidates
                    gatherCandidates(answerPeer).then(candidate => {
                        const answer = {
                            sdp: myAnswer.sdp,
                            type: myAnswer.type
                        }
                        // Send sdp and candidates to the remote peer
                        db.ref(`call_bucket/${self.user.uid}`).update({
                            "engaged": true
                        })
                        .then(_ => {
                            db.ref(`call_bucket/${self.remoteOffer.contactId}`).update({
                                "type": 'answer',
                                "contactName": self.user.name,
                                "contactId": self.user.uid,
                                "sdp": JSON.stringify(answer),
                                "candidate": JSON.stringify(candidate),
                                "engaged": true
                            })
                            .then(_ => {
                                console.log('answer sent!')
                            })
                        })
                    })
                })

                answerPeer.ontrack = (ev) => {
                    self.callWaiting = false;
                    if (ev.streams && ev.streams[0]) {
                        remoteVideo.srcObject = ev.streams[0];
                    } else {
                        if (!remoteStream) {
                            remoteStream = new MediaStream();
                            remoteVideo.srcObject = remoteStream;
                        }
                        remoteStream.addTrack(ev.track);
                        remoteVideo.srcObject = remoteStream;
                    }
                }

                answerPeer.onconnectionstatechange = () => {
                    if (answerPeer.connectionState == 'closed') {
                        for (let track of localStream.getTracks()) {
                            track.stop()
                        }
                        video.src = null;
                        remoteVideo.src = null;
                        room.style.display = 'none';
                        answerPeer.close();
                        answerPeer = null;
                        self.callWaiting = true;
                        clearCallHistory(self.user.uid, self.remoteOffer.contactId, 'aborted')
                    }
                }

                let endCall = document.querySelector('.stream-end');
                // End video stream when button is clicked.
                endCall.addEventListener('click',() => {
                    for (let track of localStream.getTracks()) {
                        track.stop()
                    }
                    video.src = null;
                    room.style.display = 'none';

                    if (callPeer) {
                        callPeer.close()
                        callPeer = null;
                    }

                    if (answerPeer) {
                        answerPeer.close()
                        answerPeer = null;
                    }

                    localStream = null;
                    self.callWaiting = true;
                    clearCallHistory(self.user.uid, self.remoteOffer.contactId, 'aborted')
                })

            }).catch(err => {
                console.log(err)
            })
        })

        function transformData(data) {
            return new Promise((resolve, reject) => {
                let dataArray = [];
                for (let key in data) {
                    dataArray.push({key: key, ...data[key]})
                }

                let chats = dataArray.reduce((transformed, currentVal) => {
                    if (!transformed[currentVal.keyCode]) {
                        transformed[currentVal.keyCode] = [];
                    }
                    transformed[currentVal.keyCode].push(currentVal)
                    return transformed
                },{})
                resolve(chats);
            })
        }

        db.ref(`chats`).on('value', snapshot => {
            transformData(snapshot.val()).then(data => {
                self.messages = data;
                this.scrollToEnd()
            })
            // console.log(this.messages)
        })

    }
}
</script>
