---
sidebar_position: 2
slug: login-authentication
---

# Login Methods {#login-authentication}
The JitAi platform supports multiple login authentication methods, including account password login, mobile phone login, DingTalk login, WeChat Work login, WeChat login, WeChat Official Account login, WeChat Mini Program login, GitHub login, and Google login, meeting user access and authentication needs in different scenarios, helping enterprises and individual users access applications conveniently and securely.

## Login Method Creation {#login-method-creation}
JitAi supports developers in freely configuring and adding multiple login methods according to actual business needs, helping applications achieve multi-platform convenient access and unified authentication management.

![](./img/auth/login-method-creation.png)

In the element tree of the development area, find `Login Methods`, click the `+` button on the right to bring up the login method selection list. Developers can select and configure the required login methods according to business scenarios, quickly completing the integration.

## Account Password Login {#account-password-login}
Account password login is the most commonly used and basic login method, allowing users to securely access applications by entering their account and password. When creating a JitAi application, an account password login method is automatically created.

![](./img/auth/account-password-creation.png)

When developers choose to create `Account Password Login`, a `Create Account Password Login` window will pop up. In this window, you need to fill in the login method name (English name is automatically generated) and set the password length (default 8-32 characters, must include numbers and letters). After clicking `Confirm`, the creation is completed and you can enter the detailed configuration page.

![](./img/auth/account-password-config.png)

On the detailed configuration page on the right, developers can flexibly adjust the login method name, password length, and password strength requirements.

Password strength rules support flexible combinations of the following five types of character requirements: numbers, letters, lowercase letters, uppercase letters, and special characters. Developers can freely configure combinations of these types according to actual security requirements, effectively improving account security and meeting business scenarios of different levels.

## Mobile Phone Login {#mobile-phone-login}
Mobile phone login is a convenient and secure login method. Users can complete identity verification by entering their mobile phone number and receiving SMS verification codes, suitable for mobile applications and scenarios requiring quick registration/login.

![](./img/auth/phone-number-creation.png)

When developers choose to create `Mobile Phone Login`, a `Create Mobile Phone Login` window will pop up. In this window, you need to fill in the login method name (English name is automatically generated), select SMS service and SMS template code for sending verification codes. Below there is a checkbox `Support user registration during login` (checked by default).

![](./img/auth/create-sms.png)

In the SMS service selection box, you can choose configured SMS services from the dropdown menu, or click the `+New` button to add a new SMS service. The platform currently supports mainstream SMS service providers such as Alibaba Cloud SMS, Twilio, and AWS SNS, meeting the needs of different business scenarios.

### Alibaba Cloud SMS

Alibaba Cloud SMS service is a leading SMS communication platform in China, providing high-concurrency, stable and reliable SMS sending capabilities. Its services cover the global scope, with comprehensive review mechanisms and rich application scenario support, particularly suitable for domestic enterprises and applications targeting Chinese users.

![](./img/auth/aliyun-sms-config.png)

