# 카카오페이 사전과제

### 폴더구조

```
/src
    /assets  # 제공된 style 및 image
    /components  # 마크업에서 추출한 컴포넌트
    /markup  # 제공된 HTML 마크업 및 스토리북
    /pages  # 화면 렌더링 컴포넌트
    /recoil  # 리코일 store
    /services  # API 호출 모듈(axios 라이브러리 사용)
    /test  # 테스트코드
    /util  # 유틸 함수
```

### 추가 라이브러리

#### `recoil`

상태관리 및 Suspense를 활용한 API 로직처리를 위해 사용했습니다.

#### `axios`

API 호출 라이브러리이며, wrapper 및 intercepter 패턴을 통해
코드 신뢰성을 향상시키고 Typescript 친화적으로 사용하고자 했습니다.

#### `dayjs`

Date 처리 라이브러리 입니다. 송금일자 선택 및 화면에 보여줄 날짜 형식을 위해 추가했습니다.

#### `msw`

Service mocking 라이브러리입니다. 테스트를 위해 추가했습니다.

### 프로젝트 설계방향

#####1. 컴포넌트 기반 개발
주어진 요구사항과 마크업을 분석하여, 재사용이 용이한 컴포넌트를 먼저 개발하고
이후에 만들어진 컴포넌트들로 화면을 구성하고자 하였습니다.

#####2. Suspense
데이터가 fetch되기 전, 화면이 렌더링 되는것을 방지하기 위해
React.Suspense와 recoil을 활용하여 fetch 이후 화면이 렌더링되도록 했습니다.

#####3. Service 패턴
API 호출 로직을 Service 레이어로 분리하고,
Typescript Generic을 사용하여 데이터의 타입정합성을 지키고자 하였고
Axios 라이브러리의 wrapper 및 interceptor 패턴을 통해 효율적인 API 처리를 하고자했습니다.
