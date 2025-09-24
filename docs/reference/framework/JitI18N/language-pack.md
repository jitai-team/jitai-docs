---
slug: language-pack
---
# Language Pack
Language pack is the core component of the JitI18N internationalization framework, responsible for providing multi-language translation configuration and automated translation processing. It implements real-time internationalization of page content based on DOM monitoring and text replacement mechanisms, supporting text node translation, attribute translation, dynamic content monitoring, and language switching functions.

The hierarchical structure of language pack elements is Meta (languages.Meta) → Type (languages.NormalType) → Instance. Developers can quickly create language pack instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official `languages.NormalType` element provided by JitAi in their own App to implement their own encapsulation.

## Quick Start
### Basic Configuration Example
```text title="Recommended Directory Structure"
languages/
├── EN/
│   ├── e.json
│   └── languages.json
└── zhCN/
    ├── e.json
    └── languages.json
```

```json title="EN/e.json"
{
    "title": "English",
    "frontBundleEntry": "./languages.json",
    "type": "languages.NormalType"
}
```

```json title="EN/languages.json"
{
    "entries": {
        "登录": "Login",
        "用户名": "Username",
        "密码": "Password",
        "确定": "Confirm",
        "取消": "Cancel"
    },
    "ignoreRules": [
        {
            "type": "class",
            "value": "no-translate",
            "mode": "exact"
        }
    ],
    "translateAttributes": [
        "data-tooltip",
        "data-hint"
    ]
}
```

```tsx title="Using Language Pack"
// Initialize language pack
const app = getRuntimeApp();
await app.i18n.init('languages.EN');

// Switch language
await app.i18n.switchLanguage('languages.zhCN');

// Get current language
const currentLang = app.i18n.currentLanguage;
```

### Configuration Properties Description
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| entries | Record&lt;string, string&gt; | Translation entry mapping table, key is original text, value is translated text | `{}` | Yes |
| ignoreRules | IgnoreRule[] | Array of rules for ignoring translation | `[]` | No |
| translateAttributes | string[] | List of HTML attribute names to be translated | `[]` | No |

**IgnoreRule Configuration:**

| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| type | 'class' &#124; 'id' &#124; 'attribute' &#124; 'selector' | Ignore rule type | - | Yes |
| value | string | Match value | - | Yes |
| mode | 'exact' &#124; 'contains' &#124; 'startsWith' &#124; 'endsWith' &#124; 'regex' | Match mode | 'exact' | No |

## Methods
### getInstance
Get I18N singleton instance, usually used for direct access to I18N functionality.

#### Return Value
I18N - I18N singleton instance

#### Usage Example
```tsx title="Get I18N Instance"
import I18N from 'languages.Meta';

const i18n = I18N.getInstance();
await i18n.init('languages.EN');
```

### init
Initialize specified language pack and start automatic translation functionality.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| lang | string | Language pack element's fullName | - | Yes |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Initialize Language Pack"
await app.i18n.init('languages.EN');
```

### switchLanguage
Switch to specified language pack, will restore current translation content first then apply new language pack.

#### Parameter Details
| Parameter Name | Type | Description | Default Value | Required |
|--------|------|------|---------|------|
| lang | string | Target language pack's fullName | - | Yes |
| force | boolean | Whether to force switch (even if same language) | true | No |

#### Return Value
Promise&lt;void&gt;

#### Usage Example
```tsx title="Language Switching"
// Switch to Chinese
await app.i18n.switchLanguage('languages.zhCN');

// Force refresh current language
await app.i18n.switchLanguage('languages.EN', true);
```

### destroy
Destroy I18N instance, stop monitoring and clear all cache.

#### Usage Example
```tsx title="Destroy Instance"
app.i18n.destroy();
```

## Properties
### currentLanguage
Current active language pack fullName, read-only property.

```tsx title="Get Current Language"
const lang = app.i18n.currentLanguage; // 'languages.EN'
```

## Advanced Features
### Ignore Rules Configuration
Through ignoreRules, you can flexibly control which elements should not be translated.

```json title="Multiple Ignore Rules Example"
{
    "ignoreRules": [
        {
            "type": "class",
            "value": "no-translate",
            "mode": "exact"
        },
        {
            "type": "class", 
            "value": "code-",
            "mode": "startsWith"
        },
        {
            "type": "id",
            "value": "logo"
        },
        {
            "type": "attribute",
            "value": "data-no-i18n"
        },
        {
            "type": "selector",
            "value": "pre code"
        },
        {
            "type": "class",
            "value": "anticon-.*",
            "mode": "regex"
        }
    ]
}
```

### Custom Attribute Translation
In addition to default placeholder, title, alt, aria-label attributes, you can configure additional attributes for translation.

```json title="Attribute Translation Configuration"
{
    "translateAttributes": [
        "data-tooltip",
        "data-hint", 
        "data-confirm-text",
        "aria-describedby"
    ]
}
```

### Dynamic Content Processing
Language pack automatically monitors DOM changes and performs real-time translation on dynamically added content, with special optimization for translation effects of dynamic components like popups and prompts.

```tsx title="Dynamic Content Translation Example"
// Dynamically added elements will be automatically translated
const div = document.createElement('div');
div.textContent = '确定';
document.body.appendChild(div); // Will automatically translate to "Confirm"

// Antd component dynamic content will also be translated
Modal.confirm({
    title: '确认删除', // Auto translate
    content: '此操作不可恢复', // Auto translate
});
```

### Multi-language Pack Merging
When an application inherits multiple parent applications containing language packs, all language pack configurations will be automatically merged.

```tsx title="Check Merge Effect"
// Get final merged language configuration
const langElement = await app.getElement('languages.EN');
console.log(langElement.entries); // Contains all inherited translation entries
```