<template>
  <div class="container--small">
    <ul class="tab">
      <li
        class="tab__item"
        :class="{'tab__item--active': tab === 1 }"
        @click="tab = 1"
      >ログイン</li>
      <li
        class="tab__item"
        :class="{'tab__item--active': tab === 2 }"
        @click="tab = 2"
      >新規登録</li>
    </ul>

    <div class="panel" v-show="tab === 1">
      <form class="form" @submit.prevent="login">
        <label for="login-email"></label>
        <input type="text" class="form__item" id="login-email" v-model="loginForm.email" placeholder="メールアドレス">
        <label for="login-password"></label>
        <input type="password" class="form__item" id="login-password" v-model="loginForm.password" placeholder="パスワード">

      <div v-if="loginErrors" class="errors">
        <ul v-if="loginErrors.email">
          <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
        </ul>
        <ul v-if="loginErrors.password">
          <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
        </ul>
      </div>

        <div class="form__button">
          <button type="submit" class="button button--inverse"><i class="icon ion-md-lock"></i>ログイン</button>
        </div>
      </form>
    </div>

    <div class="panel" v-show="tab === 2">
      <form class="form" @submit.prevent="register">

        <label for="username"></label>

      <input type="text" class="form__item" id="username" v-model="registerForm.name" placeholder="ニックネーム">
      <label for="email"></label>
      <input type="text" class="form__item" id="email" v-model="registerForm.email" placeholder="メールアドレス">
      <label for="password"></label>
      <input type="password" class="form__item" id="password" v-model="registerForm.password" placeholder="パスワード">
      <label for="password-confirmation"></label>
      <input type="password" class="form__item" id="password-confirmation" v-model="registerForm.password_confirmation" placeholder=パスワード(もう一度入力)>

      <div v-if="registerErrors" class="errors">
        <ul v-if="registerErrors.name">
          <li v-for="msg in registerErrors.name" :key="msg">{{ msg }}</li>
        </ul>
        <ul v-if="registerErrors.email">
          <li v-for="msg in registerErrors.email" :key="msg">{{ msg }}</li>
        </ul>
        <ul v-if="registerErrors.password">
          <li v-for="msg in registerErrors.password" :key="msg">{{ msg }}</li>
        </ul>
      </div>

      <div class="form__button">
        <button type="submit" class="button button--inverse">登録</button>
      </div>
      </form>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      tab: 1,
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  computed: mapState({
    apiStatus: state => state.auth.apiStatus,
    loginErrors: state => state.auth.loginErrorMessages,
    registerErrors: state => state.auth.registerErrorMessages
  }),

    methods: {
      async login () {
        await this.$store.dispatch('auth/login', this.loginForm)

        if (this.apiStatus) {
          this.$router.push('/')
        }
      },
      async register () {
        await this.$store.dispatch('auth/register', this.registerForm)

        if (this.apiStatus) {
          this.$router.push('/')
        }
      },
      clearError () {
      this.$store.commit('auth/setLoginErrorMessages', null)
      this.$store.commit('auth/setRegisterErrorMessages', null)
    }
    },

  created () {
    this.clearError()
  }
}
</script>