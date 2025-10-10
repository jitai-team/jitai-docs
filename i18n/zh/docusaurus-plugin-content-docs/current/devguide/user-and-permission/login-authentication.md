---
sidebar_position: 2
slug: login-authentication
---

# 登录认证 {#login-authentication}

JitAi平台支持多种登录认证方式，包括账号密码登录、手机号登录、钉钉自建二维码登录、企业微信自建二维码登录、微信登录、微信公众号登录、微信小程序登录、GitHub登录、Google登录和Microsoft Teams认证，满足不同场景下用户的接入和认证需求，助力企业和个人用户便捷、安全地访问应用。

## 创建登录认证 {#creating-login-method}

JitAi支持开发者根据实际业务需求，自由配置和新增多种登录认证方式，帮助应用实现多端便捷接入与统一认证管理。

![登录方式创建](./img/auth/login-method-creation.png)

在开发区的元素树中，找到`登录认证`，点击右侧的`+`按钮，即可弹出登录方式选择列表。开发者可根据业务场景，选择并配置所需的登录认证方式，快速完成接入。

## 账号密码登录 {#account-password-login}

账号密码登录是最常用且基础的登录方式，允许用户通过输入账号和密码安全地访问应用，在创建JitAi应用时会自动创建一个账号密码登录方式。

![账号密码创建](./img/auth/account-password-creation.png)

当开发者选择创建`账号密码登录`时，将弹出`新建账号密码登录`窗口。在该窗口中，需填写登录方式名称（英文名自动生成），设置密码长度（默认8-32位，需包含数字和字母）。点击`确定`后，即可完成创建并进入详细配置页面。

![账密配置](./img/auth/account-password-config.png)

在右侧的详情配置页面，开发者可灵活调整登录方式名称、密码长度及密码强度要求。

密码强度规则支持灵活组合以下五种类型的字符要求：数字、字母、小写字母、大写字母、特殊字符。开发者可根据实际安全需求，自由配置这些类型的组合，有效提升账户安全性，满足不同等级的业务场景。

## 手机号登录 {#mobile-phone-login}

手机号登录是一种便捷且安全的登录认证方式。用户通过输入手机号并接收短信验证码即可完成身份验证，适用于移动端应用及需要快速注册/登录的场景。

![手机号创建](./img/auth/phone-number-creation.png)

当开发者选择创建`手机号登录`时，会弹出`新建手机号登录`窗口。在该窗口中，需要填写登录方式名称（英文名自动生成）、选择用于发送验证码的短信服务及短信模板编码。下方有一个"登录时支持用户注册"复选框（默认勾选）。

![创建短信服务](./img/auth/create-sms.png)

在短信服务选择框中，可以从下拉菜单选择已配置的短信服务，或点击`+新建`按钮添加新的短信服务。平台目前支持主流短信服务商，如阿里云短信、Twilio、AWS SNS，满足不同业务场景的需求。

### 阿里云短信 {#aliyun-sms}

阿里云短信服务是中国领先的短信通信平台，具备高并发、稳定可靠的短信发送能力，服务范围覆盖全球，拥有完善的审核机制和丰富的应用场景支持，特别适合国内企业及面向中国用户的应用。

![阿里云短信配置](./img/auth/aliyun-sms-config.png)

