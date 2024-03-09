<template>
  <div id="b" class="All">
    <img src="./public/logo.png" alt="wording" style="width: 296px; height: 186px; margin-left: 625px; margin-top: 70px">
    <div style="font-size: 55px; font-weight: bold ; color: #FF5733; margin-left: 556px; margin-top: 20px">
      Welcome to KSC
    </div>
    <div style="margin-left: 740px; font-size: 25px; font-weight: bold; color: #FF5733; margin-top: 240px">
      log in
    </div>
    <button @click="ToLogIn" style="background-color: white; outline: none; border: none; display: flex; margin-left: 725px; ">
      <img alt="error" src="./public/箭头%201.png" style="width: 50px; margin-left: 30px; margin-top: 10px; overflow: auto">
    </button>
    <img src="./public/logo.png" alt="wording" style="width: 296px; height: 186px; margin-left: 625px; margin-top: 400px">
    <input class="login_Tab" placeholder="用户名">
    <input class="login_Tab" style="margin-top: 25px" placeholder="密码">
    <button style="width: 90px; height: 40px; margin-left: 725px; margin-top: 45px; border: none;border-radius: 25px; background-color: #FF5733;color: white; font-weight: bolder;font-size: 20px">
      确认
    </button>
    <div style="margin-left: 730px; font-size: 25px; font-weight: bold; color: #FF5733; margin-top: 120px">
      sign up
    </div>
    <button @click="ToSignUp" style="background-color: white; outline: none; border: none; display: flex; margin-left: 725px; ">
      <img alt="error" src="./public/箭头%201.png" style="width: 50px; margin-left: 30px; margin-top: 10px; overflow: auto">
    </button>
    <input class="login_Tab" placeholder="昵称" style="margin-top: 370px">
    <input class="login_Tab" placeholder="邮箱" style="margin-top: 25px">
    <input class="login_Tab" placeholder="用户名" style="margin-top: 25px">
    <input class="login_Tab" placeholder="密码" style="margin-top: 25px">
    <input class="login_Tab" placeholder="请再次输入密码" style="margin-top: 25px">
    <button style="width: 90px; height: 40px; margin-left: 725px; margin-top: 45px; border: none;border-radius: 25px; background-color: #FF5733;color: white; font-weight: bolder;font-size: 20px">
      确认
    </button>
  </div>
</template>
<style>
  .All{
    overflow: auto;
    height: 2800px;
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
  ::placeholder{
    color: rgba(255, 255, 255, 0.75);
    font-size: 20px;
  }
  button:focus{
    outline: none;
  }
</style>

<script>
  export default {
    created() {
    },
    mounted() {
    },
    methods: {
      ToLogIn(){
        window.scroll({
          top:1050,
          behavior: "smooth"
        })
      },
      ToSignUp(){
        window.scrollTo({
          top: 2000,
          behavior: "smooth"
        })
      },
    }
  }
</script>