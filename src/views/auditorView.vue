<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-header class="header">
            <div class="header-title">
                <i class="el-icon-monitor header-icon"></i>审计员管理页面
            </div>
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
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <el-button type="success" @click="showConfirmationDialog(row.id, true)">同意审核</el-button>
                            <el-button type="danger" @click="showConfirmationDialog(row.id, false)">拒绝审核</el-button>
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
import { MessageBox } from 'element-ui';

export default {
    data() {
        return {
            currentTableData: [], // 所有数据
            currentPage: 1, // 当前页码
            itemsPerPage: 10, // 每页显示条数
            totalItems: 0, // 总条数
            selectedWorkId: null, // 选择的作品ID
            selectedApproval: null, // 选择的审核操作
            searchQuery: '' // 搜索关键字
        }
    },
    computed: {
        filteredData() {
            // 过滤数据
            const filtered = this.currentTableData.filter(item =>
                item.id.toString().includes(this.searchQuery) && item.status === 'pending'
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
        this.fetchData(); // 初次加载数据
    },
    methods: {
        fetchData() {
            Axios.get("http://localhost:8080/works/creator/all")
                .then((result) => {
                    console.log('Received data:', result.data.data); // 打印数据
                    this.currentTableData = result.data.data;
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        showConfirmationDialog(workId, approval) {
            this.selectedWorkId = workId;
            this.selectedApproval = approval;
            const action = approval ? '同意审核' : '拒绝审核';
            MessageBox.confirm(`您确定要${action}这项审核吗？`, '确认操作', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.Consent(this.selectedWorkId, this.selectedApproval);
            }).catch(() => {
                console.log('操作已取消');
            });
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
                        this.fetchData(); // 同意或拒绝审核后重新加载数据
                    } else if (result.data.code === -1) {
                        this.$message.error(result.data.data);
                    } else {
                        this.$message.error(result.data.data);
                    }
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
                'status-rejected': status === 'rejected',
                'status-pending': status === 'pending' // 新增待审核样式
            };
        },
        translateStatus(status) {
            switch (status) {
                case 'approved':
                    return '已审核';
                case 'rejected':
                    return '未审核';
                case 'pending':
                    return '待审核'; // 将 pending 转换为 待审核
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
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2196F3;
    /* 蓝色背景 */
    color: #ffffff;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
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
    flex: 1;
    /* 填充空白区域 */
}

.header-title i {
    font-size: 24px;
    margin-right: 10px;
    color: #ffffff;
    transition: color 0.3s ease;
}

.header-title span {
    font-size: 24px;
    font-weight: bold;
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
}

.el-menu-item:hover {
    background-color: #1565C0;
    /* 深蓝色背景 */
    color: #ffffff;
}

.search-box {
    margin-bottom: 20px;
    transition: border-color 0.3s ease;
}

.search-box:focus {
    border-color: #1565C0;
    /* 深蓝色边框 */
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
}

.el-table td {
    transition: background-color 0.3s ease;
}

.el-table-row:hover {
    background-color: #bbdefb;
    /* 更深的浅蓝色背景 */
}

.el-table .status-approved {
    color: #1E88E5;
    /* 蓝色 */
    font-weight: bold;
}

.el-table .status-rejected {
    color: #d32f2f;
    /* 红色 */
    font-weight: bold;
}

.el-table .status-pending {
    color: #0288D1;
    /* 更深的蓝色 */
    font-weight: bold;
}

.el-pagination {
    margin: 20px 0;
}

.el-button {
    border: none;
    transition: background-color 0.3s ease, color 0.3s ease;
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
