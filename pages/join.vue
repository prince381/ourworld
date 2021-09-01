<template>
    <div class="register-page">
        <div class="form-area form-register">
            <form @submit.prevent="register">
                <h3 class="form-title">Register</h3>
                <div class="input-area">
                    <label for="user">
                        <i class="fas fa-envelope"></i>
                    </label>
                    <input id="user" type="email" placeholder="Email" v-model="registerMail" required>
                </div>
                <div class="input-area">
                    <label for="password">
                        <i class="fas fa-lock"></i>
                    </label>
                    <input id="password" type="password" placeholder="Password" v-model="registerPassword" required>
                </div>
                <div class="input-area">
                    <label for="confirm">
                        <i class="fas fa-lock"></i>
                    </label>
                    <input id="confirm" type="password" placeholder="Confirm password" v-model="confirmPassword">
                </div>
                <transition name="appear">
                    <p class="error" v-if="isErr">{{ errorMsg }}</p>
                </transition>
                <button class="submit">submit</button>
                <p class="login">Or <NuxtLink to="/login">Login</NuxtLink> with an existing account.</p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                registerMail: '',
                registerPassword: '',
                confirmPassword: ''
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
            async register() {
                const mail = this.registerMail,
                    password = this.registerPassword,
                    confirmed = this.confirmPassword;

                if (password !== confirmed) {
                    this.$store.commit('auth/isError','Passwords provided do not match!')
                    return;
                }
                
                await this.$store.dispatch('auth/register',{mail,password})

                if (!this.$store.state.auth.isErr) {
                    this.$router.push('/verify')
                } else return;
            }
        }
    }
</script>