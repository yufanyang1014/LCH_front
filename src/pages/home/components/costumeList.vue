<template>
  <div class="list-setting">
    <section class="page-header">
      <InputSearch enterButton
          placeholder="请输入楼名称"
          style="width: 300px"
          @search="handlerSearch"
        />
      <div class="section-btn">
        <Button type="danger" @click="handlerDel"><Icon type="delete" />删除楼</Button>&nbsp;&nbsp;
        <Button type="primary" @click="handlerAdd"><Icon type="plus" />新增楼</Button>
      </div>
    </section>
    <Table :columns="columns" :pagination="false" 
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :dataSource="list" rowKey='id'>
      <template slot="Lname" slot-scope="text, record">
        <a @click="() => handlerEdit(record)">【{{record.fifthItem}}】{{ record.title }}</a>        
      </template>
    </Table> 
    <section class="section-pagination">
      <Pagination @change="onChangePage" 
              :showTotal="total => `一共 ${total} 条`"
              :current="pageNum" 
              :total="total"/>
    </section>          
    <Drawer
      :title="formName"
      :width="580"
      @close="handlerCancel"
      :visible="visible"
      :bodyStyle="{ paddingBottom: '80px' }">
        <Form layout="vertical" :form="form">
          <Row :gutter="16">
            <Col :span="12">
              <FormItem label="楼名称">
                <Input placeholder="请输入楼名称" 
                v-decorator="['title', { rules: [{ required: true, message: '请输入楼名称!' }] }]"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="发布人">
                <Input placeholder="请输入发布人" 
                v-decorator="['bannerName', { rules: [{ required: true, message: '请输入发布人!' }] }]"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col :span="12">
              <FormItem label="发布时间">
                <DatePicker style="width: 100%" placeholder="请输入发布时间" format="YYYY-MM-DD"
                v-decorator="['channel', 
                { 
                  rules: [{ required: true, message: '请选择发布时间!' }] 
                }]"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="发布区域">
                <Select placeholder="请选择" 
                    v-decorator="['fifthItem', { rules: [{ required: true, message: '请选择发布区域!' }] }]">
                  <selectOption v-for="item in areaData" :key=item.id :value="item.title">{{ item.title }}</selectOption>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col :span="12">
              <FormItem label="发布商圈">
                <Input placeholder="请输入发布商圈"
                v-decorator="['secondItem', { rules: [{ required: false }] }]"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="关联楼宇">
                <Input placeholder="请输入关联楼宇"
                v-decorator="['thirdItem', { rules: [{ required: false }] }]"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16">
            <Col :span="12">
              <FormItem label="发布来源">
                <Input placeholder="请输入发布来源"
                v-decorator="['fourthItem', { rules: [{ required: false }] }]"/>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label="信息类型">
                <Input placeholder="请输入信息类型"
                v-decorator="['firstItem', { rules: [{ required: false }] }]"/>
              </FormItem>
            </Col>  
          </Row>
          <FormItem label="* 楼图片">
            <uploadFile v-on:onUpload="handlerFile"/>
            <div :style="comstyle.container">
              <div v-show="linkUrl">
                <img :style="{width: '100%', height: '100%'}" :src="linkUrl"/>
                <Icon :style="{position: 'absolute',right: '2px', top:'2px',cursor: 'pointer'}" theme="twoTone" type="close-circle" @click="doImageDel" />
              </div>
            </div>
          </FormItem>
          <FormItem label="更多描述">
            <Input type="textarea" allowClear placeholder="请输入更多描述" 
            v-decorator="['sixthItem', { rules: [{ required: false }] }]"/>
          </FormItem>
        </Form>
        <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <Button :style="{ marginRight: '8px' }" @click="handlerCancel">
          取消
        </Button>
        <Button type="primary" @click="handlerSubmit">提交</Button>
      </div>
    </drawer>
  </div>
</template>

<script>

import { 
  Table, 
  Button, 
  message, 
  Form, 
  Drawer, 
  Input, 
  Select, 
  Row, 
  Col,
  Icon,
  // Spin,
  DatePicker,
  Pagination,
  } from 'ant-design-vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
import uploadFile from '../../../components/uploadFile';
import { bannerAdminGetByTypeApi, bannerSubmitApi, bannerBatchDeleteApi, bannerUpdateApi } from '../../../service/home';

const FormItem = Form.Item;
const selectOption = Select.Option;
const InputSearch = Input.Search;

const comstyle = {
  container: {
    position: 'relative',
    width: '110px',
    height: '80px', 
    padding: '8px',
    marginTop: '15px',
    border: '1px dashed #1890ff'
  }
}

