---
sidebar_position: 11
---

# 对外开放HTTP接口
需要对合作方开放“按订单号查询订单状态”接口，并确保只有被授权的合作方才能调用。

## 新建服务元素并添加函数
在JitAi可视化开发工具中新建一个[标准服务](/docs/reference/开发框架/JitService/自定义业务服务.md)元素实例，并添加一个函数，填写函数说明、参数列表、返回值类型，并实现函数逻辑。

![创建服务函数](./img/jitservice/创建服务元素并添加函数.png)


## 对外授权服务函数
在JitAi可视化开发工具中新建一个[标准授权](/docs/reference/开发框架/JitService/API授权.md)元素实例，配置AccessKey和AccessSecret，并将服务函数的授权状态打开。

![对外授权服务函数](./img/jitservice/对外授权服务函数.png)


## 调用者使用SDK访问服务函数
- Python：从pypi获取SDK依赖包-[wanyun-JitSdk](https://pypi.org/project/wanyun-JitSdk/)
- Java：从Maven中央仓库获取SDK依赖包-[`pro.jit:jit-api-sdk`](https://mvnrepository.com/artifact/pro.jit/jit-api-sdk)
- Node.js：```npm install https://jit-front.oss-cn-hangzhou.aliyuncs.com/jitSdk/JitSdkForJs-0.0.3.tgz --save```

