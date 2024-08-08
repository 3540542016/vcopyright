<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录表单 -->
        <form action="#" class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              placeholder="用户名"
              v-model="loginForm.username"
            />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            />
          </div>
          <div>
            <i class="fas fa-briefcase"></i>
            <el-radio-group v-model="loginForm.role" class="role-radio-group">
              <el-radio label="creator">内容创作者</el-radio>
              <el-radio label="holder">版权持有者</el-radio>
              <el-radio label="auditor">审核机构</el-radio>
            </el-radio-group>
          </div>
          <el-button
            type="submit"
            class="btn solid"
            icon="el-icon-s-promotion"
            @click="login"
          >
            登录
          </el-button>
        </form>

        <!-- 注册表单 -->
        <form action="#" class="sign-up-form">
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input
              type="text"
              placeholder="用户名"
              v-model="registerForm.username"
            />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              v-model="registerForm.email"
            />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              placeholder="密码"
              v-model="registerForm.password"
            />
          </div>
          <div>
            <i class="fas fa-briefcase"></i>
            <el-radio-group
              v-model="registerForm.role"
              class="role-radio-group"
            >
              <el-radio label="creator">内容创作者</el-radio>
              <el-radio label="holder">版权持有者</el-radio>
              <el-radio label="auditor">审核机构</el-radio>
            </el-radio-group>
          </div>
          <el-button
            type="submit"
            class="btn"
            icon="el-icon-s-promotion"
            @click="register"
          >
            注册
          </el-button>
        </form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p>
          <el-button
            class="btn transparent"
            id="sign-up-btn"
            @click="toggleForms"
            icon="el-icon-s-promotion"
          >
            注册
          </el-button>
        </div>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <el-button
            class="btn transparent"
            id="sign-in-btn"
            @click="toggleForms"
            icon="el-icon-s-promotion"
          >
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        role: "creator",
      },
      registerForm: {
        username: "",
        password: "",
        email: "",
        role: "creator",
      },
    };
  },
  methods: {
    toggleForms() {
      const container = document.querySelector(".container");
      container.classList.toggle("sign-up-mode");
    },
    login() {
      Axios.post("http://localhost:8080/users/login", this.loginForm)
        .then((response) => {

          console.log(response.data)

          if (response.data.code === 0){
            const userType = response.data.data.role;
            switch (userType) {
            case "creator":
              // 登录成功，跳转到 CreatorView 页面
              this.$message.success("登录成功");
              this.$router.push("/creator");
              break;
            case "holder":
              // 登录成功，跳转到 HolderView 页面
              this.$message.success("登录成功");
              this.$router.push("/holder");
              break;
            case "auditor":
              // 登录成功，跳转到 AuditorView 页面
              this.$message.success("登录成功");
              this.$router.push("/auditor");
              break;
          }
          }else if (response.data.code === -1){
            this.$message.error("用户名不存在或角色不匹配");
          }
          else if(response.data.code === -2){
            this.$message.error("密码错误");
          }

        })
        .catch((error) => {
          console.log(error);
        });
    },
    register() {
      // 处理注册逻辑
      Axios.post("http://localhost:8080/users/register", this.registerForm)
        .then((response) => {
          console.log(response.data);
          this.$message.success("注册成功");
          this.toggleForms();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
  
  <style scoped>
@import "@/assets/css/style.css";
</style>
  