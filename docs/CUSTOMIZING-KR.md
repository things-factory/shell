# Things-Factory 의 어플리케이션 커스터마이징 방법

- Things Factory 프레임워크를 이용해서 어플리케이션을 만드는 경우, 모듈 구성을 마음대로 구성할 수 있는 장점 외에도 어플리케이션 전체적인 범위의 여러가지 커스터마이징 방법을 제공한다.
- 어플리케이션 전체적인 범위의 커스터마이징 대상은 index.html, manifest, 그리고 어플리케이션 스타일(테마) 등이 될 수 있다.
- Shell 에서는 위 세가지에 대해서 디폴트 내용을 제공하지만, 어플리케이션마다 자체적인 특징을 표현하는 다양한 정보를 표현할 수 있는 커스터마이징은 필수적인 작업이다.

## index.html template

- index.html에는 어플리케이션 범위의 여러가지 정보들이 포함하므로 이 템플릿을 커스터마이징 할 수 있다면, 아주 많은 변화를 제공할 수 있다.
- index.html은 어플리케이션 루트 디렉토리의 \_index.html 템플릿 파일을 기반으로 생성되므로, 이 파일을 수정하는 것으로 커스터마이징이 가능하다.
- generator-things-factory 로 app-module 을 생성하면, 기본 \_index.html 이 제공되므로, 필요한 부분을 수정할 수 있다.

## manifest

- manifest.json 파일을 통해서 다양한 모바일 디바이스에서의 어플리케이션 테마, 아이콘 등을 설정할 수 있다.
- generator-things-factory 로 app-module 을 생성하면, 기본 manifest.json 이 제공되므로, 필요한 부분을 수정할 수 있다.
- manifest 적용을 위해서 이미지, 아이콘 등 리소스가 필요하다면, 어플리케이션 디렉토리의 /assets/ 폴더 아래에 적당하게 추가하고 manifest.json 파일을 수정함으로써 커스터마이징을 할 수 있다.

## application theme

- Things Factory 모듈들은 CSS Variable을 이용해서 테마를 적용하도록 개발되는 것을 권장한다.
- Things Factory 테마 파일은 어플리케이션의 /assets/styles/app-theme.css가 기본으로 적용되도록 index.html에 제공하고 있다.
- /assets/styles/ 디렉토리에 새로운 테마를 만들고 \_index.html을 수정해서 테마 파일을 적용하면 새로운 테마가 적용된다.

## jwt authentication을 위한 secret key

- TODO

## database configuration

- TODO
