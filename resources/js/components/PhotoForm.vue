<template>
  <transition name="fade">
    <div v-show="value" class="photo-form">
      <h2 class="title">投稿する画像を選択してください</h2>
      <div v-show="loading" class="panel">
        <Loader>送信しています...</Loader>
      </div>
      <form v-show="! loading" class="form" @submit.prevent="submit">
        <input class="form__item" type="file" @change="onFileChange">
        <div class="errors" v-if="errors">
          <ul v-if="errors.photo">
            <li v-for="msg in errors.photo" :key="msg">{{ msg }}</li>
          </ul>
        </div>
        <output class="form__output" v-if="preview">
          <img :src="preview" alt="">
        </output>
        <div class="form__button">
          <button type="submit" class="button button--inverse">投稿</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import { CREATED, UNPROCESSABLE_ENTITY } from '../util'
import Loader from './Loader.vue'

export default {
  components: {
    Loader
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      preview: null,
      photo: null,
      errors: null
    }
  },
  methods: {
    onFileChange (event) {
      if (event.target.files.length === 0) {
        this.reset()
        return false
      }
      if (! event.target.files[0].type.match('image.*')) {
        this.reset()
        return false
      }

      const reader = new FileReader()

      reader.onload = e => {
        this.preview = e.target.result
      }
      reader.readAsDataURL(event.target.files[0])

      this.photo = event.target.files[0]
    },
    reset () {
      this.preview = ''
      this.photo = null
      this.$el.querySelector('input[type="file"]').value = null
    },
    async submit () {
      this.loading = true

      const formData = new FormData()
      formData.append('photo', this.photo)
      const response = await axios.post('/api/photos', formData)

      this.loading = false

      if (response.status === UNPROCESSABLE_ENTITY) {
        this.errors = response.data.errors
        return false
      }

      this.reset()
      this.$emit('input', false)

      if (response.status !== CREATED) {
        this.$store.commit('error/setCode', response.status)
        return false
      }

      this.$router.push(`/photos/${response.data.id}`)

      if (response.status !== CREATED) {
        this.$store.commit('error/setCode', response.status)
        return false
      }

      this.$store.commit('message/setContent', {
        content: '新たな画像が追加されました',
        timeout: 6000
      })

      this.$router.push(`/photos/${response.data.id}`)
    }
  }
}
</script>