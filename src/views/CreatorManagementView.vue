<script>
import Axios from 'axios';

export default {
    name: 'AppHeader',
    data() {
        const formLabelAlign = {
            id: '',
            title: '',
            description: '',
            status: '待审核',
        };
        return {

        };
    },
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
            const creatorhome = '/creatorhome';
            if (this.$route.path !== creatorhome) {
                this.$router.push(creatorhome).catch(err => {
                    if (err.name !== 'creatorhome') {
                        console.error(err);
                    }
                });
            }
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
        },
        Application() {
            this.axios.post('localhost:8080/creator/upload', item).then((Response) => {

            })
        },
    },

};
</script>

<template>
    <div>
        <!-- Header -->
        <header class="header">
            <div class="container-fluid">
                <div class="row gutters">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-9">
                        <a href="" class="logo">
                            <img :src="require('@/assets/img/logo.png')" alt="Logo">
                            版权管理创作者中心平台
                        </a>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-3">
                        <ul class="header-actions">
                            <el-dropdown>
                                <i class="el-icon-setting" style="margin-right: 15px"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>退出登录</el-dropdown-item>
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
                            用户管理
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="pagesDropdown">
                            <li @click="gomyuser">我的用户</li>
                            <li @click="gouseradd">添加用户</li>
                        </ul>
                    </li>\
                </ul>
            </div>
        </nav>
        <div class="main-container">
            <div class="page-header">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">用户管理</li>
                    <li class="breadcrumb-item active">我的用户</li>
                </ol>
            </div>
            <div class="content-wrapper">
                <div class="card-body">
                    <div class="selbox">
                        <div class="collapse in" id="collapseExample" aria-expanded="true" style="">
                            <div class="form1">
                                <ul class="row">

                                    <li class="col-xs-4">
                                        <span>用户类型：</span>
                                        <select class="form-control">
                                            <option>请选择</option>
                                        </select>
                                    </li>



                                    <li class="col-xs-4">
                                        <span>年龄：</span>
                                        <div class="clearfix">
                                            <div class="pull-left"><input type="text" class="form-control"
                                                    style="min-width: inherit; width: 50px;"></div>
                                            <div class="pull-left" style="line-height: 36px;">-</div>
                                            <div class="pull-left"><input type="text" class="form-control"
                                                    style="min-width: inherit; width: 50px;"></div>
                                        </div>
                                    </li>
                                    <li class="col-xs-4">
                                        <span>创建时间：</span>
                                        <input type="text" class="form-control " id="date" style="min-width:230px;"
                                            placeholder="请选择起止时间" lay-key="1">
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div class="tablebox">
                        <el-table :data="currentTableData">
                            <el-table-column prop="id" label="创作者" width="140"></el-table-column>
                            <el-table-column prop="title" label="作品名称" width="140"></el-table-column>
                            <el-table-column prop="description" label="作品简介" width="120"></el-table-column>
                            <el-table-column prop="status" label="审核状态" width="120"></el-table-column>
                            <el-table-column label="操作">
                                <template #default="{ row }">
                                    <button class="btn btn-success">申请版权</button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <!-- Pagination -->
                    <nav aria-label="Page navigation" class="page">
                        <ul class="pagination">
                            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                <a class="page-link" href="javascript:;" aria-label="Previous"
                                    @click="changePage(currentPage - 1)">
                                    <span aria-hidden="true">上一页</span>
                                </a>
                            </li>
                            <li v-for="page in totalPages" :key="page" class="page-item"
                                :class="{ active: page === currentPage }">
                                <a class="page-link" href="javascript:;" @click="changePage(page)">{{ page }}</a>
                            </li>
                            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                <a class="page-link" href="javascript:;" aria-label="Next"
                                    @click="changePage(currentPage + 1)">
                                    <span aria-hidden="true">下一页</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>
    </div>
</template>


<style>
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

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}

.tablebox {
    width: 100%;
    overflow-x: auto;
    /* 如果表格宽度超出容器，允许水平滚动 */
}

.tablebox {
    width: 100%;
    overflow-x: auto;
    /* 如果表格宽度超出容器，允许水平滚动 */
}

.tablebox .el-table {
    width: 100%;
    /* 设置表格宽度为100% */
    table-layout: fixed;
    /* 确保表格列宽固定 */
}

.tablebox .el-table .el-table__header,
.tablebox .el-table .el-table__body {
    width: 100%;
    /* 确保表头和表体宽度为100% */
}

.pagination .page-item.disabled .page-link {
    pointer-events: none;
    opacity: 0.5;
}

.pagination .page-item.active .page-link {
    background-color: #1047eed3;
    border-color: #1047eed3;
    color: white;
}

.tablebox .btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
    border-radius: 4px;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.tablebox .btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
}

.header-actions .el-icon-setting {
    font-size: 24px;
    /* 设置图标大小 */
    color: white;
    /* 设置图标颜色为白色 */
}
</style>