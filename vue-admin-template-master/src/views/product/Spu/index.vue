<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus">添加spu</el-button>
      <el-table :data="records" style="width: 100%" border >
        <el-table-column
          type="index"
          label="序号"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="spuName"
          label="SPU名称"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="SPU描述"
          width="width"
        ></el-table-column>
        <el-table-column label="操作" width="width">
          <template slot-scope="{row,$index}" >
            <el-button type="success" size="mini" icon="el-icon-plus" title="添加sku" ></el-button>
              <el-button type="waring" size="mini" icon="el-icon-edit" title="修改spu" @click="updateSpu(row)"></el-button>
              <el-button type="info" size="mini" icon="el-icon-info"  title="查看当前spu全部sku列表"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" title="删除spu" ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px; text-align: center"
        :current-page="page"
        :total="total"
        :pager-count="7"
        :page-size="limit"
        :page-sizes="[3, 5, 7, 10]"
        layout=" prev, pager, next, jumper,->,sizes,total"
        @current-change="getSpuList"
        @size-change="handleSizeChange"
      >
      </el-pagination>
      </div>
      
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: "Spu",
  data() {
    return {
      category1Id: "1",
      category2Id: "1",
      category3Id: "1",
      records: [],
      //分页器第几页
      page: 1,
      //分页器每一页展示条数
      limit: 3,
      //总共数据条数
      total: 0,
      scene: "0",

      //spu表单数据
      
    };
  },
  components: {
    SpuForm,
    SkuForm,
  },

  mounted() {
    this.getSpuList();
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.category1Id = categoryId;
      } else if (level === 2) {
        this.category3Id = "";
        this.category2Id = categoryId;
      } else if (level === 3) {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(pager = 1) {
      this.page = pager;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      if (result.code === 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      } else {
        this.$message.error("获取SPU列表失败");
      }
    },
    //当分页器每页展示条数改变时触发，改变每页展示条数，重新请求数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    updateSpu(row) {
      this.scene = 1;
      // //获取子组件SpuForm子组件的
      // //在父组件当中可以通过$ref获取子组件等等
      this.$refs.spu.initSpuData(row);
    },
    changeScene(scene){
      this.scene = scene;
    },
  },
};
</script>

<style>
</style>