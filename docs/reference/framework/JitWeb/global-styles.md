---
slug: global-styles
title: "Global Styles Reference"
description: "Global Styles Reference - API documentation for developers. Complete specifications, methods, and examples."
sidebar_label: "Global Styles"
---
# Global Styles

Global Styles is a style configuration system based on Ant Design Design Token system, responsible for unified management of application visual design standards. It controls visual elements such as fonts, colors, border radius, shadows, etc. through standardized design tokens (Design Token), ensuring consistency and maintainability of the entire application interface.

The Global Styles element has a hierarchical structure of Meta (themes.Meta) → Type (themes.NormalType) → Instance. Developers can quickly create global styles instance elements through JitAI's visual development tools.

Of course, developers can also create their own Type elements or modify the official themes.NormalType element provided by JitAi in their own App to implement their own encapsulation.

:::tip Reference Documentation
Developers can refer to [Ant Design Customize Theme Documentation](https://ant-design.antgroup.com/docs/react/customize-theme-cn#seedtoken) to learn more about Design Token concepts and usage.
:::

## Quick Start
### Basic Configuration Example
```json title="themes/myGlobalTheme.json"
{
  "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  "borderRadius": 6,
  "colorPrimary": "#1677ff",
  "colorSuccess": "#52c41a",
  "colorWarning": "#faad14",
  "colorError": "#ff4d4f",
  "colorInfo": "#1677ff",
  "colorText": "rgba(0, 0, 0, 0.88)",
  "colorTextSecondary": "rgba(0, 0, 0, 0.65)",
  "fontSizeHeading1": 38,
  "fontSizeHeading2": 30,
  "boxShadow": "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)"
}
```

### Configuration Properties
Global styles define design tokens through JSON configuration files, supporting the following categories of property configurations:

| Property Type | Description | Main Properties |
|---------|------|---------|
| Font Configuration | Controls font family and heading font sizes | `fontFamily`, `fontSizeHeading1-5` |
| Border Radius Configuration | Defines component border radius size standards | `borderRadius`, `borderRadiusXS/SM/LG` |
| Theme Colors | Controls brand colors and functional colors | `colorPrimary`, `colorSuccess`, `colorWarning`, `colorError` |
| Background Fill | Defines various background and fill colors | `colorBgBase`, `colorFill` series |
| Text Colors | Controls text hierarchy colors | `colorText` series |
| Border Colors | Defines border color standards | `colorBorder`, `colorBorderSecondary` |
| Shadow Effects | Controls component shadow styles | `boxShadow`, `boxShadowSecondary` |

## Methods
### loader
Global styles loader, responsible for loading and merging theme configurations.

#### Parameter Details
| Parameter Name | Type | Required | Description |
|--------|------|------|------|
| elements | Array&lt;Element&gt; | Yes | Theme element array |

#### Return Value
| Type | Description |
|------|------|
| object | Merged theme configuration object |

#### Usage Example
```typescript title="Theme Loading Example"
// Loader automatically merges multiple theme configurations
const themeConfig = await loader([
  customThemeElement,
  baseThemeElement
]);

// Returns merged theme configuration
console.log(themeConfig.colorPrimary); // '#1677ff'
```

## Attributes
### Font Properties
#### fontFamily
- **Type**: `string`
- **Description**: Font family, prioritizes system default interface fonts, provides fallback font libraries
- **Default Value**: `"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto"`

#### fontSizeXL
- **Type**: `number` 
- **Description**: Extra large font size

#### fontSizeHeading1
- **Type**: `number`
- **Description**: First-level heading font size, used for H1 tags
- **Default Value**: `38`

#### fontSizeHeading2
- **Type**: `number`
- **Description**: Second-level heading font size, used for H2 tags
- **Default Value**: `30`

#### fontSizeHeading3
- **Type**: `number`
- **Description**: Third-level heading font size, used for H3 tags
- **Default Value**: `24`

#### fontSizeHeading4
- **Type**: `number`
- **Description**: Fourth-level heading font size, used for H4 tags
- **Default Value**: `20`

#### fontSizeHeading5
- **Type**: `number`
- **Description**: Fifth-level heading font size, used for H5 tags
- **Default Value**: `16`

### Border Radius Properties
#### borderRadius
- **Type**: `number`
- **Description**: Base border radius size, used for basic components like buttons, input fields, cards

#### borderRadiusXS
- **Type**: `number`
- **Description**: XS border radius, used for small border radius components like Segmented, Arrow
- **Default Value**: `2`

#### borderRadiusSM
- **Type**: `number`
- **Description**: SM border radius, used for small-sized components like small size Button, Input, Select
- **Default Value**: `4`

#### borderRadiusLG
- **Type**: `number`
- **Description**: LG border radius, used for large border radius components like Card, Modal
- **Default Value**: `8`

### Color Properties
#### colorPrimary
- **Type**: `string`
- **Description**: Brand primary color, core visual element reflecting product characteristics

#### colorPrimaryBg
- **Type**: `string`
- **Description**: Primary color light background, used for visually weaker selected states

#### colorSuccess
- **Type**: `string`
- **Description**: Success color, used for Result, Progress and other components

#### colorSuccessTextActive
- **Type**: `string`
- **Description**: Success color text active state

#### colorWarning
- **Type**: `string`
- **Description**: Warning color, used for warning-type components like Notification, Alert

#### colorError
- **Type**: `string`
- **Description**: Error color, represents error state

#### colorInfo
- **Type**: `string`
- **Description**: Info color

#### colorBgBase
- **Type**: `string`
- **Description**: Base background color, base variable for deriving background color gradients

#### colorBorder
- **Type**: `string`
- **Description**: Primary border color, default border color, used for separating different elements

#### colorBorderSecondary
- **Type**: `string`
- **Description**: Secondary border color, one level lighter than default border color

#### colorFill
- **Type**: `string`
- **Description**: Primary fill color, deepest fill color, used for Slider hover effects

#### colorFillSecondary
- **Type**: `string`
- **Description**: Secondary fill color, used for Rate, Skeleton and other components, can also be used as Table hover state

#### colorFillTertiary
- **Type**: `string`
- **Description**: Tertiary fill color, used for default fill color of Slider, Segmented and other components

#### colorFillQuaternary
- **Type**: `string`
- **Description**: Quaternary fill color, weakest fill color, suitable for zebra stripes, boundary distinction and other scenarios

#### colorText
- **Type**: `string`
- **Description**: Primary text color, default text color conforming to W3C standards

#### colorTextSecondary
- **Type**: `string`
- **Description**: Secondary text color, used for Label text, Menu text selected state and other scenarios

#### colorTextTertiary
- **Type**: `string`
- **Description**: Tertiary text color, used for descriptive text, such as form supplementary descriptions, list descriptions

#### colorTextQuaternary
- **Type**: `string`
- **Description**: Quaternary text color, lightest text color, used for input hint text, disabled text

### Shadow Properties
#### boxShadow
- **Type**: `string`
- **Description**: Primary shadow, controls element shadow styles

#### boxShadowSecondary
- **Type**: `string`
- **Description**: Secondary shadow, controls element secondary shadow styles

### Style Properties
#### wireframe
- **Type**: `boolean`
- **Description**: Wireframe style, used to change component visual effects to wireframe, enables V4 effects
- **Default Value**: `false`

## Events
None

## Advanced Features
### Theme Merging Mechanism
Global styles support multi-layer theme configuration merging through loader mechanism:

```typescript title="Theme Merging Example"
// Loader merges multiple theme configurations in order
// Later configurations override previous properties with same names
const mergedTheme = await loader([
  baseThemeElement,    // Base theme
  brandThemeElement,   // Brand theme  
  customThemeElement   // Custom theme
]);
```

### Design Token Inheritance
Based on Ant Design's Design Token system, supports automatic generation of complete color palette from base colors:

```json title="Color Inheritance Example"
{
  "colorPrimary": "#1677ff",
  // Automatically generates:
  // colorPrimaryHover, colorPrimaryActive, 
  // colorPrimaryBg, colorPrimaryBorder and other derived colors
}
```

### Responsive Design Support
Supports multi-screen adaptation by configuring different border radius and font sizes:

```json title="Responsive Configuration Example"
{
  "borderRadiusXS": 2,   // Small screen details
  "borderRadiusSM": 4,   // Medium screen
  "borderRadius": 6,     // Standard border radius
  "borderRadiusLG": 8,   // Large screen components
  
  "fontSizeHeading5": 16, // Mobile headings
  "fontSizeHeading1": 38  // Desktop large headings
}
```

### Brand Customization
Supports complete brand color system customization:

```json title="Brand Customization Example"
{
  // Brand primary color customization
  "colorPrimary": "#8B5CF6",
  "colorSuccess": "#10B981", 
  "colorWarning": "#F59E0B",
  "colorError": "#EF4444",
  
  // Font branding
  "fontFamily": "Inter, -apple-system, BlinkMacSystemFont",
  
  // Border radius style
  "borderRadius": 12  // More modern border radius style
}
```