<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-header class="header">
            <span>审计员管理页面</span>
            <el-dropdown class="dropdown">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-button @click="outLogin">退出登录</el-button>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container style="height: calc(100% - 60px);">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%; overflow: auto;">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="goauditor">待审核</el-menu-item>
                            <el-menu-item index="1-2" @click="goaudited">已审核</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-main style="height: 100%; overflow: auto;">
                <!-- 搜索框 -->
                <el-input v-model="searchQuery" placeholder="请输入作品 ID" style="margin-bottom: 20px; width: 300px;"
                    prefix-icon="el-icon-search"></el-input>

                <el-table :data="paginatedData">
                    <el-table-column prop="id" label="作品id" width="140"></el-table-column>
                    <el-table-column prop="creatorName" label="作者" width="140"></el-table-column>
                    <el-table-column prop="title" label="作品名称" width="140"></el-table-column>
                    <el-table-column prop="description" label="作品简介" width="120"></el-table-column>
                    <el-table-column prop="status" label="审核状态" width="120">
                        <template #default="{ row }">
                            <span :class="statusClass(row.status)">{{ row.status }}</span>
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
        outLogin() {
            this.$message.success("退出成功")
            localStorage.removeItem("id")
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
    background-color: #007bff;
    color: #fff;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
    padding: 0 20px;
}

.dropdown {
    display: flex;
    align-items: center;
}

.el-icon-setting {
    font-size: 24px;
    margin-right: 15px;
    color: #fff;
}

.el-aside {
    color: #333;
}

/* 状态栏颜色 */
.status-approved {
    color: green;
}

.status-rejected {
    color: red;
}

.status-pending {
    color: rgb(0, 81, 254);
    font-weight: bold;
}

.el-button {
    border: none;
}
</style>
