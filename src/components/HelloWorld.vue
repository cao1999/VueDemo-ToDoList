<template>
  <div>

    <h2 class="header">ToDoList</h2>

    <el-row :gutter="10" justify="center">
      <el-col  :lg="{span: 8, offset: 8}">
          <div>
              <el-input v-model="personName">
                  <template slot="prepend">办事人</template>
              </el-input>
              <el-input v-model="eventContent">
                  <template slot="prepend">事件内容</template>
              </el-input>
              <el-input v-model="time">
                  <template slot="prepend">时间</template>
              </el-input>
          </div>
      </el-col>
    </el-row>

    <el-button type="primary" @click="submitForm">提交</el-button>

    <el-row>
        <el-col :lg="{span: 16, offset: 4}">
            <el-table :data="tableData" border stripe>
                <el-table-column prop="name" label="办事人"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column label="操作">
                    <!--这里挺重要的-->
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="primary" size="small" style="margin: 0;">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
    name: 'HelloWorld',

    methods: {
        deleteRow(index, rows) {
            //这里也要将本地存储的数据删除掉
            let storage = window.localStorage;

            //数据删除后 将新的数据放到本地存储中去
            rows.splice(index, 1);

            //清空本地存储 后再将新的数据放进去
            storage.clear();

            //将最新的数据放到存储中  将数据转成字符串 一定要注意
            storage.setItem("eventLists", JSON.stringify(this.tableData));

        },

        //将内容存储到本地存储
        submitForm() {
             //进行判断 如果有输入框为空就不执行操作
              if(this.personName === "" || this.eventContent === "" || this.time === "") {
                alert("输入内容不能为空！！！");
               return;
             }
            //1.首先获取到输入框中的数据
            let data = {name: this.personName, content: this.eventContent, time: this.time};

            //2.获取本地存储  localStorage
            let storage = window.localStorage;

            //3.取出本地存储中的值 有就取出来 没有就取出来一个空数组 然后将data unShift进去
            //注意：本地存储只允许存放字符串 所以取出来的时候要转成对象 或数组
            let dataList = JSON.parse(storage.getItem("eventLists") || "[]");

            //4.将data unShift到这个数组中去
            //将数组放到本地存储中
            //注意：向本地存储存放值时 必须是字符串类型的
            //注意：使用setItem时 要传入两个参数 第一个是名字  第二个是内容
            dataList.unshift(data);
            storage.setItem("eventLists",JSON.stringify(dataList));

            //5.清空输入框
            this.personName = this.eventContent = this.time = "";

            //6.添加完数据后显示到表格中
            this.addForm();

        },

        //将内容展示到表格当中
        addForm() {
            let storage = window.localStorage;

            let list = storage.getItem("eventLists");

            this.tableData = JSON.parse(list);
        }

    },

    //钩子函数  如其名是一个函数
    //用处：在vue实例被创建之前调用数据
    created: function() {
        this.addForm();
    },



    data() {
        return {
            personName: '',
            eventContent: "",
            time: "",
            tableData: [],
        }
    }
}
</script>

<style scoped lang="less">
.header {
    color: #409EFF;
}    
    
.el-button {
    margin-bottom: 20px;
}

.el-input {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 30px;
    }
}
</style>