export default {
  components: {
  Row,
  Col,
  Icon,
//  Spin,
  Input,
  Select,
  Table,
  Button,
  Drawer,
  Form,
  FormItem,
  DatePicker,
  Pagination,
  InputSearch,
  selectOption,
  uploadFile
  },
  data() {
    return {
      columns: [
        {
          title: '楼图片',
          key: 'linkUrl',
          customRender:(record) => {
            return <img src={record.linkUrl} style={{width:'50px',height:'50px'}}/>
          }
        },
        {
          title: '楼名称',
          key: 'title',
          scopedSlots: { customRender: 'Lname' },
        },
        {
          title: '发布人',
          dataIndex: 'bannerName',
          key: 'bannerName',
        },
        {
          title: '发布时间',
          key: 'channel',
          customRender:(record) => {
            return <span>{ moment(record.channel).format('YYYY-MM-DD') }</span>
          }
        },
        {
          title: '信息类型',
          dataIndex: 'firstItem',
          key: 'firstItem',
        },
        {
          title: '发布商圈',
          dataIndex: 'secondItem',
          key: 'secondItem',
        },
        {
          title: '关联楼宇',
          dataIndex: 'thirdItem',
          key: 'thirdItem',
        },
        {
          title: '发布来源',
          dataIndex: 'fourthItem',
          key: 'fourthItem',
        },
      ],
      comstyle,
      isAdd: Boolean,
      search: '',
      areaData: [],
      list: [],
      visible: false,
      spinning: true,
      linkUrl: '',
      selectedRowKeys: [],
      pageNum: 1,
      total: 0,
      pageSize: 10,
      curID: 0,
      form: this.$form.createForm(this, { name: 'coordinated' }),
    }
  },
  props: {
    
  },
  computed: {
    formName() {
      return this.isAdd ? '新增楼' : '编辑楼';
    },
  },  
  mounted() {
    this.asyncList();
    this.asyncGetByType();
  }, 
  methods: {
    handlerEdit(record) {
      this.visible = true;
      this.isAdd = false;
      record.channel = moment(record.channel);
      this.$nextTick(() => {
        this.linkUrl = record.linkUrl;
        this.curID = record.id;
        this.form.setFieldsValue(record);
      })
    },
    handlerAdd() {
      this.visible = true;
      this.isAdd = true;
    },
    onChangePage(current) {
      this.pageNum = current;
      this.asyncList();
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    async handlerDel() {
      const { selectedRowKeys } = this;
      if (!selectedRowKeys.length) {
        message.warning('请先选择要删除的行！');
        return;
      }
      const params = {
        idString: selectedRowKeys.join(','),
      }
      const resData = await bannerBatchDeleteApi(params);
      if (!Number(resData.code)) { return message.error(resData.msg) }
      message.success('删除成功！');
      this.selectedRowKeys = [];
      this.asyncList();
    },
    // 图片上传
    handlerFile(linkUrl) {
      this.linkUrl = linkUrl;
    },
    // 图片删除
    doImageDel() {
      this.linkUrl = '';
    },
    // 搜索
    handlerSearch(title) {
      this.search = title;
      this.asyncList();
    },
    async asyncList() {
      const { pageNum, pageSize, search } = this;
      const params = {
        pageNum,
        pageSize,
        search,
        "type": 1
      }
      const resData = await bannerAdminGetByTypeApi(params);
      if (!Number(resData.code)) { return message.error(resData.msg) }
      const { total, list } = resData.data;
      this.list = list;
      this.total  =  total;
    },
    async asyncGetByType() {
      const params = {
        "pageNum": 0,
        "pageSize": 100,
        "type": 7
      }
      const resData = await bannerAdminGetByTypeApi(params);
      if (!Number(resData.code)) { return message.error(resData.msg) }
      this.areaData = resData.data.list;
    },
    handlerCancel() {
      this.visible = false;
      this.form.resetFields();
      this.doImageDel();
    },
    handlerSubmit () {
      this.form.validateFields(async (err) => {
        if (!err) {
          const formData = this.form.getFieldsValue();
          const { linkUrl, curID, isAdd } = this;
          if (!linkUrl) {
            return message.warning('请上传楼图片');
          }
          const postData = {
            "type": 1,
            ...formData,
            linkUrl: linkUrl,
          }
          if (isAdd) {
            await bannerSubmitApi(postData);
          } else {
            Object.assign(postData, { id: curID })
            await bannerUpdateApi(postData);
          }
          this.handlerCancel();
          this.asyncList();
        }
      });
    },
  },   
}
</script>

<style lang="less" scoped>
  .list-setting {
    .page-header {
      padding-top: 20px;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .section-btn {
        display: flex;
      }
    }
    .section-pagination {
      padding-top: 10px;
      float: right;
    }
    .image-con {
      background: red;
      position: relative;
      cursor: pointer;
    }
  }
</style>