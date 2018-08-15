# customForm v1.0.0
폼요소를 쉽게 커스텀할 수 있는 플러그인입니다.

## 지원요소
- select
- select[multiple]
- input[type='checkbox']
- input[type='radio']
- input[type='file']
- input[type='file'][multiple]

## 클래스
- active : 활성화되었을때 부여됩니다.
- disabled : 폼요소에 disabled 속성이 있을때 지정됩니다.

[data-custom]에 부여됩니다.

## 네임스페이스
- customForm

## 활성화되는 순간
- select : 포커스가 들어갔을때, 나갔을때
- input[type='checkbox'] : 변경되었을때
- input[type='radio'] : 변경되었을때
- input[type='file'] : 파일이 선택되어 있을때

## data-*
- data-custom : [data-custom-text]와 폼요소의 부모이며 값은 폼요소 구분자로 넣어주세요.
  - 예시 : select, select_multiple, checkbox, radio, file, file_multiple
    - data-custom-text : 상태에 따른 문자를 바꿀 요소이며 값을 지정하면 기본값이 됩니다.
      - data-custom-text-overflow : 넓이값을 지정하면 말줄임이 생성됩니다.

## 참고사항
- [data-custom]안에 [data-custom-text]와 폼요소가 각 1개씩만 존재햐야합니다.
- [data-custom]안에 [data-custom]은 올 수 없습니다.
- data-* 속성은 유지한채 요소변경 가능합니다.
- 내부에 필요한만큼 요소를 감쌀 수 있습니다.

## 제이쿼리 개발버전
1.12.4

## 브라우저 지원
- js : ie7이상 그 이외 브라우저 모두 지원합니다.
- css : ie10이상 그 이외 브라우저 모두 지원합니다.