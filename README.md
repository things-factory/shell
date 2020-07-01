Things-Factory is an environment to develop mobile-oriented apps.

# Features

- It is based on module structure.
  - You can configure related feature sets for each module.
  - It is removable by module.
  - You can define dependencies between modules. Apply nodejs module dependency structure.
- Redux pattern
- Use i18next for internationalization
- Packaging function uses webpack
- The code set is based on es6,7,8, and transpiling with babel
  - class-properties
  - decorators
  - object-rest-spread
- Using Web Component-based DomElement - Defining custom element with LitElement
- It is activated by linking with URL path and history in Single Page Application.
- Each page is loaded at the time of initial activation. (lazy loading)
- Zero Configuration function. It uses SSDP (Service Discovery Protocol) to automatically find services to be connected automatically and provide related functions. For example, it attempts to connect automatically by finding a server to connect to.
- Token-based authentication (requires improvement to be supported by the server framework)

# Structural conventions

- Redux
  - The way to manage the overall state of an Application is using Redux pattern.
  - The application, or base modules, can prepare points in the store that can be extended by a sub-module and provide an action.
  - The sub-modules connect to the extension structure of the application or parent module using the action defined in the parent (base) module.
- Page, Layout and Component
  - Pages are activated by associating with the URL. (route)
  - Layouts provide a framework for the layout and structure of the entire application UI elements.
  - The components provide independent (atomic) functionality.
    - The component excludes dependencies on the application in order to maintain implementation independence.
      - Style maintains its independence by using css variables.
      - Multilinguals maintain independence by using i18n-msg components. (Only have dependencies on i18n-msg.)
      - The component does not have a premise for the layout (display, position) of the host (container) to which it will be used.
  - page, layouts are connected to redux.
  - Components do not connect to redux, but they work with pages through properties.
- Base Module and extension (common) Modules (ex. provider, ui)
  - The Base Module provides an abstract definition of special functions.
  - The Base Module is said to provide functional services to the extension module.
  - The extension module can add the base module as a dependent module and directly use the functions defined in the base module.
  - Another way the extension module extends the Base Module is by using the reducer and action added to the store.
  - The Base Module is a base module that reads a group of modules. For example, board-base module is a base module for all board functions. In addition, label-base module defines and implements functions related to the label, including barcode label pop-up, barcode label scanning, barcode label rendering and printing.
  - The naming convention of base module for xxx module is 'xxx-base'.
- Provider Module
  - Sub-module that fills the data of Base module
  - It mainly serves to fill the data defined in Base module from the external server.
  - The naming convention for Provider module of xxx module is 'xxx-provider'.
  - If it is necessary to be distinguished by the way data is provided, the naming convention for Provider module of xxx module using yyy method can be defined as 'xxx-provider-yyy'.
- UI Module
  - Sub-module responsible for the screen configuration related to Base module
  - The naming convention for UI module of xxx module is 'xxx-ui'.
  - If it is necessary to be distinguished by UI configuration method, the naming convention for UI module of xxx module using yyy method may be 'xxx-ui-yyy'.
- Shell, Module and Application
  - Shell provides all the structures that enable the module structure in the development and execution stages.
    - redux, assets, routing
    - build module, build application
  - Module is only responsible for implementing its own purpose in the Shell base.
  - Application is the final product that consists of the modules necessary for the purpose of Shell and the user.
    - Configurations by Application
      - Manifest file (brand-related - application name, logo image)
      - Other brand related - homepage link, banner logo
      - Style : Representative color table, other css variables
      - Server connection IP
      - Other source/resource override

# Other coding conventions

- Source file length recommended
  - Each source file implements one of the most important purposes. (Be responsible for simple purposes rather than multiple purposes.)
  - If there is no specific reason for each source file, it is recommended not to exceed 200 lines.
- Naming

  - class
    - Class name : starts with uppercase, camel-case
    - private property, method : starts with \_(underscore), camel-case
    - public property, method : starts with lowercase, camel-case
    - class property, method : starts with lowercase, camel-case
    - Event handler : starts with on + EventName, camel-case

- Localization
  - Don’t capitalize explicitly in locale file

```
"field.system brief": "System Brief" (x)
"field.system brief": "system brief" (o)
```

You can set it to style where you need it.

```
text-transform: capitalize;
text-transform: uppercase;
```

- If possible, use ‘ms.json’ rather than ‘ms-My.json’. In particular, use ‘ms-My’ only if it is a Malay language that is used differently only in Malaysia.

# Authentication

## things-factory/shell

- Control the authentication process through auth base.
  - Set authentication through auth base.
- Provide auth action.
  - You can change store through authentication related action.
- Provide auth reducer.
- That is, it sets through auth base and provides auth-related extension point.
- In particular, auth base function is provided directly in things-factory shell.

## things-factory/auth-provider-jwt

- Sample of authentication provider in JSON token type.
- Provide auth-provider.

## things-factory/auth-ui-jwt

- Provide the sample view page of authentication in JSON token type.

# Prerequisites

- Install Windows Subsystem for Linux on Windows (Windows)

  > Install WSL using Ubuntu following https://docs.microsoft.com/en-gb/windows/wsl/install-win10

- VS Code Extensions

  > Prettier - Code formatter

  > es6-string-css

  > lit-html

- VS Code Configuration

  > Format on save: true

- nodejs (v8.0.0 and above)

- yarn

- Cordova

  > npm install -g cordova

- Chrome Browser Extension

  > https://github.com/zalmoxisus/redux-devtools-extension

- Yeoman

  > npm install -g yo

- Things Factory Generator

  > npm install -g generator-things-factory

- Node-gyp (For Ubuntu)

  > npm install -g node-gyp

- Python2 (For Ubuntu)

  > sudo apt-get install python
  
  > npm install --python=python2.7
  
  > npm config set python python2.7

- mdns (For Ubuntu)

  > sudo apt-get install build-essential
  
  > sudo apt-get install libavahi-compat-libdnssd-dev

- node-printer (For Ubuntu)

  > sudo apt-get install libcups2-dev

# Create a new app

```
$ yo things-factory:app
```

# Create a new module
## base module
```
$ yo things-factory:base-module
```
## ui module
```
$ yo things-factory:ui-module
```
# References

- https://github.com/material-components/material-components-web-components
