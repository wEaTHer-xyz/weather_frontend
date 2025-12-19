/**
 * 브라우저 환경 감지 유틸리티
 */

/**
 * WebView 환경인지 확인
 * @returns {boolean} WebView 환경이면 true
 */
export function isWebView(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  const nav = window.navigator as Navigator & { standalone?: boolean };

  // 카카오톡 인앱 브라우저 감지
  const isKakaoTalk = /kakaotalk/i.test(userAgent);
  
  // iOS WebView 감지
  const isIOSWebView = /(iphone|ipad|ipod).*version\/[\d\.]+.*safari/i.test(userAgent) &&
    !nav.standalone &&
    !(window as any).MSStream;

  // Android WebView 감지
  const isAndroidWebView = /android/i.test(userAgent) &&
    /wv/i.test(userAgent);

  // 일반적인 WebView 패턴
  const isWebViewPattern = 
    /webview/i.test(userAgent) ||
    (/(iphone|ipad|ipod).*safari/i.test(userAgent) && !nav.standalone);

  return isKakaoTalk || isIOSWebView || isAndroidWebView || isWebViewPattern;
}

/**
 * 모바일 환경인지 확인
 * @returns {boolean} 모바일 환경이면 true
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    window.navigator.userAgent.toLowerCase()
  );
}

/**
 * iOS 환경인지 확인
 * @returns {boolean} iOS 환경이면 true
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase());
}

/**
 * Android 환경인지 확인
 * @returns {boolean} Android 환경이면 true
 */
export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /android/i.test(window.navigator.userAgent.toLowerCase());
}

/**
 * 시스템 브라우저로 리다이렉트
 * @param {string} url - 이동할 URL
 */
export function openInSystemBrowser(url: string): void {
  if (isIOS()) {
    // iOS: Safari로 열기
    window.location.href = url;
  } else if (isAndroid()) {
    // Android: Chrome Custom Tabs 또는 기본 브라우저로 열기
    // intent:// 스키마를 사용하여 Chrome으로 열기 시도
    const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`;
    
    // Intent URL이 작동하지 않으면 일반 URL 사용
    try {
      window.location.href = intentUrl;
      // Intent가 작동하지 않을 경우를 대비해 fallback
      setTimeout(() => {
        if (document.hasFocus()) {
          window.location.href = url;
        }
      }, 500);
    } catch (e) {
      window.location.href = url;
    }
  } else {
    // 데스크톱: 일반 리다이렉트
    window.location.href = url;
  }
}

/**
 * 현재 URL을 시스템 브라우저에서 열기
 */
export function reloadInSystemBrowser(): void {
  openInSystemBrowser(window.location.href);
}
