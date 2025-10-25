---
slug: mobile-login
---
# Phone Number Login
Mobile number login is an authentication method based on mobile phone numbers and SMS verification codes, implementing user identity authentication through SMS verification code validation. It handles verification code sending, verification code validation, and user login, supporting user registration, mobile number binding/unbinding, verification code validity period management, and other security features.

The hierarchical structure of mobile number login elements is Meta (auths.loginTypes.Meta) → Type (auths.loginTypes.PhoneType) → Instance. Developers can quickly create mobile number login instance elements through JitAi's visual development tools.

Of course, developers can also create their own Type elements or modify the official `auths.loginTypes.PhoneType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Creating Instance Elements
#### Directory Structure
```text title="Recommended Directory Structure"
auths/loginTypes/
├── myPhoneLogin/
│   ├── e.json
│   └── phoneConfig.json
```

#### e.json File
```json title="e.json Configuration Example"
{
  "type": "auths.loginTypes.PhoneType",
  "title": "Phone Number Login",
  "backendBundleEntry": ".",
  "frontBundleEntry": "./phoneConfig.json",
  "variables": [],
  "appId": "your.app.id",
  "extendType": "self"
}
```

#### Business Configuration File
```json title="phoneConfig.json Configuration Example"
{
  "allowRegister": 1,
  "smsFullName": "SMS.aliyunSms",
  "smsConfig": {
    "verifyTemplateCode": "SMS_123456789"
  }
}
```

#### Usage Example
```python title="Basic Usage Example"
# Get mobile number login element
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

# Send verification code
phone_auth.sendMessage("13800138000")

# Verify login
result = phone_auth.getLoginCode("13800138000", "123456")
print(result)  # {"loginCode": "xxx", "corpList": [...], "userId": "xxx"}
```

## Element Configuration
### e.json Configuration
| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| title | string | Yes | Element display name |
| type | string | Yes | Fixed value: auths.loginTypes.PhoneType |

### Business Configuration File
Configuration file name format is `{instance_name}.json`, containing business configuration for mobile number login:

| Configuration Item | Type | Required | Description |
|--------|------|------|------|
| allowRegister | number | No | Whether to allow registration, 0: not allow, 1: allow, default 1 |
| smsFullName | string | Yes | SMS service element fullName |
| smsConfig | object | No | SMS template configuration, containing verifyTemplateCode and verifySign |

## Methods
### sendMessage
Send SMS verification code to specified mobile number.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| phone | Stext | str | Yes | Mobile number, supports Chinese mainland mobile number format |

#### Return Value
```python
{
    "code": 200,
    "message": "success"
}
```

#### Usage Example
```python title="Send Verification Code Example"
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

# Send verification code
try:
    result = phone_auth.sendMessage("13800138000")
    print("Verification code sent successfully")
except Exception as e:
    print(f"Send failed: {e}")
```

### getLoginCode
Verify login through mobile number and verification code, get login code.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| phone | Stext | str | Yes | Mobile number |
| code | Stext | str | Yes | SMS verification code |

#### Return Value
```python
{
    "loginCode": "Login code",
    "corpList": [{"corpId": "Enterprise ID", "corpName": "Enterprise Name"}],
    "userId": "User ID"
}
```

#### Usage Example
```python title="Verify Login Example"
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

try:
    result = phone_auth.getLoginCode("13800138000", "123456")
    login_code = result["loginCode"]
    user_id = result["userId"]
    print(f"Login successful, User ID: {user_id}")
except Exception as e:
    print(f"Login failed: {e}")
```

### register
Register new user.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| phone | Stext | str | Yes | Mobile number |
| code | Stext | str | Yes | SMS verification code |
| nick | Stext | str | Yes | User nickname |

#### Return Value
Returns created user object.

#### Usage Example
```python title="User Registration Example"
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

try:
    user = phone_auth.register("13800138000", "123456", "New User")
    print(f"Registration successful, User ID: {user.userId.value}")
except Exception as e:
    print(f"Registration failed: {e}")
```

### bind
Bind mobile number authentication for current user.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | User ID |
| phone | Stext | str | Yes | Mobile number |
| code | Stext | str | Yes | SMS verification code |

#### Return Value
Success returns SUCCESS_RETURN.

#### Usage Example
```python title="Bind Phone Number Example"
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

