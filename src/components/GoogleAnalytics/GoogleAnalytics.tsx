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
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;