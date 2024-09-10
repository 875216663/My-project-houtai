<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-if="tradeMarkList.length > 0"placeholder="请选择品牌"  v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input v-model="spu.description"></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select  placeholder="请选择销售属性">
          <el-option :label="saleAttr.name" :value="saleAttr.id" v-for="(saleAttr,index) in saleAttrList" :key="saleAttr.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus"> 添加属性</el-button>
        <el-table :data="form.saleAttr" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="name" label="属性名"></el-table-column>
          <el-table-column
            prop="value"
            label="属性值名称列表"
          ></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top: 10px">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
export default {
  name: "SpuForm",
  data() {
    return {
      form: {
        spuName: "",
        brandId: "",
        spuDesc: "",
        spuImg: "",
        saleAttr: [],
        imgList: [],
      },
      spu: {
        category3Id: 0, //三级分类的id
        description: "", //描述
        spuName: "", //spu名称
        tmId: "", //平台的id
        //收集SPU图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        //平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //存储SPU图片的数据
      saleAttrList: [], //销售属性的数据（项目全部的销售属性）
    };
  },
  mounted() {},
  methods: {
    cancel() {
      this.$emit("changeScene", "0");
    },
    async initSpuData(spu) {
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      this.spu = spuResult.data;

      //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }

      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }

      //获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });

        this.spuImageList = listArr;
      }
    },
  },
};
</script>
  
  <style>
</style>