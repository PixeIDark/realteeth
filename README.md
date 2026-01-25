## 프로젝트 실행 방법

```bash
# 프로젝트 복제
git clone https://github.com/PixeIDark/realteeth.git

# 프로젝트 폴더로 이동
cd realteeth

# 환경변수 설정
echo "VITE_WEATHER_API_KEY=d33ab40b3960dfc03940f52d11142cbb" > .env

# 의존성 설치
pnpm i

# 개발 서버 실행
pnpm dev
```

## 구현한 기능에 대한 설명

### 페이지 구성

**홈 페이지 ("/")**

- 현재 위치 기반 날씨 정보 자동 표시
- 시간대별 기온 예보 표시
- 지역 검색을 통한 상세 페이지 이동
- 즐겨찾기 목록 표시 및 관리

**상세 페이지 ("/detail/:locationId")**

- 선택한 지역의 현재 날씨 정보 표시
- 시간대별 기온 예보 표시
- 즐겨찾기 추가/해제 기능

### 주요 기능

**현재 위치 날씨 조회**

- Geolocation API를 사용하여 현재 위치 감지
- 위치 권한 미허용 시 서울(기본값) 날씨 표시

**지역 검색**

- 한국 시/구/동 단위 지역 검색
- 디바운스(300ms) 적용
- 키보드 네비게이션 지원 (화살표, Enter, Escape)

**즐겨찾기**

- 최대 6개 지역 등록 가능
- LocalStorage 기반 데이터 영속화
- 별칭(alias) 수정 기능
- 각 지역의 실시간 날씨 표시

## 기술적 의사결정 및 이유

**React + React Router (Next.js 미사용)**

- SSR이 필요 없는 클라이언트 사이드 날씨 조회 서비스
- 별도 서버 없이 정적 호스팅만으로 배포 가능
- 불필요한 프레임워크 복잡도 제거

**Vite**

- 빠른 HMR로 개발 생산성 향상
- ESBuild 기반 번들링으로 빌드 속도 최적화

**FSD 아키텍처**

- app, pages, widgets, features, entities, shared 레이어 구분
- 단방향 의존성으로 모듈 간 결합도 최소화

**TanStack Query**

- staleTime/gcTime 설정으로 API 호출 최적화 및 캐싱

**Tailwind CSS + shadcn/ui**

- 유틸리티 클래스 기반으로 빠른 스타일링
- Radix UI 기반의 접근성 보장
- 필요한 컴포넌트만 선택적으로 설치하여 번들 사이즈 최소화
- 개발 생산성 향상

**Lucide React**

- 트리 쉐이킹 지원으로 사용한 아이콘만 번들에 포함
- 일관된 디자인의 아이콘 제공
- 개발 생산성 향상

**useQuery 상태 기반 에러 처리**

- React Router의 RouterProvider가 내부 ErrorBoundary를 가지고 있어 컴포넌트별 에러 처리
  불가([참고](https://amanexplains.com/error-boundary-react-query-and-router-v6/))
- useQuery의 isLoading, isError로 컴포넌트 내부에서 직접 분기 처리
- 한 API 실패 시 해당 컴포넌트만 에러 UI 표시
-

**useSuspenseQuery 선택적 사용**

- 로컬 데이터(지역 JSON, localStorage)는 실패 가능성이 없어 useSuspenseQuery 사용
- data 타입에서 undefined 제거로 타입 안전성 확보

## 사용한 기술 스택

- React 19
- TypeScript
- React Router 7
- TanStack Query
- Tailwind CSS
- Radix UI
- Lucide React
- Vite
- pnpm