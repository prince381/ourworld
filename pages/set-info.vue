<template>
  <div class="info-page">
    <input type="file" id="photo" hidden>
    <div class="info-head">
      <img src="~/assets/img/chat.png" alt="chat image">
      <h3 class="info-title">You're almost there!</h3>
    </div>
    <div class="slide-container">
      <div class="slide-content">
        <div class="slide">
          <div class="name-input usr-info">
            <input type="text" v-model="username" placeholder="Choose a username">
          </div>
          <div class="age-country usr-info">
            <input type="text" class="country" v-model="country" placeholder="Country name">
            <div class="age">
              <label for="number">Age:</label>
              <input type="text" id="number" v-model="age">
              <div class="btns">
                <i class="fas fa-sort-up" @click="increment"></i>
                <i class="fas fa-sort-down" @click="decrement"></i>
              </div>
            </div>
          </div>
          <div class="job-input usr-info">
            <input type="text" v-model="job" placeholder="Profession">
          </div>
        </div>
        <div class="slide">
          <p class="describe">Briefly describe yourself to the world:</p>
          <textarea id="description" v-model="description" placeholder="enter your text in this box..."></textarea>
        </div>
        <div class="slide">
          <div class="upload-content">
            <div class="upload-wrapper">
              <img class="usr-img" src="~/assets/img/placeholder.png" alt="upload image placeholder">
              <i class="fas fa-camera camera-icon"></i>
            </div>
            <p class="upload-text">Upload your photo</p>
            <div class="loader" v-if="loading">
              <div class="loading"></div>
            </div>
          </div>
        </div>
        <div class="slide">
          <div class="last-slide">
            <h3 class="all-set">You're all set.</h3>
            <button class="get-started" @click="saveUser">Go</button>
            <div class="loader" v-if="saving">
              <div class="loading"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="indicators">
      <div class="indicator-wrapper">
        <button class="prev">
          <i class="fas fa-chevron-left"></i>
          back
        </button>
        <ul class="steps">
          <li class="spot"></li>
          <li class="step">1</li>
          <li class="step">2</li>
          <li class="step">3</li>
          <li class="step">4</li>
        </ul>
        <button class="next">
          next
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage } from '~/services/firebase'

export default {
  data() {
    return {
      userId: this.$store.state.auth.user.uid,
      username: '',
      job: '',
      age: 18,
      country: '',
      description: '',
      imgURL: '',
      loading: false,
      saving: false
    }
  },
  methods: {
    decrement() {
      if (this.age > 14) {
        this.age -= 1;
      } else return;
    },
    increment() {
      if (this.age < 130) {
        this.age += 1;
      } else return;
    },
    saveUser() {
      if (!this.username) {
        let autoUser = this.$store.state.auth.user.email.split('@')[0];
        this.username = autoUser;
      }

      let userInfo = {
        name: this.username,
        email: this.$store.state.auth.user.email,
        photo: this.imgURL,
        age: this.age,
        profession: this.job,
        country: this.country,
        desc: this.description
      }
      this.saving = true;
      db.ref(`users/${this.userId}`).set(userInfo).then(() => {
        this.saving = false;
        this.$router.push('/chats')
      }).catch(() => {
        alert('Could not upload user details! Please try again.')
      })
    }
  },
  mounted() {
    const self = this;
    const header = document.querySelector('.info-head');
    const slidesContainer = document.querySelector('.slide-content');
    const slides = document.querySelectorAll('.slide');
    const slideWidth = slides[0].getBoundingClientRect().width;
    const camera = document.querySelector('.camera-icon');
    const photo = document.getElementById('photo');
    const placeHolder = document.querySelector('.usr-img');
    let counter = 0;
    const prev = document.querySelector('.prev'),
          next = document.querySelector('.next'),
          indicator = document.querySelector('.spot'),
          spotWidth = indicator.getBoundingClientRect().width;

    next.addEventListener('click',() => {
      counter += 1;
      if (counter == 3) {
        next.style.opacity = '0';
        next.style.visibility = 'hidden';
        header.style.opacity = '0';
        header.style.visibility = 'hidden';
        header.style.transform = 'translateX(-2rem)';
      }
      slidesContainer.style.transition = 'transform .5s ease';
      slidesContainer.style.transform = `translateX(-${slideWidth * counter}px)`;
      indicator.style.transform = `translateX(${spotWidth * counter}px)`;
      prev.style.opacity = '1';
      prev.style.visibility = 'visible';
    })

    prev.addEventListener('click',() => {
      counter -= 1;
      if (counter == 0) {
        prev.style.opacity = '0';
        prev.style.visibility = 'hidden';
      }
      slidesContainer.style.transition = 'transform .5s ease';
      slidesContainer.style.transform = `translateX(-${slideWidth * counter}px)`;
      indicator.style.transform = `translateX(${spotWidth * counter}px)`;
      next.style.opacity = '1';
      next.style.visibility = 'visible';
      header.style.opacity = '1';
      header.style.visibility = 'visible';
      header.style.transform = 'translateX(0)';
    })

    camera.addEventListener('click',() => {
      photo.click()
    })

    photo.addEventListener('change',(e) => {
      let img = e.target.files[0];
      const typeArray = img.type.split('/');
      if (typeArray[0] != 'image') {
        alert('File chosen is not an image!')
        return;
      }
      self.loading = true;
      storage.ref(`users/${self.userId}/profile.${typeArray[1]}`).put(img)
      .then(() => {
        storage.ref(`users/${self.userId}/profile.${typeArray[1]}`)
        .getDownloadURL()
        .then(img => {
          placeHolder.src = img;
          self.imgURL = img;
          self.loading = false;
        });
      }).catch(() => {
        alert('Could not upload image. Please try again later!');
      })
    })
  }
}
</script>

