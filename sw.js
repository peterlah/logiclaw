// 캐시 이름 정의
const CACHE_NAME = 'logic-law-cache-v1';

// 캐싱할 리소스 URL 목록
const RESOURCES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/images/banner-background.jpg',
  '/images/member-1.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap',
  'https://img.icons8.com/dusk/64/000000/law.png',
  'https://img.icons8.com/dusk/128/000000/law.png',
  'https://img.icons8.com/dusk/192/000000/law.png'
];

// 서비스 워커 설치 및 리소스 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('캐시 생성 완료');
        return cache.addAll(RESOURCES_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// 이전 버전 서비스 워커 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 리소스 요청 중재
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 캐시에서 리소스 찾음
        if (response) {
          return response;
        }
        
        // 네트워크 요청을 복제 (stream은 한 번만 사용 가능)
        const fetchRequest = event.request.clone();
        
        // 네트워크에서 리소스 가져오기
        return fetch(fetchRequest)
          .then((response) => {
            // 유효한 응답인지 확인
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 응답 복제 (stream은 한 번만 사용 가능)
            const responseToCache = response.clone();
            
            // 응답을 캐시에 저장
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // 오프라인이고 이미지일 경우 기본 이미지 표시
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp)/i)) {
              return caches.match('/offline-image.jpg');
            }
            
            // 오프라인일 경우 오프라인 페이지 표시
            return caches.match('/offline.html');
          });
      })
  );
}); 