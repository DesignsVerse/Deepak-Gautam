// Global type declarations for Google Analytics and Tag Manager

interface Window {
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
  gtag_report_conversion?: (url?: string) => boolean;
}
