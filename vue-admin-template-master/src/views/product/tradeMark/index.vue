<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialogForm"
    >
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
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column label="品牌logo" width="width" align="center">
        <!-- 自定义列模板，将logoUrl字段的值展示为图片,使用的作用域插槽，row:当前行数据，$index:当前行索引 -->
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80px" align="center">
        <el-checkbox></el-checkbox>
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
      :page-sizes="[3, 5, 7, 10]"
      layout=" prev, pager, next, jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 对话框组件，新增和修改品牌信息
     visible.sync:控制对话框的显示和隐藏，true为显示，false为隐藏
      -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- 展示表单元素 model属性是将表单数据收集到一个对象中，将来表单验证，也需要这个属性-->
      <el-form style="width: 80%" :model="tmForm">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" label-width="100px">
          <!-- 这里收集数据不能使用v-model，因为不是表单元素 
           action:设置图片的上传的地址，并且需要在前面加上dev-api
           on-success:可以检测到图片上传成功，成功的话执行一次
           before-upload:可以检测到图片上传之前，可以做一些限制，比如大小，格式等
          -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            v-model="tmForm.logoUrl"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      //对话框的显示和隐藏
      dialogFormVisible: false,
      //品牌信息的表单,对象身上的属性需要看文档，不能随便起名字
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
    };
  },
  //组件挂载完毕发请求，获取列表数据
  mounted() {
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

    updateTradeMark(row){
      this.dialogFormVisible = true;
    },

    showDialogForm() {
      this.dialogFormVisible = true;
      // 每次都清空数据
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },

    // 上传图片成功,res是上传成功后返回的前端数据，file是上传成功后返回的前端数据
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
    },
    // 上传图片之前的限制条件
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加或者修改品牌信息
    async addOrUpdateTradeMark() {
      this.dialogFormVisible = false;
      // 发送请求
       result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
      if(result.code === 200){
        this.$message(this.tmForm.id? "修改成功" : "添加成功");
        this.getPageList();
      }
    },
  },
};
</script> 

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>