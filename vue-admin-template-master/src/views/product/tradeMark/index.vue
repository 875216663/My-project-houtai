<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">
      新增
    </el-button>
    <!-- 
         elementUI当中的表格组件 
         data:表格组件将来需要展示的数据------数组类型
         border：给表格添加边框
         column属性
         label：显示标题，字符串形式，自己定义
         width：对应列的宽度
         align：标题的对齐方式，可以居中
         prop:对应列内容的字段名，是从data中取值的字段名，比如prop="tmName"，表示取data中tmName字段的值作为列内容
         type:如果设置了索引那么就从1开始,自动遍历，用于显示序号
         注意1：elementUI当中的table组件，展示的数据是以一列一列进行展示数据
       -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center">
      </el-table-column>
      <el-table-column label="品牌logo" width="width" align="center">
        <!-- 自定义列模板，将logoUrl字段的值展示为图片,使用的作用域插槽，row:当前行数据，$index:当前行索引 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      element的分页器 
      current-page:当前第几页
      total：分页器一共需要展示数据条数
      pager-count:分页器页码按钮显示的数量  如果 9  连续页码是7 如果7 连续页码数是5，然后第一页和最后一页，加起来是7
      page-size：代表的是每一页需要展示多少条数据
      page-sizes：代表可以设置每一页展示多少条数据,可以选择
      layout：实现分页器的布局，->可以把后面的按钮放在最右侧
      @current-change="handleCurrentChange" ：当分页器当前页改变时触发，参数是改变后的当前页
      @size-change="handleSizeChange"：当分页器每页展示条数改变时触发，参数是改变后的每页展示条数  
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :pager-count="7"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      layout=" prev, pager, next, jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      //分页器第几页
      page: 1,
      //分页器每一页展示条数
      limit: 3,
      //总共数据条数
      total: 0,
      //列表展示的数据
      list: [],
    };
  },
  //组件挂载完毕发请求
  mounted() {
    //获取列表数据的方法
    this.getPageList();
  },
  
  methods: {

    //获取列表数据的方法.,如果没有传入 pager，它会默认请求第 1 页的数据,如果传入的话，就请求对应页的数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构赋值
      const { page, limit } = this;
      //请求品牌列表的接口,要带两个参数，这里初始化两个字段代表服务器传递参数
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      console.log(result);
      if (result.code === 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },


    //当分页器每页展示条数改变时触发，改变每页展示条数，重新请求数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
  },
};
</script> 

<style>
</style> 