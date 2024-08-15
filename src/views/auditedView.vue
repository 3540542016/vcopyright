<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-header class="header">
            <span class="header-title">
                <i class="el-icon-monitor header-icon"></i>审计员管理页面
            </span>
            <el-dropdown class="dropdown">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-button @click="outLogin">退出登录</el-button>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container style="height: calc(100% - 60px);">
            <el-aside width="200px" class="sidebar">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-menu"></i>导航一</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="goauditor">
                                <i class="el-icon-edit-outline"></i>待审核
                            </el-menu-item>
                            <el-menu-item index="1-2" @click="goaudited">
                                <i class="el-icon-check"></i>已审核
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main class="main-content">
                <!-- 搜索框 -->
                <el-input v-model="searchQuery" placeholder="请输入作品 ID" class="search-box"
                    prefix-icon="el-icon-search"></el-input>

                <el-table :data="paginatedData" class="data-table">
                    <el-table-column prop="id" label="作品id" width="140"></el-table-column>
                    <el-table-column prop="creatorName" label="作者" width="140"></el-table-column>
                    <el-table-column prop="title" label="作品名称" width="140"></el-table-column>
                    <el-table-column prop="description" label="作品简介" width="120"></el-table-column>
                    <el-table-column prop="status" label="审核状态" width="120">
                        <template #default="{ row }">
                            <span :class="statusClass(row.status)">{{ translateStatus(row.status) }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background :current-page="currentPage" :page-size="itemsPerPage" :total="totalItems"
                    layout="total, prev, pager, next" @current-change="handlePageChange">
                </el-pagination>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Axios from 'axios';

export default {
    data() {
        return {
            currentTableData: [], // 所有数据
            currentPage: 1, // 当前页码
            itemsPerPage: 10, // 每页显示条数
            totalItems: 0, // 总条数
            searchQuery: '' // 搜索关键字
        }
    },
    computed: {
        filteredData() {
            // 过滤掉状态为空字符串和状态为 pending 的数据
            const filtered = this.currentTableData.filter(item =>
                item.status && item.status !== 'pending' && item.id.toString().includes(this.searchQuery)
            );
            this.totalItems = filtered.length; // 更新总条数
            return filtered;
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredData.slice(start, end);
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            Axios.get("http://localhost:8080/works/creator/all")
                .then((result) => {
                    console.log('Received data:', result.data.data); // 打印数据
                    this.currentTableData = result.data.data;
                    this.totalItems = this.currentTableData.length; // 更新总条数
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        Consent(workId, approval) {
            Axios.get("http://localhost:8080/works/auditor/reviewCopyright", {
                params: {
                    workId: workId,
                    approval: approval
                }
            })
                .then((result) => {
                    if (result.data.code === 200) {
                        this.$message.success(result.data.data);
                    } else {
                        this.$message.error(result.data.data);
                    }
                    this.fetchData(); // 刷新数据
                });
        },
        goaudited() {
            const audited = '/audited';
            if (this.$route.path !== audited) {
                this.$router.push(audited).catch(err => {
                    if (err.name !== 'audited') {
                        console.error(err);
                    }
                });
            }
        },
        goauditor() {
            const auditor = '/auditor';
            if (this.$route.path !== auditor) {
                this.$router.push(auditor).catch(err => {
                    if (err.name !== 'auditor') {
                        console.error(err);
                    }
                });
            }
        },
        statusClass(status) {
            return {
                'status-approved': status === 'approved',
                'status-rejected': status === 'rejected'
            };
        },
        translateStatus(status) {
            switch (status) {
                case 'approved':
                    return '已审核';
                case 'rejected':
                    return '未审核';
                default:
                    return '未知状态';
            }
        },
        outLogin() {
            this.$message.success("退出成功");
            localStorage.removeItem("id");
            this.$router.push('/');
        }
    }
};
</script>

<style>
/* 设置全局字体 */
body {
    font-family: 'Arial', sans-serif;
    /* 或使用其他现代字体 */
    font-size: 14px;
    /* 设置全局字体大小 */
    color: #333;
    /* 设置全局字体颜色 */
}

.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2196F3;
    /* 蓝色背景 */
    color: #ffffff;
    line-height: 60px;
    font-size: 18px;
    /* 调整标题字体大小 */
    font-weight: bold;
    /* 加粗字体 */
    padding: 0 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.el-header:hover {
    background-color: #1976D2;
    /* 深蓝色背景 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.header-title {
    display: flex;
    align-items: center;
    font-size: 18px;
    /* 调整标题字体大小 */
    font-weight: bold;
    /* 加粗字体 */
}

.header-icon {
    margin-right: 10px;
    font-size: 24px;
    /* 调整图标大小 */
}

.dropdown {
    display: flex;
    align-items: center;
}

.el-icon-setting {
    font-size: 24px;
    margin-right: 15px;
    color: #ffffff;
    transition: color 0.3s ease;
}

.dropdown:hover .el-icon-setting {
    color: #e0e0e0;
}

.sidebar {
    background-color: #e3f2fd;
    /* 浅蓝色背景 */
    height: 100%;
    overflow: auto;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.sidebar:hover {
    background-color: #bbdefb;
    /* 更深的浅蓝色背景 */
}

.el-menu-item {
    transition: background-color 0.3s ease, color 0.3s ease;
    font-size: 14px;
    /* 调整菜单项字体大小 */
    font-weight: normal;
    /* 设置菜单项字体为正常 */
}

.el-menu-item:hover {
    background-color: #1565C0;
    /* 深蓝色背景 */
    color: #ffffff;
}

.main-content {
    padding: 20px;
}

.search-box {
    margin-bottom: 20px;
    border: 1px solid #1565C0;
    /* 深蓝色边框 */
    font-size: 14px;
    /* 调整输入框字体大小 */
}

.search-box:focus {
    border-color: #0D47A1;
    /* 更深的蓝色边框 */
}

.data-table {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.el-table th {
    background-color: #e3f2fd;
    /* 浅蓝色背景 */
    color: #333;
    font-weight: bold;
    /* 加粗表头字体 */
    font-size: 14px;
    /* 调整表头字体大小 */
}

.el-table .status-approved {
    color: #1E88E5;
    /* 蓝色 */
    font-weight: bold;
    /* 加粗字体 */
}

.el-table .status-rejected {
    color: #d32f2f;
    /* 红色 */
    font-weight: bold;
    /* 加粗字体 */
}

.el-pagination {
    margin: 20px 0;
    font-size: 14px;
    /* 调整分页字体大小 */
}

.el-button {
    border: none;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-size: 14px;
    /* 调整按钮字体大小 */
}

.el-button:hover {
    background-color: #1976D2;
    /* 深蓝色背景 */
    color: #ffffff;
}

.el-button.success {
    background-color: #1E88E5;
    /* 蓝色 */
    color: #ffffff;
}

.el-button.danger {
    background-color: #d32f2f;
    /* 红色 */
    color: #ffffff;
}
</style>