在`新建阿里云短信`窗口中，需要填写短信服务名称（英文名自动生成）、AccessKey、AccessSecret、短信签名（verifySign）等阿里云账号凭证信息。相关凭证可在[阿里云控制台](https://ram.console.aliyun.com/)的访问控制页面创建和管理。

### Twilio {#twilio}

Twilio 是全球领先的云通信平台，提供可编程短信、语音和视频通信服务。其短信服务覆盖全球 200 多个国家和地区，具备高可用性和灵活的 API 接口，特别适合国际化应用和海外业务场景。

![Twilio短信配置](./img/auth/twilio-sms-config.png)

在`新建Twilio短信`窗口中，需要填写短信服务名称（英文名自动生成）、Account SID、Auth Token等Twilio账号凭证信息。该信息可在[Twilio控制台](https://console.twilio.com/)的账号设置页面获取。

### AWS SNS {#aws-sns}

Amazon Simple Notification Service (SNS) 是亚马逊云服务提供的完全托管式发布/订阅消息传递和移动通知服务。AWS SNS短信服务具备高可扩展性和可靠性，支持全球短信发送，适合已使用AWS生态的企业应用。

![AWS SNS配置](./img/auth/aws-sns-config.png)

在`新建AWS SNS`窗口中，需要填写短信服务名称（英文名自动生成）、Access Key ID、Secret Access Key、Region等AWS账号凭证信息。相关凭证可在[AWS控制台](https://console.aws.amazon.com/)的IAM服务中创建和管理。

## 钉钉自建二维码登录 {#dingtalk-custom-qr-login}

钉钉自建二维码登录是基于钉钉平台的企业级身份认证方式。用户可通过钉钉客户端二维码授权，安全便捷地登录系统。该方式适用于企业内部员工统一身份认证、免密登录等场景，有效提升登录体验和安全性。在创建钉钉自定义组织架构时，系统会自动为该组织架构生成钉钉自建二维码登录方式。开发者也可根据实际需要，独立新增钉钉自建二维码登录认证方式。

![钉钉二维码扫描](./img/auth/dingtalk-qr-scan.gif)

当开发者选择创建`钉钉自建二维码登录`时，将弹出`新建钉钉自建二维码登录`配置窗口。在该窗口中，需填写登录方式名称（英文名自动生成），配置钉钉自定义应用的凭证信息，包括`CorpId`（企业ID）、`AgentID`、`appKey`和`appSecret`。相关配置信息获取方法，请参考[组织架构文档](./organizational-structure#dingtalk-custom-organization)。

![钉钉登录配置](./img/auth/dingtalk-login-config.png)

完成相关配置后，系统将自动创建钉钉二维码登录方式，并跳转到登录方式配置页面，供您后续查看和管理。

:::tip
钉钉自建二维码登录方式需要配合[钉钉自定义组织架构](./organizational-structure#dingtalk-custom-organization)使用。在创建钉钉自定义组织架构时，系统会自动同步生成对应的二维码登录方式，无需单独配置。
:::

## 企业微信自建二维码登录 {#wechat-work-custom-qr-login}

企业微信自建二维码登录是基于企业微信平台的企业级二维码认证方式。用户可通过企业微信客户端二维码授权，快速安全地登录系统。该方式适用于企业微信生态下的员工统一认证和免密登录场景。在创建企业微信自定义组织架构时，系统会自动生成企业微信自建二维码登录方式。开发者也可根据实际业务需要，独立新增企业微信自建二维码登录认证方式。

![企业微信二维码扫描](./img/auth/wechat-work-qr-scan.gif)

当开发者选择创建`企业微信自建二维码登录`时，将弹出`新建企业微信自建二维码登录`配置窗口。在该窗口中，需填写登录方式名称（英文名自动生成），配置企业微信自定义应用的凭证信息，包括`CorpId`（企业ID）、`AgentID`和`Secret`。相关配置信息获取方法，请参考[组织架构文档](./organizational-structure#wechat-work-custom-organization)。

![企业微信登录配置](./img/auth/wechat-work-login-config.png)

配置完成后，系统将自动生成企业微信二维码登录方式，并跳转到登录方式配置页面，供您后续查看和管理。

:::tip
企业微信自建二维码登录方式需要配合[企业微信自定义组织架构](./organizational-structure#wechat-work-custom-organization)使用。在创建企业微信自定义组织架构时，系统会自动同步生成对应的二维码登录方式，无需单独配置。
:::

## 微信登录 {#wechat-login}

微信登录是基于微信开放平台的第三方登录方式，允许用户通过微信账号授权，快速安全地登录系统。该方式适用于C端用户应用场景，大大提升用户注册和登录的便利性，降低用户流失率，同时支持在微信生态内获取和管理用户信息。

![微信登录创建](./img/auth/wechat-login-creation.png)

当开发者选择创建`微信登录`方式时，系统将弹出`新建微信登录`配置窗口。在该窗口中，需填写登录方式名称（英文名自动生成），配置微信开放平台的相关凭证信息，包括`AppID`和`AppSecret`。

**微信凭证获取**：

![微信应用创建](./img/auth/wechat-app-creation.png)

1. 登录[微信开放平台](https://open.weixin.qq.com/)。
2. 在`管理中心`中，选择`网站应用`标签下的`创建网站应用`，根据指引填写应用信息并提交审核。
3. 审核通过后，可在应用详情页面获取应用的`AppID`和`AppSecret`，用于在系统中进行微信登录集成配置。

详细操作指南，请参考[微信开放平台官方文档](https://open.weixin.qq.com/)。

:::tip 注意
微信应用的AppSecret仅在创建时显示一次，请妥善保管，后续无法再次查看。
:::

## 微信公众号登录 {#wechat-official-account-login}

微信公众号登录是指用户使用微信扫码并授权后，以微信身份登录系统的方式。用户需要关注指定的微信公众号，并在微信中完成授权，实现安全便捷的身份认证。该登录方式适用于需要与用户建立长期关系、推送消息或构建会员体系的场景，常用于企业服务、内容分发、O2O等应用领域。

![微信公众号创建](./img/auth/wechat-official-account-creation.gif)

当开发者选择创建`微信公众号登录`方式时，系统将弹出`新建微信公众号登录`配置窗口。在该窗口中，需填写登录方式名称（英文名将自动生成），输入微信公众号的相关凭证信息，包括`AppID`和`AppSecret`。另外，可选择是否勾选`登录时支持用户注册`（默认勾选）。如果勾选，系统将显示`自动用户注册的组织架构`选择框，需要从现有组织架构中选择。

**公众号凭证获取**：

![微信ID查看](./img/auth/wechat-id-view.png)

如上图所示，登录[微信公众平台](https://mp.weixin.qq.com/)，点击左侧菜单的`设置与开发`-`公众号设置`，可查看并复制公众号的原始ID、微信号等基本信息。

![公众号配置查看](./img/auth/official-account-config-view.png)

如上图所示，进入`设置与开发`-`开发接口管理`-`基本配置`页面，可获取AppID（应用ID）和AppSecret（应用密钥）。

:::tip 注意
AppSecret（开发者密码）仅在创建时显示一次，请妥善保管，后续无法再次查看。
:::

## 微信小程序登录 {#wechat-mini-program-login}

微信小程序登录是基于微信小程序平台的第三方登录方式。用户可通过微信小程序授权，实现快速安全的身份认证。该方式适用于移动应用、轻量级服务、工具型产品等场景，提升用户体验，降低注册登录门槛。

![微信小程序登录](./img/auth/wechat-miniapp-login.gif)

当开发者选择创建`微信小程序登录`方式时，系统将弹出`新建微信小程序登录`配置窗口。在该窗口中，需填写登录方式名称（英文名将自动生成），配置微信小程序的相关凭证信息，包括`AppID`和`AppSecret`。另外，可选择是否勾选`登录时支持用户注册`（默认勾选）。

了解微信小程序开发流程，请参考[微信官方开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html#%E7%94%B3%E8%AF%B7%E8%B4%A6%E5%8F%B7)。

## GitHub登录 {#github-login}

GitHub登录基于GitHub开放平台，用户可通过GitHub账号授权，安全便捷地登录系统。该方式特别适合开发者社区、技术产品、开源项目管理等场景，帮助用户统一身份信息管理。

![GitHub登录](./img/auth/github-login.gif)

创建`GitHub登录`时，系统将弹出配置窗口。请填写登录方式名称（英文名自动生成），输入GitHub的`ClientID`和`ClientSecret`。该信息可在[GitHub开发者中心](https://github.com/settings/developers)的OAuth Apps中获取。配置完成后，系统将自动生成GitHub登录方式，并跳转到登录方式配置页面，供后续管理。

## Google登录 {#google-login}

Google登录基于Google开放平台，用户可通过Google账号授权，快速安全地登录系统。该方式适用于面向国际用户的应用、SaaS平台、教育产品等，提升用户体验，简化注册流程。

![Google登录](./img/auth/google-login.gif)

创建`Google登录`时，系统将弹出配置窗口。请填写登录方式名称（英文名自动生成），输入Google的`ClientID`和`ClientSecret`。相关信息可在[Google云控制台](https://console.cloud.google.com/apis/credentials)的OAuth 2.0凭据中获取。配置完成后，系统将自动生成Google登录方式，并跳转到登录方式配置页面，供后续查看和管理。

:::tip
在Google云平台创建Google登录应用，需要国际服务器。
:::