<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">
      新增
    </el-button>
    <!-- 
         表格组件 
         data:表格组件将来需要展示的数据------数组类型
         border：是给表格添加边框
         column属性
         label：显示标题
         width：对应列的宽度
         align：标题的对齐方式
         prop:对应列内容的字段名
         type:如果设置了索引那么就从一开始
         border：边框
         注意1：elementUI当中的table组件，展示的数据是以一列一列进行展示数据
       -->
    <el-table style="width: 100%" border>
      <el-table-column prop="prop1" label="Label 1" width="width">
      </el-table-column>
      <el-table-column prop="prop2" label="Label 2" width="width">
      </el-table-column>
      <el-table-column prop="prop3" label="Label 3" width="width">
      </el-table-column>
      <el-table-column prop="prop4" label="Label 4" width="width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
};
</script> 

<style>
</style> 