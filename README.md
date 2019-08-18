# label v1.0.0
라벨을 꾸밀 수 있는 플러그인입니다.

## 지원 요소
- select
- select[multiple]
- input[type='checkbox']
- input[type='radio']
- input[type='file']
- input[type='file'][multiple]

## 클래스
- active : 활성화
- focus : 포커스

.label에 부여됩니다.

## 구조
- .label : .label_text와 .label_item 요소의 부모이며 클래스로 구분자를 넣어주세요.
  - 예시 : .select, .multiple, .checkbox, .radio, .file
- .label_text : 라벨
- .label_item : 서식 요소의 클래스

## 메서드

````javascript
$(selector).label(method, value);
````

이름 | 매개변수 | 반환 | 설명
| :-- | :---- | :-- | :-- |
refresh | | object | 새로고침
destroy | | object | 소멸
focus | | object | 포커스
reset | | object | 초기화
val | string | object \|\| array \|\| string | 값을 지정하거나 값을 얻을 수 있습니다.
default | string | object \|\| array \|\| string | 기본값을 지정하거나 기본값을 얻을 수 있습니다.

## 참고사항
- .label 안에 .label_text와 .label_item이 각 1개씩만 존재해야 하며 중첩할 수 없습니다.
- 내부에 필요한 만큼 요소를 감쌀 수 있습니다.
- 기본값은 .label_text의 값 입니다.

## 제이쿼리 개발 버전
1.12.4

## 브라우저 지원
- js : 인터넷 익스플로러7 이상
- css : 인터넷 익스플로러9 이상