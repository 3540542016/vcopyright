<script>

export default {
    data() {
        return {
            labelPosition: 'right',
            formLabelAlign: {
                id: '',
                title: '',
                description: ''
            }
        }
    },
    methods: {
        gouseradd() {
            const targetRoute = '/creatework';
            if (this.$route.path !== targetRoute) {
                this.$router.push(targetRoute).catch(err => {
                    if (err.name !== 'NavigationDuplicated') {
                        console.error(err);
                    }
                });
            }
        },
        gomyuser() {
            const targetRoute = '/creatormanagement';
            if (this.$route.path !== targetRoute) {
                this.$router.push(targetRoute).catch(err => {
                    if (err.name !== 'NavigationDuplicated') {
                        console.error(err);
                    }
                });
            }
        },
        gohome() {
            const targetRoute = '/creatorhome';
            if (this.$route.path !== targetRoute) {
                this.$router.push(targetRoute).catch(err => {
                    if (err.name !== 'creatorhome') {
                        console.error(err);
                    }
                });
            }
        },
        upload() {
            this.axios.post('http://localhost:8080/works/creator/show', this.formLabelAlign).then(function (resp) {
                if (resp.data.code == 0) {
                    alert("新建成功")
                } else {
                    alert("新建失败")
                }

            })
        }
    }
}
</script>


<template>
    <div>
        <!-- Header -->
        <header class="header">
            <div class="container-fluid">
                <div class="row gutters">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-9">
                        <a href="index.html" class="logo">
                            <img :src="require('@/assets/img/logo.png')" alt="Logo">
                            版权管理创作者中心平台
                        </a>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-3">
                        <ul class="header-actions">
                            <ul class="header-actions">
                                <el-dropdown>
                                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </ul>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg custom-navbar">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#royalHospitalsNavbar"
                aria-controls="royalHospitalsNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">
                    <i></i>
                    <i></i>
                    <i></i>
                </span>
            </button>
            <div class="collapse navbar-collapse" id="royalHospitalsNavbar">
                <ul class="navbar-nav">
                    <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <li class="nav-item">
                            <i class="icon-home nav-icon" @click="gohome">首页</i>
                        </li>
                    </a>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="icon-add-user nav-icon"></i>
                            作品管理
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="pagesDropdown">
                            <li @click="gomyuser">我的作品</li>
                            <li @click="gouseradd">添加作品</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="main-container">
            <div class="page-header">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active">欢迎使用社区身心健康管理元平台</li>
                </ol>
            </div>
        </div>

        <div class="content-wrapper">
            <el-radio-group v-model="labelPosition" size="small">
                <el-radio-button label="left">左对齐</el-radio-button>
                <el-radio-button label="right">右对齐</el-radio-button>
                <el-radio-button label="top">顶部对齐</el-radio-button>
            </el-radio-group>
            <div style="margin: 20px;"></div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="作品id">
                    <el-input v-model="formLabelAlign.id"></el-input>
                </el-form-item>
                <el-form-item label="作品名称">
                    <el-input v-model="formLabelAlign.title"></el-input>
                </el-form-item>
                <el-form-item label="作品介绍">
                    <el-input v-model="formLabelAlign.description"></el-input>
                </el-form-item>
                <el-button type="primary" @click="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-form>
        </div>

    </div>
</template>


<style scoped>
/* Import Bootstrap CSS */
@import "../assets/css/bootstrap.min.css";
@import "../assets/css/main.css";
@import "../assets/css/css.css";

/* Your custom styles */
.header {
    background-color: #1047eed3;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}

.header .logo img {
    max-width: 120px;
}

.header-actions .dropdown-menu {
    width: 300px;
}

.file-browser {
    margin-top: 20px;
}

.file-browser .card-body img {
    width: 100px;
    /* 修改为你需要的宽度 */
    height: auto;
    /* 保持图片的纵横比 */
    margin-right: 10px;
    /* 修改为你需要的右边距 */
    display: block;
    margin: 0 auto;
    /* 居中对齐 */
}

.navbar-nav .nav-item .nav-link {
    display: flex;
    align-items: center;
}

.navbar-nav .nav-item .nav-link:hover {
    cursor: pointer;
}

/* 首页字体加粗并居中对齐 */
.navbar-nav .nav-item .icon-home {
    color: #fff;
    font-weight: bold;
    text-align: center;
    display: block;
    font-style: normal;
}

.navbar-nav .nav-item .icon-home:hover {
    color: #1047eed3;
}

/* 鼠标悬停到“我的用户”和“添加用户”时背景颜色与“评测预约”一致 */
.navbar-nav .nav-item .dropdown-menu li:hover {
    background-color: blue;
    /* 修改为“评测预约”的背景颜色 */
}

.header-actions .el-icon-setting {
    font-size: 24px;
    /* 设置图标大小 */
    color: white;
    /* 设置图标颜色为白色 */
}
</style>
