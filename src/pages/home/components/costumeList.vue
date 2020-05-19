<template>
  <div class="list-setting">
    <section class="page-header">
      <InputSearch enterButton placeholder="请输入楼名称" style="width: 300px" @search="handlerSearch" />
      <div class="section-btn">
        <Button type="danger" @click="handlerDel">
          <Icon type="delete" />删除楼
        </Button>&nbsp;&nbsp;
        <Button type="primary" @click="handlerAdd">
          <Icon type="plus" />新增楼
        </Button>
      </div>
    </section>
    <Table
      :columns="columns"
      :pagination="false"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :dataSource="list"
      rowKey="id"
    >
      <template slot="Lname" slot-scope="text, record">
        <a @click="() => handlerEdit(record)">【{{ record.fifthItem }}】{{ record.title }}</a>
      </template>
    </Table>
    <section class="section-pagination">
      <Pagination
        @change="onChangePage"
        :showTotal="(total) => `一共 ${total} 条`"
        :current="pageNum"
        :total="total"
      />
    </section>
    <Drawer
      :title="formName"
      :width="600"
      @close="handlerCancel"
      :visible="visible"
      :bodyStyle="{ paddingBottom: '80px' }"
    >
      <Form layout="vertical" :form="form">
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="楼名称">
              <Input
                placeholder="请输入楼名称"
                v-decorator="[
                  'title',
                  { rules: [{ required: true, message: '请输入楼名称!' }] },
                ]"
              />
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="发布人">
              <Input
                placeholder="请输入发布人"
                v-decorator="[
                  'bannerName',
                  { rules: [{ required: true, message: '请输入发布人!' }] },
                ]"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="发布时间">
              <DatePicker
                style="width: 100%"
                placeholder="请输入发布时间"
                format="YYYY-MM-DD"
                v-decorator="[
                  'channel',
                  {
                    rules: [{ required: true, message: '请选择发布时间!' }],
                  },
                ]"
              />
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="发布区域">
              <Select
                placeholder="请选择"
                v-decorator="[
                  'fifthItem',
                  { rules: [{ required: true, message: '请选择发布区域!' }] },
                ]"
              >
                <selectOption
                  v-for="item in areaData"
                  :key="item.id"
                  :value="item.title"
                >{{ item.title }}</selectOption>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="发布商圈">
              <Input
                placeholder="请输入发布商圈"
                v-decorator="['secondItem', { rules: [{ required: false }] }]"
              />
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="关联楼宇">
              <Input
                placeholder="请输入关联楼宇"
                v-decorator="['thirdItem', { rules: [{ required: false }] }]"
              />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col :span="12">
            <FormItem label="发布来源">
              <Input
                placeholder="请输入发布来源"
                v-decorator="['fourthItem', { rules: [{ required: false }] }]"
              />
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="信息类型">
              <Input
                placeholder="请输入信息类型"
                v-decorator="['firstItem', { rules: [{ required: false }] }]"
              />
            </FormItem>
          </Col>
        </Row>
        <FormItem label="* 楼图片">
          <uploadFile v-on:onUpload="handlerFile" />
          <div :style="comstyle.container">
            <div v-show="linkUrl">
              <img :style="comstyle.lstyle" :src="linkUrl" />
              <Icon
                :style="{
                  position: 'absolute',
                  right: '2px',
                  top: '2px',
                  cursor: 'pointer',
                }"
                theme="twoTone"
                type="close-circle"
                @click="doImageDel"
              />
            </div>
          </div>
        </FormItem>
        <FormItem label="更多描述">
          <quill-editor :options="editorOption" v-model="sixthItem" ref="myQuillEditor"></quill-editor>
          <input
            style="display: none"
            class="upload-images"
            type="file"
            multiple="multiple"
            @change="handlerFile1"
          />
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
        <Button :style="{ marginRight: '8px' }" @click="handlerCancel">取消</Button>
        <Button type="primary" @click="handlerSubmit">提交</Button>
      </div>
    </Drawer>
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
  Pagination
} from "ant-design-vue";
import moment from "moment";
import "moment/locale/zh-cn";
import uploadFile from "../../../components/uploadFile";
import { quillEditor } from "vue-quill-editor";
import { toolbarOptions } from "../../../utils/index";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import {
  bannerAdminGetByTypeApi,
  bannerSubmitApi,
  bannerBatchDeleteApi,
  bannerUpdateApi,
  imageUploadApi
} from "../../../service/home";

const FormItem = Form.Item;
const selectOption = Select.Option;
const InputSearch = Input.Search;

