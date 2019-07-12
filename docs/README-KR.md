Things-Factory는 모바일 중심의 App을 개발할 수 있는 환경이다.

# 특징

- 모듈 구조 기반이다.
  - 모듈별로 관련된 기능셋을 구성할 수 있다.
  - 모듈별로 착탈이 가능하다.
  - 모듈간 종속성 관계를 정의할 수 있다. nodejs 모듈 종속성 구조를 적용한다.
- Redux 패턴
- 국제화를 위해서 i18next를 사용
- 패키징 기능은 webpack을 사용
- 코드셋은 es6,7,8을 기반으로 하며, babel로 transpiling 함
  - class-properties
  - decorators
  - object-rest-spread
- 웹컴포넌트 기반 DomElement 사용 - LitElement로 custom element를 정의함
- Single Page Application으로 URL path와 히스토리에 연동하여 activate 된다.
- 각 페이지들은 최초 activate 시점에 로딩된다. (lazy loading)
- Zero Configuration 기능. SSDP (Service Discovery Protocol)을 이용해서 자동 연결될 서비스들을 자동으로 찾아내서, 관련된 기능을 제공한다. 예를 들면, 주변에 접속할 서버를 찾아내서 자동으로 접속을 시도한다.
- Token 기반의 authentication (서버 프레임워크에서 지원하도록 개선필요함.)

# 구조적 conventions

- Redux
  - Redux 패턴은 application(system) wide한 상태를 관리한다.
  - application, 또는 상위(base) 모듈들은 하위 모듈에 의해서 확장될 수 있는 포인트를 store에 마련하고 action을 제공할 수 있다.
  - 하위 모듈들은 상위(base) 모듈에서 정의한 action을 이용하여, application 또는 상위모듈의 확장 구조에 연결한다.
- Page, Layout and Component
  - page 들은 URL 에 연동하여 activate 된다. (route)
  - layout 들은 전체 application UI요소의 배치와 구조와 관련된 틀을 제공한다.
  - component 들은 독립적인(atomic) 기능을 제공한다.
    - component는 구현의 독립성을 유지하기위해서 어플리케이션과 관련한 종속성을 배제한다.
      - Style은 css variable을 활용하여 독립성을 유지한다.
      - 다국어는 i18n-msg 컴포넌트를 사용하여 독립성을 유지한다. (i18n-msg에 대한 종속성만 갖는다.)
      - 컴포넌트는 자신을 사용할 호스트(컨테이너)의 레이아웃(display, position)에 대한 전제를 갖지 않도록 한다.
  - page, layout 들은 redux에 커넥트한다.
  - component들은 redux에 커넥트하지 않고, 속성을 통해서 page와 연동한다.
- Base Module 과 확장(common) Modules (ex. provider, ui)
  - Base Module은 특별한 기능에 대한 추상적인 정의를 제공한다.
  - Base Module은 확장 모듈에게 기능적인 서비스를 제공한다고 할 수 있다.
  - 확장 모듈은 Base Module을 피종속모듈로 추가하고, Base Module에서 정의한 기능을 직접 사용할 수 있다.
  - 확장 모듈이 Base Module을 확장하는 또 다른 방법은 store에 추가된 reducer와 action을 사용하는 것이다.
  - Base Module은 일군의 모듈을 리딩하는 기반 모듈이라고 할 수 있다. 예를 들면, board-base 라는 모듈은 모든 board 기능과 관련한 기반 모듈이라고 할 수 있다. 또한 label-base 라는 모듈은 라벨과 관련한 기능을 정의하고 구현하게 되는데, 바코드라벨 팝업기능, 바코드라벨 스캔기능, 바코드라벨 렌더링 및 프린트 기능 등을 제공하게 된다.
  - xxx 모듈의 Base 모듈 네이밍 컨벤션은 'xxx-base' 이다.
- Provider Module
  - Base 모듈의 데이타를 채워주는 서브 모듈
  - 주로 외부 서버로부터 Base 모듈에서 정의한 데이타를 채워주는 역할을 한다.
  - xxx 모듈의 Provider 모듈의 네이밍 컨벤션은 'xxx-provider' 이다.
  - 데이타 제공 방식으로 구분될 필요가 있다면, yyy방식을 사용하는 xxx 모듈의 Provider 모듈의 네이밍 컨벤션은 'xxx-provider-yyy' 로 할 수 있다.
