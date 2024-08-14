<script>
export default {
    data() {
        return {
            labelPosition: 'right',
            formLabelAlign: {
                id: localStorage.getItem("id"),
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
                    if (err.name !== 'NavigationDuplicated') {
                        console.error(err);
                    }
                });
            }
        },
        gouserall() {
            const createallwork = '/createallwork';
            if (this.$route.path !== createallwork) {
                this.$router.push(createallwork).catch(err => {
                    if (err.name !== 'NavigationDuplicated') {
                        console.error(err);
                    }
                });
            }
        },
        upload() {
            if (!this.formLabelAlign.title.trim()) {
                this.$message.error('请输入作品名称');
                return;
            }
            if (!this.formLabelAlign.description.trim()) {
                this.$message.error('请输入作品介绍');
                return;
            }
            this.axios.post('http://localhost:8080/works/creator/upload', this.formLabelAlign).then((resp) => {
                if (resp.data.code === 200) {
                    this.$message.success("新建成功");
                    this.formLabelAlign.title = '';
                    this.formLabelAlign.description = '';
                    // 跳转到“我的作品”页面
                    this.$router.push('/creatormanagement').catch(err => {
                        if (err.name !== 'NavigationDuplicated') {
                            console.error(err);
                        }
                    });
                } else {
                    this.$message.error("新建失败");
                }
            }).catch(error => {
                console.error("Error uploading data:", error);
                this.$message.error("新建失败");
            });
        },
        outLogin() {
            this.$message.success("退出成功");
            localStorage.removeItem("id");
            this.$router.push('/');
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
                        <a href="#" class="logo">
                            <img :src="require('@/assets/img/logo.png')" alt="Logo">
                            版权管理创作者中心平台
                        </a>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-3">
                        <ul class="header-actions">
                            <el-dropdown>
                                <i class="el-icon-setting" style="margin-right: 15px"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-button @click="outLogin">退出登录</el-button>
                                </el-dropdown-menu>
                            </el-dropdown>
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
                            <li @click="gouserall">全部作品</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- Main Content -->
        <div class="main-container">
            <div class="page-header">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active">欢迎使用版权管理创作者中心平台</li>
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
                <el-form-item label="作品名称">
                    <el-input v-model="formLabelAlign.title" placeholder="请输入作品名称"></el-input>
                </el-form-item>
                <el-form-item label="作品介绍">
                    <el-input v-model="formLabelAlign.description" placeholder="请输入作品介绍"></el-input>
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
    height: auto;
    margin-right: 10px;
    display: block;
    margin: 0 auto;
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
}

.header-actions .el-icon-setting {
    font-size: 24px;
    color: white;
}

.el-button {
    border: none;
}
</style>
