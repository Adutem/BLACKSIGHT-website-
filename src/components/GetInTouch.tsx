import React from 'react';

export const GetInTouch = () => {
  // Initialize Cal.com script when component mounts
  React.useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", "30min", { origin: "https://cal.com" });
    
    Cal.ns["30min"]("inline", {
      elementOrSelector: "#my-cal-inline",
      config: { "layout": "month_view" },
      calLink: "blacksightceo/30min",
    });

    Cal.ns["30min"]("ui", {
      "hideEventTypeDetails": false,
      "layout": "month_view"
    });
  }, []);

  return (
    <section className="max-w-5xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3">Get in Touch</h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Schedule a consultation with our AI experts
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <div 
            id="my-cal-inline" 
            className="w-full h-[600px] overflow-auto"
          ></div>
        </div>
      </div>
    </section>
  );
};