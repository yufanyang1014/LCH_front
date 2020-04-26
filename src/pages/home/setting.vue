<template>
  <div class="page-setting">
    <Tabs defaultActiveKey="1">
      <tabpane tab="轮播图" key="1"><course /></tabpane>
      <tabpane tab="列表" key="2"><costumeList /></tabpane>
    </Tabs>
  </div>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import course from './components/course';
import costumeList from './components/costumeList';

const tabpane = Tabs.TabPane;

export default {
  components: {
    Tabs,
    tabpane,
    course,
    costumeList,
  },
  data() {
    return {
      
    }
  },
  props: {
    
  },
  computed: {

  },  
  mounted() {
  }, 
  methods: {
    handlerChange() {
      
    },
    
  },   
}
</script>

<style lang="less" scoped>
  .page-setting {
    
  }
</style>