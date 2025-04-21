export const loadCashfreeSDK = () => {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) return resolve(window.Cashfree);
      
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js";
      script.onload = () => resolve(window.Cashfree);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };
  