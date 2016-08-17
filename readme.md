# My-word-memo

##### 我的单词背诵器

### Main function

- 自动完成从文件中批量导入词表


- 词表乱序输出


- 隐藏／显示中文，方便检查背诵效果


- 生词记录／重现

### Requirements

需要在[node.js](http://nodejs.org)环境中运行

 需要先安装[MongoDB](http://mongodb.org)， 并搭建本地数据库。

### Install

```
npm install
```

### Run

```
npm start
```

**NOTE:** 默认端口为3000，如果需要自定义，可将端口号作为命令行参数， 如：

```
npm start 4000
```

### 适用方法

##### 打开主页：http://localhost:3000

* 点击`开始背单词`可以选择相应的词库开始背单词，词库对应与项目文件中的`./lexicon`目录。
* 可以通过向`./lexicon`目录添加单词文件来添加自己的词库。
* 每次添加单词文件之后，需要点击主页上的`刷新数据库`来更新数据库。


**NOTE:** 文件中词表应按照以下格式录入保存，才能被正确读取：**中英文间用":"隔开，单词与单词间需要换行**。

>demotic: adj. 民众的，通俗的
>
>delude: v. 欺骗，哄骗
>
>demean: v. 贬抑，降低





