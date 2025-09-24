---
sidebar_position: 1
slug: creating-language-packages
title: Creating Language Packages
---



The JitAI platform comes with built-in Simplified Chinese and English language packages. When the application runs, the system automatically selects the corresponding language package based on the browser's language settings. If the browser language is not within the supported range, English is used by default. You can flexibly create custom language packages as needed.

## Creating Language Packages

The steps to create a language package are as follows:

![Create Language Package](./img/create.png)

Click <span style={{ background:"#3d65fd", display: "inline-block", borderRadius: "8px", textAlign: "center", lineHeight: "100%", color: "#ffffff", fontSize: "24px", padding: "0px 10px 5px" }}>+</span>  → **More** → **Languages Packs** → **Language Pack** to open the creation form, fill in the name, and click the `Confirm` button to complete the creation.

![create-language-form](./img/create-form.png)

After the language package is created, the visual editor will automatically open. You can translate existing terms or add new terms in this editor.

## Translating Built-in Terms

The visual editor will list all terms from the current development framework and visual development tools. You only need to input the corresponding language content for each term. Changes take effect immediately after saving.
![update-term-value](./img/update-term-value.gif)

## Adding New Terms

You can add content from your application as terms and translate them into the corresponding language content. Changes take effect immediately after adding.

![add-terms](./img/add-terms.gif)

## Importing Terms
You can batch translate terms by importing JSON files. In the JSON, each key corresponds to the original content displayed in the application code, and the value is the content translated into the corresponding language. Example below:
```json
{
    "Add": "創建",
    "Order Management": "​訂單管理",
    ...
}
```

You can obtain all terms that need translation through the export function. The exported file is also a JSON file where the key is the original content displayed in the application code, and you only need to supplement the corresponding language content.

