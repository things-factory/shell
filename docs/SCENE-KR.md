# Things-Scene 에 대한 처리

## Things-Scene 엔진은 전략 자산임

- 코드가 지켜져야 하므로, 소스차원의 packaging을 할 수 없다.
-

## Things-Scene 은 headless 등 독립적으로 사용될 가능성이 높다.

- things-scene 라이브러리는 headless로 독립적으로 사용될 가능성이 높다.
  headless 에서 사용되는 경우는 로딩 효율이 극단적으로 좋아야 하므로, 로딩파일 용량을 최적화해야 한다.
  headless 등에서 모듈 접근으로 처리하기 어려우니 전역적인 접근방식이 필요하다.
- things-scene 라이브러리는 여러가지 things-scene 컴포넌트들과 같이 사용될 수 있어야 한다.
  headless-scene-components 로 별도 패키지되어서 제공되어야 한다.

## 결국, things-scene의 그 사용여부와 무관하게 things-factory/shell 에서 공통 요소로 제공될 수 밖에 없다.

- externals 로 등록
- headless-scene-components 들 별도 패키징
- node_modules/@hatiolab/things-scene 은 패키징 폴더에 항상 복사되어야 한다.
