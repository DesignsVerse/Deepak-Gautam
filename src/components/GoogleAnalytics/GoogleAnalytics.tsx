// components/GoogleAnalytics.tsx
import Script from "next/script";

interface GoogleAnalyticsProps {
  trackingIds: string[];
}

const GoogleAnalytics = ({ trackingIds }: GoogleAnalyticsProps) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingIds[0]}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          ${trackingIds.map((id) => `gtag('config', '${id}');`).join("\n")}
          
          // Google Ads Conversion Tracking Function
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-17974197468/hB-LCPjq-P4bENz54fpC',
                'event_callback': callback
            });
            return false;
          }
          
          // Make function globally available
          window.gtag_report_conversion = gtag_report_conversion;
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;