<script>
import * as echarts from 'echarts';

export default {
    name: 'AppHeader',
    mounted() {
        this.initChart();
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
        gouserall() {
            const createallwork = '/createallwork';
            if (this.$route.path !== createallwork) {
                this.$router.push(createallwork).catch(err => {
                    if (err.name !== 'createallwork') {
                        console.error(err);
                    }
                });
            }
        },
        outLogin() {
            this.$message.success("退出成功")
            localStorage.removeItem("id")
            this.$router.push('/');

        }
    }
};

</script>

<template>
    <div>
        <!-- Header -->
        <header class="header">
            <div class="container-fluid">
                <div class="row gutters">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-9">
                        <a href="" class="logo" @click="gohome">
                            <img :src="require('@/assets/img/logo.png')" alt="Logo">
                            版权管理创作者中心平台
                        </a>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-3">
                        <ul class="header-actions">
                            <li class="dropdown">
                                <ul class="header-actions">
                                    <el-dropdown>
                                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-button @click="outLogin">退出登录</el-button>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </ul>
                            </li>
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
                    <li class="breadcrumb-item active">欢迎使用社区身心健康管理元平台</li>
                </ol>
            </div>
            <div class="content-wrapper">
                <!-- File Browser -->
                <section class="file-browser">
                    <div class="row match-height">
                        <div class="col-lg-12 col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <label class="card-title" for="exampleInputFile">工作统计</label>
                                </div>
                                <div class="card-block">
                                    <div class="card-body">
                                        <ul class="row">
                                            <li class=" col-md-8">
                                                <div class="pull-left"><img :src="require('@/assets/img/user9.png')"
                                                        alt="avatar" /></div>
                                                <div class="pull-left">
                                                    <h2>早安，韩修洁医生</h2>
                                                    <p>主任医师 <span>|</span>联系电话：0551-123456<span>|</span>xxx中心社区医院</p>
                                                </div>
                                            </li>
                                            <li class=" col-md-4">
                                                <div class="ysnm">

                                                    <div class="pull-right">
                                                        <p>审核进度</p><span>8</span> / <i>24</i>
                                                    </div>
                                                    <div class="pull-right">
                                                        <p>接诊总数</p><span>56</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="textarea-select">
                    <div class="row">
                        <div class="col-lg-6 col-md-12">
                            <div class="card">
                                <div class="card-header">

                                    <h4 class="card-title float-left">预约评测</h4>
                                    <a href="#" class="float-right">更多</a>
                                </div>
                                <div class="card-block">
                                    <div class="card-body">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>量表</th>
                                                    <th>用户</th>
                                                    <th>筛查类型</th>
                                                    <th>确认状态</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>汉密尔顿抑郁量表HAMD</td>
                                                    <td>吴用</td>
                                                    <td>孕早期</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                </tr>

                                                <tr>
                                                    <td>汉密尔顿抑郁量表HAMD</td>
                                                    <td>吴用</td>
                                                    <td>孕早期</td>
                                                    <td><span class="badge badge-warning">未确认</span></td>
                                                </tr>
                                                <tr>
                                                    <td>汉密尔顿抑郁量表HAMD</td>
                                                    <td>吴用</td>
                                                    <td>孕早期</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                </tr>
                                                <tr>
                                                    <td>汉密尔顿抑郁量表HAMD</td>
                                                    <td>吴用</td>
                                                    <td>孕早期</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                </tr>
                                                <tr>
                                                    <td>汉密尔顿抑郁量表HAMD</td>
                                                    <td>吴用</td>
                                                    <td>孕早期</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="card" style="">
                                <div class="card-header">
                                    <h4 class="card-title float-left">最新预约</h4>
                                    <a href="#" class="float-right">更多</a>
                                </div>

                                <div class="card-block">
                                    <div class="card-body">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>用户</th>
                                                    <th>日期</th>
                                                    <th>预约状态</th>
                                                    <th>方式</th>


                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>朱仝</td>
                                                    <td>2019-02-18</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                    <td>面对面</td>
                                                </tr>

                                                <tr>
                                                    <td>朱仝</td>
                                                    <td>2019-02-18</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                    <td>网络</td>
                                                </tr>
                                                <tr>
                                                    <td>朱仝</td>
                                                    <td>2019-02-18</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                    <td>电联</td>
                                                </tr>
                                                <tr>
                                                    <td>朱仝</td>
                                                    <td>2019-02-18</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                    <td>面对面</td>
                                                </tr>
                                                <tr>
                                                    <td>朱仝</td>
                                                    <td>2019-02-18</td>
                                                    <td><span class="badge badge-success">已确认</span></td>
                                                    <td>面对面</td>
                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Textarea end -->
                </section>
            </div>
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
.el-button {
    border: none;
}
</style>