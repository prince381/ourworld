<template>
    <div class="verification">
        <div class="envelope-cover">
            <img src="~/assets/img/envelope.png" alt="envelope">
        </div>
        <h3 class="verify-title">Verify your email</h3>
        <p class="page-subtext">Almost there! We've sent you a verification email. Please check your inbox and verify your email account if you wish to join the world.</p>
        <button class="resend" @click="resend">Resend email</button>
        <p class="login">Go back to the <NuxtLink to="/login">login page</NuxtLink>.</p>
    </div>
</template>

<script>
import { auth } from '~/services/firebase'

export default {
    methods: {
        async resend(e) {
            e.target.textContent = 'sending...';
            await auth.currentUser.sendEmailVerification();
            e.target.textContent = 'email sent';

            setTimeout(() => {
                e.target.textContent = 'Resend email';
            },3000)
        }
    }
}
</script>
