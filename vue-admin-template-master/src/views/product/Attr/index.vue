<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <!-- 一个button -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <!-- 属性表格 -->
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
              >
                {{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="190">
            <template slot-scope="{ row, $index }">
              <div style="display: flex; gap: 10px">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  @click="updateAttr(row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteAttr(row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加属性的弹框 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!this.attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里需要span和input来回切换,span改成block这样可以大一些 -->
              <el-input
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="addOrUpdateAttr">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
  
  <script>
//按需引入loadash
import { reqAddOrUpdateAttr } from "@/api/product/attr";
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      //收集或者修改属性使用的
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
          //占位
          // {
          //   attrId: 1,
          //   valueName: "sss",
          // },
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      },
    };
  },
 
  methods: {
    //根据子组件传过来的分类id，设置当前分类的id，子传父
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
        this.getAttrList();
        this.isShowTable = true;
      }
    },

    //获取属性列表的数据
    async getAttrList() {
      //获取分类的ID
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },

    //目的是取消回显，防止点击取消后回来还能看到之前的属性值
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3, //因为服务器也需要区分几级id
      };
    },

    //flag属性：给每一个属性值添加一个标记flag，用户切换查看模式与编辑模式，好处，每一个属性值可以控制自己的模式切换
    //当前flag属性，响应式数据（数据变化视图跟着变化）
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        //attrid是从服务器获得的,value是相应属性值的名称
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });

      //新增自动化聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //修改属性值
    updateAttr(row) {
      this.isShowTable = false;
      //需要使用深拷贝,因为数据结构复杂
      this.attrInfo = cloneDeep(row);

      this.attrInfo.attrValueList.forEach((item) => {
        // 不能这么写因为flag不是响应式数据，数据变化不能触发视图变化
        // item.flag = true;
        //第一个参数是哪个对象，第二个参数是属性名，第三个参数是属性值
        this.$set(item, "flag", false);
      });
    },

    toLook(row) {
      // 检查属性值是否为空
      if (row.valueName.trim() === "") {
        this.$message("请输入一个正常的属性值");
        return;
      }
      // 检查新增的属性值是否与已有的重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // 跳过当前项（row）
        return row !== item && row.valueName === item.valueName;
      });
      // 如果有重复，给出提示
      if (isRepat) {
        this.$message("该属性值已存在，请输入其他值");
        return;
      }
      // 如果没有重复，将当前编辑模式切换为查看模式
      row.flag = false;
    },

    toEdit(row, index) {
      row.flag = true;
      //点击span的时候，重绘重拍一个input它是需要耗费事件，因此我们不可能一点击span立马获取到input
      //$nextTick,当节点渲染完毕了，会执行一次
      this.$nextTick(() => {
        //获取响应表单元素的聚焦
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },

    // 保存或更新属性，并删除flag属性
    // 保存或更新属性，并删除flag属性
    async addOrUpdateAttr() {
      const { attrInfo } = this;

      // 深拷贝 attrInfo 避免直接修改原始数据
      const updatedAttrInfo = cloneDeep(attrInfo);

      // 去除空的属性值并删除 flag 属性
      updatedAttrInfo.attrValueList = updatedAttrInfo.attrValueList
        .filter((item) => {
          return item.valueName.trim() !== "";
        })
        .map((item) => {
          const { flag, ...rest } = item;
          return rest; // 返回去除 flag 属性后的对象
        });

      // 检查是否有重复的属性值
      const valueNames = updatedAttrInfo.attrValueList.map(
        (item) => item.valueName
      );
      const hasDuplicate = valueNames.some(
        (value, index) => valueNames.indexOf(value) !== index
      );

      if (hasDuplicate) {
        this.$message.error("存在重复的属性值，请修改后再保存");
        return;
      }

      try {
        // 这里的 API 请求需要传入的对象应该确保格式正确，比如包含 categoryId、attrName 等
        const result = await this.$API.attr.reqAddOrUpdateAttr(updatedAttrInfo);

        if (result && result.code === 200) {
          this.$message.success("保存成功");
          this.isShowTable = true; // 切换回表格视图
          await this.getAttrList(); // 重新获取属性列表，确保界面更新
        } else {
          this.$message.error("保存失败，请重试");
        }
      } catch (error) {
        this.$message.error("保存失败，服务器异常");
        console.error("保存失败:", error);
      }
    },
  },
};
</script>
  
  <style>
</style>