const comstyle = {
  container: {
    position: "relative",
    width: "120px",
    height: "80px",
    marginTop: "15px",
    border: "1px dashed #1890ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  lstyle: {
    width: "100px",
    height: "67px"
  }
};

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
    uploadFile,
    quillEditor
  },
  data() {
    return {
      columns: [
        {
          title: "楼图片",
          key: "linkUrl",
          customRender: record => {
            return (
              <img
                src={record.linkUrl}
                style={{ width: "50px", height: "50px" }}
              />
            );
          }
        },
        {
          title: "楼名称",
          key: "title",
          scopedSlots: { customRender: "Lname" }
        },
        {
          title: "发布人",
          dataIndex: "bannerName",
          key: "bannerName"
        },
        {
          title: "发布时间",
          key: "channel",
          customRender: record => {
            return <span>{moment(record.channel).format("YYYY-MM-DD")}</span>;
          }
        },
        {
          title: "信息类型",
          dataIndex: "firstItem",
          key: "firstItem"
        },
        {
          title: "发布商圈",
          dataIndex: "secondItem",
          key: "secondItem"
        },
        {
          title: "关联楼宇",
          dataIndex: "thirdItem",
          key: "thirdItem"
        },
        {
          title: "发布来源",
          dataIndex: "fourthItem",
          key: "fourthItem"
        }
      ],
      comstyle,
      isAdd: Boolean,
      search: "",
      areaData: [],
      list: [],
      visible: false,
      spinning: true,
      linkUrl: "",
      selectedRowKeys: [],
      pageNum: 1,
      total: 0,
      pageSize: 10,
      curID: 0,
      sixthItem: "",
      fileType: "",
      form: this.$form.createForm(this, { name: "coordinated" }),
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: value => {
                if (value) {
                  this.fileType = "image";
                  document.querySelector(".upload-images").click();
                }
              },
              video: value => {
                if (value) {
                  this.fileType = "video";
                  document.querySelector(".upload-images").click();
                }
              }
            }
          }
        }
      }
    };
  },
  props: {},
  computed: {
    formName() {
      return this.isAdd ? "新增楼" : "编辑楼";
    }
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
        this.sixthItem = record.sixthItem;
        this.form.setFieldsValue(record);
      });
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
        message.warning("请先选择要删除的行！");
        return;
      }
      const params = {
        idString: selectedRowKeys.join(",")
      };
      const resData = await bannerBatchDeleteApi(params);
      if (!Number(resData.code)) {
        return message.error(resData.msg);
      }
      message.success("删除成功！");
      this.selectedRowKeys = [];
      this.asyncList();
    },
    // 图片上传
    handlerFile(linkUrl) {
      this.linkUrl = linkUrl;
    },
    handlerFile1(e) {
      const file = e.target.files[0];
      const { fileType } = this;
      if (fileType === "image") {
        this.doUploadImage(file);
        return;
      }
      this.doUploadVideo(file);
    },
    // 富文本自定义上传图片
    doUploadImage(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("请上传jpeg或者png格式的图片");
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        message.error("请将图片大小控制在3M以内!");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file); // 读出 base64
      reader.onloadend = async () => {
        const base64 = reader.result.substring(reader.result.indexOf(",") + 1);
        const params = {
          base64
        };
        try {
          const resData = await imageUploadApi(params);
          if (!Number(resData.code)) {
            return message.error(resData.msg);
          }
          const linkUrl = resData.data;
          const quill = this.$refs.myQuillEditor.quill;
          const length = quill.getSelection().index;
          quill.insertEmbed(length, "image", linkUrl);
          quill.setSelection(length + 1);
        } catch (err) {
          console.log(err);
        }
      };
    },
    // 富文本自定义上传视频
    async doUploadVideo(file) {
      const fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) === -1
      ) {
        message.error("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        message.error("视频大小不能超过50MB");
        return false;
      }
      let formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("token");
      fetch("/api/image/uploadFile", {
        method: "POST",
        body: formData,
        headers: {
          adminToken: token
        }
      })
        .then(response => response.json())
        .then(resData => {
          const range = this.$refs.myQuillEditor.quill.getSelection();
          let index = 0;
          if (range === null) {
            index = 0;
          } else {
            index = range.index;
          }
          //将视频链接插入到当前的富文本当中
          this.$refs.myQuillEditor.quill.insertEmbed(
            index,
            "video",
            resData.data
          );
        });
    },
    // 图片删除
    doImageDel() {
      this.linkUrl = "";
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
        type: 1
      };
      const resData = await bannerAdminGetByTypeApi(params);
      if (!Number(resData.code)) {
        return message.error(resData.msg);
      }
      const { total, list } = resData.data;
      this.list = list;
      this.total = total;
    },
    async asyncGetByType() {
      const params = {
        pageNum: 0,
        pageSize: 100,
        type: 7
      };
      const resData = await bannerAdminGetByTypeApi(params);
      if (!Number(resData.code)) {
        return message.error(resData.msg);
      }
      this.areaData = resData.data.list;
    },
    handlerCancel() {
      this.visible = false;
      this.form.resetFields();
      this.sixthItem = "";
      this.doImageDel();
    },
    handlerSubmit() {
      this.form.validateFields(async err => {
        if (!err) {
          const formData = this.form.getFieldsValue();
          const { linkUrl, curID, isAdd, sixthItem } = this;
          if (!linkUrl) {
            return message.warning("请上传楼图片");
          }
          const postData = {
            type: 1,
            ...formData,
            linkUrl,
            sixthItem
          };
          if (isAdd) {
            await bannerSubmitApi(postData);
          } else {
            Object.assign(postData, { id: curID });
            await bannerUpdateApi(postData);
          }
          this.handlerCancel();
          this.asyncList();
        }
      });
    }
  }
};
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
