<script>
import '@fortawesome/fontawesome-free/css/all.min.css';
import Axios from 'axios';

export default {
    name: 'AppHeader',
    data() {
        return {
            currentTableData: [],
            filteredData: [], // 用于保存筛选后的数据
            currentPage: 1, // 当前页码
            itemsPerPage: 6, // 每页显示条数
            totalPages: 0, // 总页数
            showDialog: false, // 控制弹窗显示
            workIdToApply: null, // 记录要申请版权的作品ID
            searchId: '' // 查找作品ID
        };
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredData.slice(start, end);
        }
    },
    created() {
        this.fetchTableData(); // 初始加载数据
    },
    methods: {
        filterData() {
            if (this.searchId.trim()) {
                this.filteredData = this.currentTableData.filter(item => item.id === parseInt(this.searchId));
            } else {
                this.filteredData = this.currentTableData;
            }
            this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage); // 更新总页数
            this.currentPage = 1; // 重置为第一页
        },
        Applyfor(workId) {
            this.workIdToApply = workId;
            this.showDialog = true;
        },
        gouseradd() {
            this.$router.push('/creatework').catch(err => {
                if (err.name !== 'NavigationDuplicated') console.error(err);
            });
        },
        gomyuser() {
            this.$router.push('/creatormanagement').catch(err => {
                if (err.name !== 'NavigationDuplicated') console.error(err);
            });
        },
        gouserall() {
            this.$router.push('/createallwork').catch(err => {
                if (err.name !== 'NavigationDuplicated') console.error(err);
            });
        },
        confirmApply() {
            Axios.get('http://localhost:8080/works/creator/submitCopyright', { params: { workId: this.workIdToApply } })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.$message.success("已提交版权申请，待审核");
                        this.fetchTableData(); // 重新获取数据
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
                .catch((error) => {
                    console.error("Error applying for copyright:", error);
                })
                .finally(() => {
                    this.resetDialog(); // 关闭弹窗
                });
        },
        resetDialog() {
            this.showDialog = false;
            this.workIdToApply = null;
        },
        fetchTableData() {
            const creatorId = localStorage.getItem("id");
            Axios.get('http://localhost:8080/works/creator/show', { params: { id: creatorId } })
                .then((resp) => {
                    this.currentTableData = resp.data.data;
                    this.filterData(); // 过滤数据
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        outLogin() {
            this.$message.success("退出成功");
            localStorage.removeItem("id");
            this.$router.push('/');
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
        },
        getStatusClass(status) {
            switch (status) {
                case 'pending':
                    return 'status-pending';
                case 'approved':
                    return 'status-approved';
                case 'rejected':
                    return 'status-rejected';
                default:
                    return '';
            }
        },
        getStatusText(status) {
            switch (status) {
                case 'pending':
                    return '待审核';
                case 'approved':
                    return '通过审核';
                case 'rejected':
                    return '未通过';
                default:
                    return '';
            }
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
                        <a href="" class="logo">
                            <img :src="require('@/assets/img/logo.png')" alt="Logo">
                            版权管理创作者中心平台
                        </a>
                    </div>
                    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-3">
                        <ul class="header-actions">
                            <el-dropdown>
                                <i class="fas fa-cog" style="margin-right: 15px"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-button @click="outLogin">
                                        <i class="fas fa-sign-out-alt" style="margin-right: 5px"></i>
                                        退出登录
                                    </el-button>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </ul>
                    </div>
                </div>
            </div>
        </header>

        <div class="main-container">
            <div class="page-header">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">作品管理</li>
                    <li class="breadcrumb-item active">我的作品</li>
                </ol>
                <!-- Navigation -->
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
            <div class="content-wrapper">
                <div class="card-body">
                    <div class="selbox">
                        <el-input v-model="searchId" placeholder="输入作品ID查找" @input="filterData">
                            <template #prepend>
                                <i class="fas fa-search"></i>
                            </template>
                        </el-input>
                    </div>
                    <div class="tablebox">
                        <el-dialog title="确认申请版权" :visible.sync="showDialog" width="30%" @close="resetDialog">
                            <p>确定要申请版权吗？</p>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="resetDialog">取消</el-button>
                                <el-button type="primary" @click="confirmApply">确认</el-button>
                            </span>
                        </el-dialog>
                        <el-table :data="paginatedData">
                            <el-table-column prop="id" label="作品id" width="140"></el-table-column>
                            <el-table-column prop="title" label="作品名称" width="140"></el-table-column>
                            <el-table-column prop="description" label="作品简介" width="120"></el-table-column>
                            <el-table-column prop="status" label="审核状态" width="120">
                                <template #default="{ row }">
                                    <span :class="getStatusClass(row.status)">
                                        {{ getStatusText(row.status) }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createdAt" label="初始时间" width="120"></el-table-column>
                            <el-table-column prop="updatedAt" label="更新时间" width="120"></el-table-column>
                            <el-table-column prop="copyrightApplied" label="是否申请" width="120">
                                <template #default="{ row }">
                                    {{ row.copyrightApplied ? "已申请" : "未申请" }}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template #default="{ row }">
                                    <button class="btn btn-success" @click="Applyfor(row.id)">申请版权</button>
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

/* 修改 Header 背景为蓝粉渐变 */
/* 修改 Header 背景为蓝粉渐变，添加透明度 */
body {
    background-color: #f7fafe;
}

/* Header 样式 */
.header {
    background: linear-gradient(to left, rgba(122, 189, 245, 0.8), rgba(255, 157, 252, 0.8));
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

.el-header {
    background-color: rgba(0, 76, 140, 0.8);
    /* 蓝色背景，带有透明度 */
    color: #ffffff;
    line-height: 60px;
}

.el-aside {
    background-color: rgba(227, 242, 253, 0.8);
    /* 浅蓝色背景，带有透明度 */
    color: #333;
}

.pagination .page-item.disabled .page-link {
    pointer-events: none;
    opacity: 0.5;
}

.pagination .page-item.active .page-link {
    background-color: rgba(0, 76, 140, 0.8);
    /* 深蓝色，带有透明度 */
    border-color: rgba(0, 76, 140, 0.8);
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
    overflow-x: auto;
    margin: 20px 0;
}

.tablebox .btn-success:hover {
    background-color: #218838;
    border-color: #1e7e34;
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

.el-button {
    border: none;
}

/* Page Header 样式 */
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

.navbar-nav .nav-item .dropdown-menu {
    background: linear-gradient(to left, rgba(106, 188, 255, 0.8),
            rgba(255, 117, 250, 0.8));
    border: none;
    border-radius: 8px;
    padding: 0;
}

.navbar-nav .nav-item .dropdown-menu li {
    color: #ffffff;
    padding: 10px 20px;
    font-size: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.navbar-nav .nav-item .dropdown-menu li:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    cursor: pointer;
}

.navbar-nav .nav-item .dropdown-menu li:last-child {
    border-bottom: none;
}

.el-table {
    width: 100%;
    border-collapse: collapse;
    /* 合并表格边框 */
}

.el-table tr:nth-child(even) {
    background-color: #f2f2f2;
    /* 偶数行背景色 */
}

.el-table tr:hover {
    background-color: #e9ecef;
    /* 悬停时的背景色 */
}

.el-table td {
    font-size: 14px;
    /* 字体大小 */
    color: #333;
    /* 文字颜色 */
}

.el-table-column {
    padding: 0 10px;
    /* 列内边距 */
}

/* 确保按钮和表格对齐 */
.el-table-column .btn {
    margin: 0;
    font-size: 14px;
    padding: 5px 10px;
}

.status-pending {
    font-weight: bold;
    color: blue;
}

.status-approved {
    font-weight: bold;
    color: green;
}

.status-rejected {
    font-weight: bold;
    color: red;
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
