<template>
  <div class="index-page">
    <div class="imgwrapper">
      <img src="~/assets/img/chat.png" alt="chat image">
    </div>
    <p class="welcome">Welcome</p>
    <p class="flex">
      <span class="line"></span>
      <span class="to">to</span>
      <span class="line"></span>
    </p>
    <h1 class="title"><span class="green">O</span>ur<span class="green">W</span>orld</h1>
    <p class="intro">This is the whole world in one room.</p>
    <NuxtLink to="/join" class="join">join</NuxtLink>
    <p class="login">Already a member? <NuxtLink to="/login">Login</NuxtLink></p>
  </div>
</template>

<script>
export default {
  mounted() {
    
  }
}
</script>

