<template>
  <nav class="navbar">
    <RouterLink class="navbar__logo" to="/">
      Graffiti
    </RouterLink>
    <div class="navbar__menu">
      <div class="navbar__item">
        <button class="button">
          <i class="icon ion-md-add"></i>
          投稿する
        </button>
      </div>
      <span class="navbar__item">
        username
      </span>
      <div class="navbar__item">
        <RouterLink class="button button--link" to="/login">
          ログイン / 新規登録
        </RouterLink>
      </div>
    </div>
  </nav>
</template>