try:
    phone_auth.bind("user123", "13800138000", "123456")
    print("Mobile number bound successfully")
except Exception as e:
    print(f"Binding failed: {e}")
```

### unbind
Unbind user's mobile number authentication.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | User ID |
| code | Stext | str | Yes | SMS verification code corresponding to mobile number |

#### Return Value
Success returns SUCCESS_RETURN.

#### Usage Example
```python title="Unbind Phone Number Example"
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

try:
    phone_auth.unbind("user123", "123456")
    print("Mobile number unbound successfully")
except Exception as e:
    print(f"Unbinding failed: {e}")
```

### checkMyMessage
Verify current user's verification code, return password modification credential.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| code | Stext | str | Yes | Verification code for current user's mobile number |

#### Return Value
```python
{
    "ticket": "Credential valid for 5 minutes"
}
```

#### Usage Example
```python title="Verify Current User Verification Code Example"
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

try:
    result = phone_auth.checkMyMessage("123456")
    ticket = result["ticket"]
    print(f"Verification successful, Ticket: {ticket}")
except Exception as e:
    print(f"Verification failed: {e}")
```

### updatePhone
Update user's mobile number.

#### Parameter Details
| Parameter Name | Type | Corresponding Native Type | Required | Description |
|--------|------|-------------|------|------|
| userId | Stext | str | Yes | User ID |
| ticket | Stext | str | Yes | Ticket returned by checkMyMessage |
| newPhone | Stext | str | Yes | New mobile number |
| newCode | Stext | str | Yes | Verification code for new mobile number |

#### Return Value
Success returns SUCCESS_RETURN.

#### Usage Example
```python title="Update Phone Number Example"
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

try:
    # First get ticket
    ticket_result = phone_auth.checkMyMessage("123456")
    ticket = ticket_result["ticket"]
    
    # Update mobile number
    phone_auth.updatePhone("user123", ticket, "13900139000", "654321")
    print("Mobile number updated successfully")
except Exception as e:
    print(f"Update failed: {e}")
```

## Properties
### allowRegister
Whether to allow new user registration.

**Type**: bool  
**Description**: Read from configuration file, controls whether to allow new user registration through mobile number

### authConfig
Authentication configuration information.

**Type**: dict  
**Description**: Contains SMS service configuration information, such as accessKey, accessSecret, etc.

## Advanced Features
### SMS Service Integration
Mobile phone login supports integration with multiple third-party SMS service providers. By configuring the `smsFullName` parameter, you can specify the corresponding SMS service element. Once configured, verification code sending will automatically invoke the specified SMS service, ensuring message delivery stability and delivery rates.

The platform currently supports three SMS service providers: Alibaba Cloud SMS for domestic business scenarios, while Twilio and AWS SNS provide global SMS sending services for international business, meeting SMS verification code sending requirements across different regions.

#### Usage Example
```python title="Custom SMS Service Example"
# Create SMS service element
sms_service = app.getElement("SMS.aliyunSms")

# Configure mobile number login to use this SMS service
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")
phone_auth.sendMessage("13800138000")  # Automatically uses configured SMS service
```

### Verification Code Security Mechanism
System has built-in multiple security mechanisms to ensure verification code usage security.

#### Frequency Limit Configuration
- Single mobile number can only send verification code once within 45 seconds
- Verification code valid for 5 minutes
- Verification code automatically deleted after successful verification

#### Security Features Example
```python title="Verification Code Security Mechanism Example"
phone_auth = app.getElement("auths.loginTypes.myPhoneLogin")

# Send verification code
phone_auth.sendMessage("13800138000")

# Repeated sending within short time will throw exception
try:
    phone_auth.sendMessage("13800138000")  # Repeated sending within 45 seconds
except Exception as e:
    print("Sending frequency too high, please try again later")

# Verification code expiration check
import time
time.sleep(300)  # Wait 5 minutes
try:
    phone_auth.getLoginCode("13800138000", "123456")  # Expired verification code
except Exception as e:
    print("Verification code has expired")
```