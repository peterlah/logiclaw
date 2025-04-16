// 모바일 환경 확인 함수
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768);
}

// 페이지 로드 최적화 - CSS 및 HTML 로드 후 바로 UI 표시
document.addEventListener('DOMContentLoaded', function() {
    // 패시브 이벤트 리스너 지원 확인
    let passiveSupported = false;
    try {
        const options = {
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
    } catch(err) {
        passiveSupported = false;
    }
    
    // 모바일 메뉴 버튼 요소 생성
    const header = document.querySelector('header .container');
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('role', 'button');
    mobileMenuBtn.setAttribute('aria-label', '메뉴 열기');
    mobileMenuBtn.setAttribute('tabindex', '0');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    header.appendChild(mobileMenuBtn);

    // 모바일 메뉴 버튼에 스타일 적용
    const style = document.createElement('style');
    style.innerHTML = `
        .mobile-menu-btn {
            display: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 8px;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);

    // 메뉴 토글 기능
    const navMenu = document.querySelector('nav ul');
    
    // 키보드 접근성 추가
    mobileMenuBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    
    function toggleMenu() {
        const isExpanded = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        
        // 아이콘 변경
        const icon = mobileMenuBtn.querySelector('i');
        if (!isExpanded) {
            icon.className = 'fas fa-times';
            mobileMenuBtn.setAttribute('aria-label', '메뉴 닫기');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            icon.className = 'fas fa-bars';
            mobileMenuBtn.setAttribute('aria-label', '메뉴 열기');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    // 메뉴 항목 클릭 시 메뉴 닫기
    const menuItems = document.querySelectorAll('nav ul li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                mobileMenuBtn.setAttribute('aria-label', '메뉴 열기');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 창 크기 변경 시 메뉴 상태 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            mobileMenuBtn.setAttribute('aria-label', '메뉴 열기');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // 요소 등장 애니메이션 (모바일에서는 지연 로딩을 위한 설정)
    setupAnimation();
    
    // 스크롤 이벤트에 패시브 옵션 적용
    window.addEventListener('scroll', scrollHandler, passiveSupported ? { passive: true } : false);
    console.log('스크롤 이벤트 리스너가 등록되었습니다.');
    
    // 초기 스크롤 위치에 따라 헤더 상태 설정
    scrollHandler();
    
    // 부드러운 스크롤 기능 설정
    setupSmoothScroll();
});

// 추가 보험으로 window 로드 시에도 스크롤 리스너 등록
window.addEventListener('load', function() {
    // 이미지 지연 로딩 처리 (실제 이미지가 추가될 경우)
    if ('loading' in HTMLImageElement.prototype) {
        // 브라우저가 기본 지연 로딩을 지원하는 경우
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // 지연 로딩 폴리필 로드 (실제 구현 시 필요)
        // const script = document.createElement('script');
        // script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        // document.body.appendChild(script);
    }
    
    // 스크롤 이벤트 리스너 재등록
    window.addEventListener('scroll', scrollHandler, { passive: true });
    console.log('로드 완료 후 스크롤 이벤트 리스너가 다시 등록되었습니다.');
    
    // 성능 모니터링을 위한 측정 (개발 중에만 사용)
    if (window.performance) {
        const performanceTiming = window.performance.timing;
        const pageLoadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
        console.log('페이지 로드 시간: ', pageLoadTime + 'ms');
    }
});

// 성능 최적화를 위한 스크롤 핸들러 분리
function scrollHandler() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        // 인라인 스타일로 직접 적용
        header.style.backgroundColor = 'rgba(26, 42, 86, 0.98)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
        header.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
        header.style.padding = '0.7rem 0';
        console.log('스크롤 아래: 헤더에 scrolled 클래스와 스타일 추가됨');
    } else {
        header.classList.remove('scrolled');
        // 인라인 스타일로 직접 적용
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
        header.style.borderBottom = 'none';
        header.style.padding = '1rem 0';
        console.log('스크롤 위: 헤더에서 scrolled 클래스와 스타일 제거됨');
    }
}

// 부드러운 스크롤 기능 설정
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 애니메이션 설정 함수
function setupAnimation() {
    const isMobile = isMobileDevice();
    
    // 모바일에서 애니메이션을 줄이거나 최적화
    const options = {
        threshold: isMobile ? 0.1 : 0.3,
        rootMargin: isMobile ? '0px' : '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 모바일에서는 애니메이션 지연 시간을 줄임
                const delay = isMobile ? 100 : 200;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // 애니메이션 적용할 요소 선택
    const elements = document.querySelectorAll('.value-item, .member-card, .expertise-item, .partner, .appointment-btn');
    
    // 애니메이션 스타일 추가
    const style = document.createElement('style');
    
    // 모바일에서는 더 빠른 전환 속도 사용
    const transitionDuration = isMobile ? '0.4s' : '0.6s';
    
    style.innerHTML = `
        .value-item, .member-card, .expertise-item, .partner, .appointment-btn {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity ${transitionDuration} ease, transform ${transitionDuration} ease;
        }
        
        .value-item.visible, .member-card.visible, .expertise-item.visible, .partner.visible, .appointment-btn.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // 요소 관찰 시작
    elements.forEach(element => {
        observer.observe(element);
    });
}