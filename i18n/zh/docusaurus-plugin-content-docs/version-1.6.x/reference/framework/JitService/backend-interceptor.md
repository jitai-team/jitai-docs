---
slug: backend-interceptor
description: "后端拦截器 API 参考文档。完整的规格说明、方法和示例。"
---
# 后端拦截器
基于拦截器模式的 HTTP 请求处理组件，提供在请求处理前后自动执行业务逻辑的能力，支持权限验证、参数校验、日志记录、异常处理等横切关注点的统一管理。

拦截器元素分层结构为 Meta（interceptors.Meta） → Type（interceptors.Http） → 实例，仅支持全代码方式创建。

## 快速开始 
### 创建实例元素
#### 目录结构
```text title="推荐后端拦截器元素目录结构"
interceptors/
└── MyInterceptor/
    ├── e.json
    ├── __init__.py
    ├── interceptor.py
    └── handler.py (可选)
```

#### e.json 文件
```json title="后端拦截器 e.json 示例"
{
  "title": "自定义拦截器",
  "type": "interceptors.Http",
  "backendBundleEntry": ".",
  "icon": "lanjieqi1",
  "sort": 100
}
```

#### 业务逻辑代码
```python title="interceptor.py 实现"
from interceptors.Http import RequestInterceptor
from jit.commons.utils.logger import log

class MyInterceptor(RequestInterceptor):
    def before(self):
        """请求处理前执行"""
        log.info(f"请求开始: {self.request.path}")

    def after(self, resData=None):
        """请求处理后执行"""
        log.info(f"请求结束: {self.request.path}")

    def onSuccess(self, resData=None):
        """请求处理成功时执行"""
        log.info("请求处理成功")

    def onException(self, exc=None):
        """请求处理异常时执行"""
        log.error(f"请求处理异常: {exc}")
        return exc
```

## 方法 
### before
请求处理前执行的方法，用于参数校验、权限检查等预处理逻辑。

### after
请求处理后执行的方法，无论成功或失败都会执行，用于清理资源、记录日志等后处理逻辑。

### onSuccess
请求处理成功时执行的方法，仅在没有异常时调用。

### onException
请求处理异常时执行的方法，用于异常处理和日志记录。

## 属性
### request
当前 HTTP 请求对象，包含请求路径、参数、头信息等。

### functionDefine
当前请求对应的函数定义信息，通过解析请求路径获取目标元素的函数元数据。

## 高级特性
### 执行顺序
通过 e.json 中的 sort 字段控制拦截器执行顺序。

```json title="设置执行顺序"
{
  "title": "高优先级拦截器",
  "type": "interceptors.Http",
  "sort": 10
}
```

同时存在多个拦截器？
- 在请求到达时，按照 sort 升序执行 before
- 在请求结束时，按照 sort 升序执行 onException、onSuccess
- 在请求结束时，按照 sort 降序执行 after

### 平台内置拦截器
登录状态拦截器（`interceptors.Auths` sort=1）：当e.json的functionList中为某个函数配置了loginRequired=false时，会忽略对该函数的登录状态校验。

API 请求日志记录（`interceptors.Logger` sort=9980）

用户角色权限校验（`interceptors.Permission` sort=999）

请求验签（`interceptors.Sign` sort=100）：当e.json的functionList中为某个函数配置了ignoreSign=true时，会忽略对该函数的验签。

XML 请求体转 Dict（`interceptors.XmlParse` sort=999）

