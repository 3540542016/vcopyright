<template>
  <div class="container">
    <el-container>
      <el-header>
      <p>审计员操作页面</p>
        <!-- <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </el-header>
      <el-container>
        <el-aside class="aside">
          <el-menu :default-openeds="['1', '3']" class="menu">
            <el-submenu index="1" class="submenu">
              <template slot="title"><i class="el-icon-message"></i>审核作品</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">审核详情</el-menu-item>
                <el-menu-item index="1-2">待审核</el-menu-item>
                <el-menu-item index="1-3">审核历史</el-menu-item> <!-- Fixed index -->
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container direction="vertical" class="main-container">
          <el-main>
            <el-table :data="paginatedData">
              <el-table-column prop="username" label="标题" width="120"></el-table-column>
              <el-table-column prop="id" label="缩略图" width="140"></el-table-column>
              <el-table-column prop="zpjj" label="作品简介"></el-table-column>
              <el-table-column prop="address" label="上传时间"></el-table-column>
              <el-table-column prop="cz" label="操作"></el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="tableData.length"
              :page-size="pageSize"
              @current-change="handlePageChange">
            </el-pagination>
          </el-main>
          <el-footer>@版权处理平台审计员页面</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
      id: '2016-05-02',
      zpjj:'',
      username: '王老虎',
      address: '上海市普陀区金沙江路 1518 弄',
      zc:''
    };
    return {
      tableData: Array(20).fill(item),
      pageSize: 16,
      currentPage: 1
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    }
  }
};
</script>


<style>
  .container {
    height: 100vh; /* Full viewport height */
    display: flex;
    flex-direction: column;
  }

  .el-header {
    background-color: #009FEF;
    color: #fff;
    font-weight: bold;
    text-align: left;
    font-size: 50px;
    line-height: 30px;
    flex: 0 0 10%; /* Header height 10% */
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    flex: 0 0 10%; /* Footer height 10% */
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    flex: 0 0 15%; /* Aside width 15% */
  }

  .main-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden; /* Prevent overflow */
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    padding: 10px;
    flex: 1; /* Main takes remaining height */
    overflow: hidden; /* Prevent overflow */
  }

  .el-table {
    overflow: hidden; /* Prevent table overflow */
  }

  .el-container {
    display: flex;
    height: 100%;
  }

  .el-container > .el-container {
    flex: 1;
  }

  /* Menu styling */
  .menu {
    height: 100%;
    font-size: 14px; /* Adjust font size as needed */
  }

  .el-menu-item {
    font-size: 20px; 
  }
</style>

