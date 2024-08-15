<script>
import '@fortawesome/fontawesome-free/css/all.min.css';
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


        <!-- Main Content -->
        <div class="main-container">
            <div class="page-header">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">作品管理</li>
                    <li class="breadcrumb-item active">添加作品
                    </li>
                </ol>
                <nav class="navbar navbar-expand-lg custom-navbar">

                    <div class="collapse navbar-collapse" id="royalHospitalsNavbar">
                        <ul class="navbar-nav">
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
                <el-form-item label="作品名称:">
                    <el-input v-model="formLabelAlign.title" placeholder="请输入作品名称"></el-input>
                </el-form-item>
                <el-form-item label="作品介绍:">
                    <el-input type="textarea" v-model="formLabelAlign.description" placeholder="请输入作品介绍" maxlength="60"
                        show-word-limit></el-input>
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

body {
    background-color: #f7fafe;
}

/* Header 样式 */
.header {
    background: linear-gradient(to left, rgba(106, 188, 255, 0.8), rgba(255, 117, 250, 0.8));
    padding: 10px 0;
    margin: 0;
    /* 确保没有多余的 margin */
}

/* 去掉边距和内边距 */
.header,
.page-header {
    border: none;
    /* 去掉边框 */
}

.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to left, rgba(106, 188, 255, 0.8),
            rgba(255, 117, 250, 0.8));
    padding: 10px;
    margin: 0;
    /* 确保没有多余的 margin */
}

.page-header .breadcrumb {
    margin: 0;
    padding: 0;
    background: transparent;
}

.page-header .navbar {
    margin: 0;
    background: transparent;
}

.navbar {
    background: linear-gradient(to left, rgba(106, 188, 255, 0.8), rgba(255, 117, 250, 0.8));
    /* 蓝色到粉色的渐变背景 */
}

.navbar-nav .nav-item .dropdown-menu {
    background: linear-gradient(to left, rgba(106, 188, 255, 0.8), rgba(255, 117, 250, 0.8));
    /* 蓝色渐变背景 */
    border: none;
    /* 移除边框 */
    border-radius: 8px;
    /* 圆角边框 */
    padding: 0;
    /* 移除内边距 */
}

.navbar-nav .nav-item .dropdown-menu li {
    color: #ffffff;
    /* 白色文字 */
    padding: 10px 20px;
    /* 内边距 */
    font-size: 16px;
    /* 字体大小 */
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    /* 分隔线 */
}

.navbar-nav .nav-item .dropdown-menu li:hover {
    background-color: rgba(255, 255, 255, 0.2);
    /* 悬停背景色 */
    color: #ffffff;
    /* 悬停时文字颜色 */
    cursor: pointer;
    /* 鼠标指针样式 */
}

.navbar-nav .nav-item .dropdown-menu li:last-child {
    border-bottom: none;
    /* 去除最后一项的分隔线 */
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

.header-actions .el-icon-setting {
    font-size: 24px;
    color: white;
}

.el-button {
    border: none;
}

/* 针对特定图标放大 */
.header-actions .fas.fa-cog {
    font-size: 2em;
    color: #ffffff;
    /* 设置具体的图标大小 */
}

.navbar-nav .icon-add-user {
    font-size: 1.8em;
    /* 调整"添加用户"图标的大小 */
}

/* 其他图标的样式调整 */
.navbar-nav .icon-home {
    font-size: 1.8em;
    /* 主页图标的大小 */
}

/* 优化 el-input 搜索框样式 */
.el-input {
    border: 1px solid rgba(0, 76, 140, 0.3);
    /* 轻微的边框颜色 */
    border-radius: 4px;
    /* 圆角边框 */
    padding: 5px 10px;
    /* 内边距 */
    transition: border-color 0.3s ease;
    /* 边框颜色过渡效果 */
}

/* 输入框获取焦点时的样式 */
.el-input.is-focus {
    border-color: rgba(0, 76, 140, 0.8);
    /* 更显眼的边框颜色 */
    box-shadow: 0 0 5px rgba(0, 76, 140, 0.5);
    /* 添加阴影效果 */
}

/* 输入框悬停时的样式 */
.el-input:hover {
    border-color: rgba(0, 76, 140, 0.5);
    /* 悬停时的边框颜色 */
}

.el-input .el-input__prefix {
    font-size: 14px;
    /* 图标大小 */
    color: rgba(0, 76, 140, 0.7);
    /* 图标颜色 */
}

.el-input .el-input__inner {
    padding-left: 30px;
    /* 留出空间给图标 */
}
</style>
