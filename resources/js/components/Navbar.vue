<template>
  <nav class="navbar">
    <RouterLink class="navbar__logo" to="/">
      Graffiti
    </RouterLink>
    <div class="navbar__menu">
      <div class="navbar__item">
        <button v-if="isPost" class="button" @click="showForm = ! showForm">
          <i class="icon ion-md-add"></i>
          投稿する
        </button>
      </div>
      <span v-if="isLogin" class="navbar__item">
        {{ username }}
      </span>
      <div v-else class="navbar__item">
        <RouterLink class="button button--link" to="/login">
          ログイン / 新規登録
        </RouterLink>
      </div>
    </div>
    <PhotoForm v-model="showForm" />
  </nav>
</template>

<script>
import PhotoForm from './PhotoForm.vue'

export default {
  components: {
    PhotoForm
  },
  data () {
    return {
      showForm: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    },
    isPost () {
      return this.$store.getters['auth/check']
    },
    username() {
      return this.$store.getters['auth/username']
    }
  }
}
</script>