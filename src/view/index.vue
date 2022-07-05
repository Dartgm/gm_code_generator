<template>
  <section class="activity-container">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th><input type="checkbox" name="check_select" value="0" /></th>
          <th>表名</th>
          <th>引擎</th>
          <th>表备注</th>
          <th>创建时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in datasource">
          <td>{{index+1}}</td>
          <td>
            <input type="checkbox" name="check_select" :value="index" />
          </td>
          <td>{{item.tableName}}</td>
          <td>{{item.engine}}</td>
          <td>{{item.comments}}</td>
          <td>{{item.createTime}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import {defineComponent, reactive, toRefs,} from "vue";
export default defineComponent({
  setup(props,context){
    const checkState=document.getElementsByTagName('input[type=checkbox]')
    const state=reactive({
      datasource: [
        {
          tableName:'wms_ware_sku',
          engine: 'InnoDB',
          comments: '商品库存',
          createTime: new Date()
        }
      ]
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>