# 云开发 quickstart

### 扫邮项目技术点
### 前端:

- 1.	各机型界面适配,保证页面布满全屏且不会出现滚动条,重点是边框纹理的处理.
- 2.	用户授权处理(调用摄像头以及用户信息授权),重点做好个别用户拒绝授权的处理.
- 3.	小程序登陆功能前端实现,将用户加密信息传给后台,并全局保存后台签发的令牌token.
- 4.	调用摄像头扫描目标文字,并对摄像显示美化处理,实现AR效果.
- 5.	对扫描图片进行ocr识别(通过调用腾讯云人工智能接口),将识别到的文字和”邮”字匹配,并返回匹配结果.
- 6.	配合后台完成邮卡合成以及留资等其他操作.

### 后端:

- 1.	与小程序服务器进行授权交互，拿取用户对应的必要信息和通讯凭证
- 2.	用户获取邮卡及中奖记录的查看与导出Excel表格
- 3.	邮卡抽取概率的设置
- 4.	奖品设置（包括中奖的个数以及时间段概率）
- 5.	邮卡分享好友以及核销操作

### 图片展示

![prize.png](http://edu.bluej.cn/public/uploads/20190109/20190109203649prize.png)

![userinfo.png](http://edu.bluej.cn/public/uploads/20190109/20190109203649userinfo.png)

![mycard.png](http://edu.bluej.cn/public/uploads/20190109/20190109203649mycard.png)

![index.png](http://edu.bluej.cn/public/uploads/20190109/20190109203649index.png)

![hecheng.png](http://edu.bluej.cn/public/uploads/20190109/20190109203650hecheng.png)

![result.png](http://edu.bluej.cn/public/uploads/20190109/20190109203650result.png)

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