In the `Create Alibaba Cloud SMS` window, you need to fill in SMS service name (English name is automatically generated), AccessKey, AccessSecret, and SMS signature (verifySign) and other Alibaba Cloud account credential information. Related credentials can be created and managed on the Access Control page of [Alibaba Cloud Console](https://ram.console.aliyun.com/).

### Twilio

Twilio is a leading global cloud communication platform that provides programmable SMS, voice and video communication services. Its SMS service covers more than 200 countries and regions worldwide, with high availability and flexible API interfaces, particularly suitable for international applications and overseas business scenarios.

![](./img/auth/twilio-sms-config.png)

In the `Create Twilio SMS` window, you need to fill in SMS service name (English name is automatically generated), Account SID, Auth Token and other Twilio account credential information. This information can be obtained from the account settings page of [Twilio Console](https://console.twilio.com/).

### AWS SNS

Amazon Simple Notification Service (SNS) is a fully managed publish/subscribe messaging and mobile notification service provided by Amazon Web Services. AWS SNS SMS service has high scalability and reliability, supports SMS sending worldwide, and is suitable for enterprise applications that already use the AWS ecosystem.

![](./img/auth/aws-sns-config.png)

In the `Create AWS SNS SMS` window, you need to fill in SMS service name (English name is automatically generated), Access Key ID, Secret Access Key, Region and other AWS account credential information. Related credentials can be created and managed in the IAM service of [AWS Console](https://console.aws.amazon.com/).

## DingTalk Custom QR Code Login {#dingtalk-custom-qr-login}
DingTalk Custom QR Code Login is an enterprise-level identity authentication method based on the DingTalk platform. Users can securely and conveniently log in to the system through DingTalk client QR code authorization. This method is suitable for enterprise internal employee unified identity authentication, passwordless login and other scenarios, effectively improving login experience and security. When creating a DingTalk custom organizational structure, the system will automatically generate a DingTalk custom QR code login method for the organizational structure. Developers can also independently add DingTalk custom QR code login methods according to actual needs.

![](./img/auth/dingtalk-qr-scan.gif)

When developers choose to create `DingTalk Custom QR Code Login`, a `Create DingTalk Custom QR Code Login` configuration window will pop up. In this window, you need to fill in the login method name (English name is automatically generated) and configure the credential information of DingTalk custom application, including `CorpId` (Enterprise ID), `AgentID`, `appKey`, and `appSecret`. For how to obtain related configuration information, please refer to [Organizational Structure Documentation](./organizational-structure#dingtalk-custom-organization).

![](./img/auth/dingtalk-login-config.png)

After completing the relevant configuration, the system will automatically create a DingTalk QR code login method and jump to the login method configuration page for your subsequent viewing and management.

:::tip
DingTalk Custom QR Code Login method needs to be used in conjunction with [DingTalk Custom Organizational Structure](./organizational-structure#dingtalk-custom-organization). When creating a DingTalk custom organizational structure, the system will automatically synchronize and generate the corresponding QR code login method without separate configuration.
:::

## WeChat Work Custom QR Code Login {#wechat-work-custom-qr-login}
WeChat Work Custom QR Code Login is an enterprise-level QR code authentication method based on the WeChat Work platform. Users can quickly and securely log in to the system through WeChat Work client QR code authorization. This method is suitable for employee unified authentication and passwordless login scenarios under the WeChat Work ecosystem. When creating a WeChat Work custom organizational structure, the system will automatically generate a WeChat Work custom QR code login method. Developers can also independently add WeChat Work custom QR code login methods according to actual business needs.

![](./img/auth/wechat-work-qr-scan.gif)

When developers choose to create `WeChat Work Custom QR Code Login`, a `Create WeChat Work Custom QR Code Login` configuration window will pop up. In this window, you need to fill in the login method name (English name is automatically generated) and configure the credential information of WeChat Work custom application, including `CorpId` (Enterprise ID), `AgentID`, and `Secret`. For how to obtain related configuration information, please refer to [Organizational Structure Documentation](./organizational-structure#wechat-work-custom-organization).

![](./img/auth/wechat-work-login-config.png)

After configuration is completed, the system will automatically generate a WeChat Work QR code login method and jump to the login method configuration page for your subsequent viewing and management.

:::tip
WeChat Work Custom QR Code Login method needs to be used in conjunction with [WeChat Work Custom Organizational Structure](./organizational-structure#wechat-work-custom-organization). When creating a WeChat Work custom organizational structure, the system will automatically synchronize and generate the corresponding QR code login method without separate configuration.
:::

## WeChat Login {#wechat-login}
WeChat Login is a third-party login method based on the WeChat Open Platform, allowing users to quickly and securely log in to the system through WeChat account authorization. This method is suitable for C-end user application scenarios, greatly improving user registration and login convenience, reducing user churn rates, while supporting user information acquisition and management within the WeChat ecosystem.

![](./img/auth/wechat-login-creation.png)

When developers choose to create a `WeChat Login` method, the system will pop up a `Create WeChat Login` configuration window. In this window, you need to fill in the login method name (English name is automatically generated) and configure the relevant credential information of WeChat Open Platform, including `AppID` and `AppSecret`.

**WeChat Credential Acquisition**:

![](./img/auth/wechat-app-creation.png)

1. Log in to [WeChat Open Platform](https://open.weixin.qq.com/).
2. In the `Management Center`, select `Create Website Application` in the `Website Applications` tab, fill in the application information according to the guide and submit for review.
3. After approval, you can obtain the `AppID` and `AppSecret` of the application on the application details page for WeChat login integration configuration in the system.

For detailed operation guides, please refer to [WeChat Open Platform Official Documentation](https://open.weixin.qq.com/).

:::tip Note
The AppSecret of WeChat applications is only displayed once during creation. Please keep it safe as it cannot be viewed again later.
:::

## WeChat Official Account Login {#wechat-official-account-login}
WeChat Official Account Login refers to a method where users log into the system using their WeChat identity after scanning a QR code with WeChat and authorizing. Users need to follow the designated WeChat Official Account and complete authorization in WeChat to achieve secure and convenient identity authentication. This login method is suitable for scenarios that require establishing long-term relationships with users, pushing messages, or building membership systems, commonly used in enterprise services, content distribution, O2O and other application domains.

![](./img/auth/wechat-official-account-creation.gif)

When developers choose to create a `WeChat Official Account Login` method, the system will pop up a `Create WeChat Official Account Login` configuration window. In this window, you need to fill in the login method name (English name will be automatically generated) and enter the relevant credential information of the WeChat Official Account, including `AppID` and `AppSecret`. Additionally, you can choose whether to check `Support user registration during login` (checked by default). If checked, the system will display an `Organizational structure for automatic user registration` selection box, requiring selection from existing organizational structures.

**Official Account Credential Acquisition**:

![](./img/auth/wechat-id-view.png)
As shown in the figure above, log in to [WeChat Public Platform](https://mp.weixin.qq.com/), click `Settings & Development` - `Official Account Settings` in the left menu to view and copy basic information such as the Original ID and WeChat ID of the Official Account.

![](./img/auth/official-account-config-view.png)
As shown in the figure above, enter the `Settings & Development` - `Development Interface Management` - `Basic Configuration` page to obtain AppID (Application ID) and AppSecret (Application Secret).

:::tip Note
AppSecret (Developer Password) is only displayed once during creation. Please keep it safe as it cannot be viewed again later.
:::

## WeChat Mini Program Login {#wechat-mini-program-login}
WeChat Mini Program Login is a third-party login method based on the WeChat Mini Program platform. Users can achieve fast and secure identity authentication through WeChat Mini Program authorization. This method is suitable for mobile applications, lightweight services, tool-type products and other scenarios, improving user experience and lowering registration and login barriers.

![](./img/auth/wechat-miniapp-login.gif)

When developers choose to create a `WeChat Mini Program Login` method, the system will pop up a `Create WeChat Mini Program Login` configuration window. In this window, you need to fill in the login method name (English name will be automatically generated) and configure the relevant credential information of the WeChat Mini Program, including `AppID` and `AppSecret`. Additionally, you can choose whether to check `Support user registration during login` (checked by default).

To learn about the WeChat Mini Program development process, please refer to [WeChat Official Development Documentation](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html#%E7%94%B3%E8%AF%B7%E8%B4%A6%E5%8F%B7).

## GitHub Login {#github-login}
GitHub Login is based on the GitHub Open Platform. Users can securely and conveniently log in to the system through GitHub account authorization. This method is particularly suitable for developer communities, technical products, and open source project management scenarios, helping users unify identity information management.

![](./img/auth/github-login.gif)

When creating `GitHub Login`, the system will pop up a configuration window. Please fill in the login method name (English name is automatically generated) and enter GitHub's `ClientID` and `ClientSecret`. This information can be obtained in OAuth Apps of [GitHub Developer Center](https://github.com/settings/developers). After configuration is completed, the system will automatically generate a GitHub login method and jump to the login method configuration page for subsequent management.

## Google Login {#google-login}
Google Login is based on the Google Open Platform. Users can quickly and securely log in to the system through Google account authorization. This method is suitable for applications targeting international users, SaaS platforms, educational products, etc., improving user experience and simplifying the registration process.

![](./img/auth/google-login.gif)

When creating `Google Login`, the system will pop up a configuration window. Please fill in the login method name (English name is automatically generated) and enter Google's `ClientID` and `ClientSecret`. Related information can be obtained in OAuth 2.0 credentials of [Google Cloud Console](https://console.cloud.google.com/apis/credentials). After configuration is completed, the system will automatically generate a Google login method and jump to the login method configuration page for subsequent viewing and management.

:::tip
Create Google login applications on Google Cloud Platform, and international servers are required.
::: 
