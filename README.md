## 기능

- 반응형 디자인 (모바일, 태블릿, 데스크톱 지원)
- 모던한 UI/UX
- 애니메이션 효과
- 정보 섹션: 핵심 가치, 구성원, 전문 분야, 제휴 전문가, 상담 예약, 오시는 길
- Font Awesome 아이콘 통합

## 설치 및 사용 방법

### 로컬에서 실행하기

1. 이 저장소를 클론합니다:
   ```bash
   git clone https://github.com/yourusername/law-firm-website.git
   cd law-firm-website
   ```

2. 웹 브라우저에서 `index.html` 파일을 엽니다.

### GitHub Pages로 배포하기

1. GitHub에 새 저장소를 생성합니다.

2. 이 프로젝트 파일들을 저장소에 푸시합니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/law-firm-website.git
   git push -u origin main
   ```

3. GitHub 저장소 설정으로 이동하여 "Pages" 섹션에서 다음과 같이 설정합니다:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save 클릭

4. 몇 분 후 사이트가 `https://yourusername.github.io/law-firm-website/`에서 접근 가능합니다.

### 커스텀 도메인 설정하기

1. 도메인 등록 업체에서 새 도메인을 구매하거나 기존 도메인을 사용합니다.

2. GitHub 저장소 설정 > Pages > Custom domain에 도메인을 입력하고 Save를 클릭합니다.

3. 도메인 등록 업체의 DNS 설정에서 다음 레코드를 추가합니다:
   - A 레코드: 다음 IP 주소들을 가리키도록 설정
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - 또는 CNAME 레코드: `yourusername.github.io`를 가리키도록 설정

4. DNS 변경사항이 적용될 때까지 최대 24시간 기다립니다.

## 커스터마이징 방법

### 내용 수정

`index.html` 파일에서 다음 부분들을 수정하여 정보를 업데이트하세요:

- 로고 및 사무소 이름
- 핵심 가치 텍스트
- 구성원 프로필 및 이미지
- 전문 분야 목록
- 제휴 전문가 정보
- 연락처 및 위치 정보

### 스타일 수정

`style.css` 파일에서 다음을 수정할 수 있습니다:

- 색상 팔레트 (`:root` 섹션)
- 폰트 및 타이포그래피
- 레이아웃 및 간격
- 애니메이션 효과

### 이미지 추가

`images` 폴더에 다음 이미지를 추가하세요:

- hero-bg.jpg: 메인 배너 이미지
- attorney1.jpg, attorney2.jpg 등: 구성원 프로필 이미지
- 필요한 경우 로고 이미지

## 필요한 이미지 파일

웹사이트를 완성하려면 다음 이미지 파일이 필요합니다:

1. hero-bg.jpg - 메인 배너 배경 이미지
2. attorney1.jpg, attorney2.jpg - 변호사 프로필 이미지

이미지가 없는 경우 테스트 이미지를 사용하거나 직접 이미지를 추가하세요.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 