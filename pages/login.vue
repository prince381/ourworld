<template>
    <div class="register-page">
        <div class="form-area form-login">
            <form @submit.prevent="login">
                <h3 class="form-title">Login</h3>
                <div class="input-area">
                    <label for="user-login">
                        <i class="fas fa-envelope"></i>
                    </label>
                    <input id="user-login" type="email" placeholder="Email" v-model="loginMail" required>
                </div>
                <div class="input-area">
                    <label for="login-password">
                        <i class="fas fa-lock"></i>
                    </label>
                    <input id="login-password" type="password" placeholder="Password" v-model="loginPassword" required>
                </div>
                <transition name="appear">
                    <p class="error" v-if="isErr">{{ errorMsg }}</p>
                </transition>
                <button class="submit">login</button>
                <p class="login">Or <NuxtLink to="/join">register</NuxtLink> as a new member.</p>
            </form>
        </div>
    </div>
</template>

<script>
import { db } from '~/services/firebase'

export default {
    data() {
        return {
            loginMail: '',
            loginPassword: '',
            mails: []
        }
    },
    computed: {
        isErr() {
            return this.$store.state.auth.isErr;
        },
        errorMsg() {
            return this.$store.state.auth.error;
        }
    },
    methods: {
        async login() {
            const mail = this.loginMail,
                password = this.loginPassword;

            await this.$store.dispatch('auth/login',{mail,password})

            if (!this.$store.state.auth.isErr) {
                if (!this.mails.includes(mail)) {
                    this.$router.push('/set-info')
                } else {
                    this.$router.push('/chats')
                }
            } else return;
        }
    },
    mounted() {
        db.ref(`users`).once('value').then(snapshot => {
            let data = snapshot.val();
            for (let key in data) {
                this.mails.push(data[key].email)
            }
        })
    }
}
</script>