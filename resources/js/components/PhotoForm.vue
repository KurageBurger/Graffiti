<template>
  <transition name="fade">
    <div v-show="value" class="photo-form">
      <h2 class="title">投稿する画像を選択してください</h2>
      <form class="form">
        <input class="form__item" type="file">
        <div class="form__button">
          <button type="submit" class="button button--inverse">投稿</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>