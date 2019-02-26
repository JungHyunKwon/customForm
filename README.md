# customForm v1.0.0
폼 요소를 커스텀 할 수 있는 플러그인입니다.

## 지원 요소
- select
- select[multiple]
- input[type='checkbox']
- input[type='radio']
- input[type='file']
- input[type='file'][multiple]

## 클래스
- active : 활성화되었을 때 부여됩니다.
- focus : 포커스되었을 때 부여됩니다.

.custom_form에 부여됩니다.

## 구조
- .custom_form : .custom_text와 .custom_item 요소의 부모이며 클래스로 구분자를 넣어주세요.
  - 예시 : .custom_select, .custom_checkbox, .custom_radio, .custom_file
- .multiple : 지원 요소에 multiple 속성이 있을 때 .custom_form에 클래스를 넣어주세요.
- .custom_text : 상태에 따른 문자를 바꿀 요소이며 선택된 값이 없을 때 요소안의 내용이 기본값이 됩니다.
- .custom_item : 지원 요소에 클래스를 넣어주세요.

## 메서드

```javascript
    $(selector).customForm(method, value);
````

이름 | 매개변수 | 반환 | 설명
| :-- | :---- | :-- | :-- |
refresh | | jQuery | 새로고침
destroy | | jQuery | 소멸
focus | | jQuery | 포커스
reset | | jQuery | 초기화
val | string | jQuery \|\| array [object {$element : jQuery, value : array [string]}] \|\| string | 값을 지정하거나 값을 얻을 수 있습니다.
defaultText | string | jQuery \|\| array [object {$element : jQuery, value : array [string]}] \|\| string | 기본값을 지정하거나 기본값을 얻을 수 있습니다.

## 참고사항
- .custom_form 안에 .custom_text와 .custom_item이 각 1개씩만 존재해야 합니다.
- .custom_form 안에 .custom_form은 올 수 없습니다.
- 내부에 필요한 만큼 요소를 감쌀 수 있습니다.

## 제이쿼리 개발 버전
1.12.4

## 브라우저 지원
- js : ie7 이상 그 이외 브라우저 모두 지원합니다.
- css : ie9 이상 그 이외 브라우저 모두 지원합니다.