- UI Module
  - Base 모듈과 관련된 화면 구성을 담당하는 서브 모듈
  - xxx 모듈의 UI 모듈의 네이밍 컨벤션은 'xxx-ui' 이다.
  - UI 구성 방식으로 구분될 필요가 있다면, yyy방식을 사용하는 xxx 모듈의 UI 모듈의 네이밍 컨벤션은 'xxx-ui-yyy' 로 할 수 있다.
  - UI 모듈에는 여러가지 화면 요소들이 제공될 수 있는데, page와 component로 구분될 수 있다.
    - page는 redux store와 연결되어 어플리케이션의 state를 제공받으면서, browser routing의 타겟이 되는 UI 요소이다
    - component는 어플리케이션 구조와 연관된 종속성을 배제된 독립적인 기능을 제공하는 UI 요소이다. 따라서 컴포넌트성 UI는 redux store나 i18n 그리고 어플리케이션 구조와 관련한 css-variable 등의 종속성을 가지지 않는 것이 중요하다.
- Shell, Module 그리고 Application
  - Shell은 개발 및 실행 단계에서 모듈 구조를 가능하게 하는 모든 구조를 제공한다.
    - redux, assets, routing
    - build module, build application
  - Module은 Shell의 기반에서 자신의 목적과 관련한 구현만을 담당한다.
  - Application은 Shell과 사용자의 목적에 필요한 모듈들로 구성되는 최종 산출물이다.
    - Application 별 컨피규레이션들
      - Manifest 파일 (브랜드 관련 - 어플리케이션 이름, 로고 이미지)
      - 기타 Brand 관련 - 홈페이지 링크, 배너 로고
      - Style : 대표 색상표, 기타 css variables
      - Server 접속 IP
      - 기타 소스/리소스 오버라이드

# 기타 코딩 conventions

- 소스파일 길이 권장
  - 각 소스파일은 가장 중요한 한가지 목적을 구현한다. (복합목적 보다는 단순목적을 담당하도록 한다.)
  - 각 소스파일 당 특별한 이유가 없는 경우 200라인을 넘지 않는 것을 권장한다.
- 네이밍

  - class
    - 클래스 이름 : 대문자로 시작, camel-case
    - private 속성, 메쏘드 : \_(underscore)로 시작, camel-case
    - public 속성, 메쏘드 : 소문자로 시작, camel-case
    - class 속성, 메쏘드 : 소문자로 시작, camel-case
    - 이벤트 핸들러 : on + EventName 으로 시작, camel-case

- 다국어
  - 로케일 파일에서 다국어 작업을 할 때 강제로 Capitalize 하지 않는다.

```
"field.system brief": "System Brief" (x)
"field.system brief": "system brief" (o)
```

Capitalize가 필요한 곳에서 capitalize 하고,
uppercase가 필요한 곳에서 uppercase 한다.

```
text-transform: capitalize;
text-transform: uppercase;
```

- 다국어 정의는 가급적 '{언어-지역}.json'보다는 '{언어}.json' 파일에서 정의한다. 특별히 특정 지역에서만 다르게 표현되는 경우에만 '{언어-지역}.json'에 별도 정의한다.

# Authentication

## things-factory/shell

- auth base를 통해 authentication process를 제어한다.
  - auth base를 통해서 authentication을 설정한다.
- auth action을 제공한다.
  - authentication 관련 action을 통해 store를 변경할 수 있다.
- auth reducer를 제공한다.
- 즉, auth base를 통해서 설정하고, auth 관련 extension point 를 제공한다.
- 특별히, auth base 기능은 things-factory shell에서 직접 제공한다.

## things-factory/auth-provider-session

- Session key 방식의 authentication provider의 샘플
- auth-provider를 제공한다
- things-factory server에 사용할 수 있다
  things-factory/auth-ui-session

## things-factory/auth-ui-session

- Session key 방식의 authentication 의 샘플 뷰페이지를 제공한다

## things-factory/auth-provider-jwt

- JSON token 방식의 authentication provider의 샘플
- auth-provider를 제공한다

## things-factory/auth-ui-jwt

- JSON token 방식의 authentication 의 샘플 뷰페이지를 제공한다

# Prerequisites

- VS Code Extensions

  > Prettier - Code formatter

  > es6-string-css

  > lit-html

- VS Code Configuration

  > Format on save: true

- nodejs (v8.0.0 and above)

- yarn

- Chrome Browser Extension

  > https://github.com/zalmoxisus/redux-devtools-extension

# Create a new app

```
$ yo things-factory:app
```

# Create a new module

```
$ yo things-factory:module
```

# References

- https://github.com/material-components/material-components-web-components
