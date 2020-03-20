<template>
  <transition name="fade" mode="out-in">
    <div class="message" v-show="message">
      {{ message }}
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        message: state => state.message.content
      })
    }
  }
</script>