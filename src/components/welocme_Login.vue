<template>
  <div class="All">
    <img src="./public/logo.png" alt="wording" style="width: 296px; height: 186px; margin-left: 625px; margin-top: 70px">
    <div style="font-size: 55px; font-weight: bold ; color: #FF5733; margin-left: 556px; margin-top: 20px">
      Welcome to KSC
    </div>
    <div style="margin-left: 740px; font-size: 25px; font-weight: bold; color: #FF5733; margin-top: 240px">
      log in
    </div>
    <img src="./public/箭头%201.png" style="width: 50px; margin-left: 750px; margin-top: 10px">
    <img src="./public/logo.png" alt="wording" style="width: 296px; height: 186px; margin-left: 625px; margin-top: 400px">
    <input class="login_Tab">
    <input class="login_Tab" style="margin-top: 30px">
    <button>
      确认
    </button>
    <div style="margin-left: 740px; font-size: 25px; font-weight: bold; color: #FF5733; margin-top: 240px">
      sign up
    </div>
    <img src="./public/箭头%201.png" style="width: 50px; margin-left: 750px; margin-top: 10px">
  </div>
</template>
<style>
  .All{
    height: 4000px;
    display: flex;
    background-color: #ffffff;
    flex-direction: column;
  }
  .login_Tab{
    display: flex;
    width: 320px;
    height: 42px;
    margin-left: 606px;
    border-radius: 10px;
    color: white;
    background-color: #FF5733;
    border: 0;
    margin-top: 55px;
    padding-left: 10px;
    font-size: 20px;
  }
  .login_Tab:focus{
    background-color: #FF5733;
    border: 0;
    outline: none;
  }
</style>

<script setup>
</script>