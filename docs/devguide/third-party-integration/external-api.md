---
sidebar_position: 1
slug: external-api
---

# Creating Universal External API Elements

External API integration elements enable seamless integration with third-party HTTP interfaces, providing unified RESTful API management built on the requests library. These elements handle HTTP request encapsulation, parameter processing, and response parsing, supporting standard HTTP methods (GET, POST, PUT, DELETE) while offering request preprocessing, response postprocessing, and callback mechanisms.

## Creating external APIs {#creating-external-apis}

![Creating External APIs](./img/1/api_2025-08-26_19-18-25.png "Creating External APIs")

Click the `+` button in the element tree on the left to open a dialog. to reveal "External API", then click "Generic External API" to open the creation dialog.

![API Dialog](./img/1/api_2025-08-27_10-55-29.png "API Dialog")

In the creation dialog, enter the external API name and click `Confirm` to create the element.

![API Configuration](./img/1/api_2025-08-27_11-01-37.png "API Configuration")

The external API configuration page consists of two main modules: Public Configuration and Interface List.

## Public configuration {#public-configuration}

Public configuration encompasses common settings for external APIs, including domain names, public request headers, request preprocessing, response postprocessing, and other shared parameters.

### Access domain {#access-domain}

The access domain is a required field for external API integration.

![Access Domain](./img/1/api_2025-08-27_11-47-43.png "Access Domain")

This can be either an IP address with port or a fully qualified domain name.

### Public request headers {#public-request-headers}

Public request headers define common headers that apply to all interfaces within the current external API service. You can configure standard parameters such as Content-Type, Accept, and authentication headers.

![Public Request Headers](./img/1/api_2025-08-27_11-51-59.png "Public Request Headers")

Click `+ Add Parameter` to open the parameter addition dialog. Enter the parameter details and click `Save` to add the header.

### Request preprocessing {#request-preprocessing}

Certain APIs require dynamic operations such as signature generation or encryption before making requests. These operations can be implemented using request preprocessing functions.

![Interceptor Processing](./img/1/api_2025-08-27_12-00-56.png "Interceptor Processing")

### Response postprocessing {#response-postprocessing}

After receiving API responses, you may need to perform additional processing on the response data, such as decryption, validation, or format transformation. These operations can be implemented using response postprocessing functions.

:::warning Note

Both request preprocessing and response postprocessing functions are optional. If no response processing function is configured, the response data will be returned unchanged.

Before configuring these functions, you must first create the corresponding service functions in the [standard service module](../business-logic-development/creating-service-elements.md).

:::

## API interface management {#api-interface-management}

Similar to how a service contains multiple methods, an external API service can encompass multiple interfaces, all organized within the Interface List.

![Interface List](./img/1/api_2025-08-27_14-37-03.png "Interface List")

You can add individual interfaces and organize them into groups for better management and organization.

### API interface grouping {#api-interface-grouping}

You can organize related interfaces into groups for streamlined management. For example, group order-related interfaces under "Orders" and user-related interfaces under "Users."

![Interface Grouping](./img/1/api_2025-08-27_14-43-41.png "Interface Grouping")

Click "Add Group" on the left panel to open the group creation dialog. Enter the group name and save to create a new group.

![Adding Group](./img/1/api_2025-08-27_14-44-41.png "Adding Group")

Once created, click the `More` icon next to the group to access additional operations such as adding interfaces, renaming, or deleting the group.

### API interface {#api-interface}

Each API interface contains its own name, request method (GET/POST/PUT/DELETE), and endpoint path.

![Interface Creation](./img/1/api_2025-08-27_14-48-59.png "Interface Creation")

Click `Add Interface` to open the creation dialog. Specify the interface title, name, request method, and endpoint path, then click `Confirm` to create the interface.

:::warning Note
Interface names must be in English and serve as unique identifiers—they cannot be duplicated.

The complete request URL is constructed by concatenating the domain name with the interface path.
:::

After saving, you'll be directed to the interface details page where you can perform additional configuration.

![Interface Details](./img/1/api_2025-08-27_14-57-20.png "Interface Details")

#### Request parameters {#request-parameters}

Each API interface supports three parameter types: Params, Body, and Header.

![Parameter Configuration](./img/1/api_2025-08-27_15-01-30.png "Parameter Configuration")

Click `+ Add Parameter` to add parameters in the corresponding tab.

:::tip Tip
Params parameters are included in the URL query string and are typically used with GET requests.

Body parameters are embedded in the request body and are commonly used with POST or PUT requests.

Header parameters are included in the request headers and will be automatically merged with headers from the public configuration during API calls.

:::

#### Return value type {#return-value-type}

If the interface returns data, you must configure the appropriate return value type. Since interfaces typically return JSON-formatted data, you can select "Dictionary" as the return type and configure the field mapping.

![Return Value Type](./img/1/api_2025-08-27_17-13-42.gif "Return Value Type")

Note: All return value types are [data types](../../reference/framework/JitORM/data-types) defined within the JitAi framework.

#### Callback function {#callback-function}

JitAi uses callback functions to configure service functions that process API response results with business logic.

![Callback Function](./img/1/api_2025-08-27_15-13-23.png "Callback Function")

Before configuring callback functions, you must first create the corresponding functions in the [standard service module](../business-logic-development/creating-service-elements.md).

### API interface testing and calling {#api-interface-testing-and-calling}

#### API interface testing {#api-interface-testing}

Once an interface is created, you can verify its availability through testing.

![API Testing](./img/1/api_2025-08-27_15-21-44.gif "API Testing")

Click `Test` on the interface details page to open the testing dialog. Enter the required parameters and click `Test` to verify functionality.

:::warning Note

Data retrieved through the test function represents the complete, unprocessed raw response from the API.
:::

#### API calling {#api-calling}

To make API calls, configure the appropriate functions in pages or services.

![API Calling](./img/1/api_2025-08-27_15-59-11.gif "API Calling")

In the function logic, navigate to "Service -> External API Service -> Call External API" to create an API call declaration.

![API Call Declaration](./img/1/api_2025-08-27_15-40-53.png "API Call Declaration")

In the `Set Parameters` dialog, select the target API interface, configure the necessary parameters, and click `Confirm` to complete the API call configuration.

![API Call Parameters](./img/1/api_2025-08-27_17-26-39.png "API Call Parameters")

In the user portal, clicking the "Get Current Weather" button will retrieve current weather information through the configured API call.