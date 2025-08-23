import { useEffect, useRef } from "react";

export default function GoogleTranslate({ languages = "fr,es,de,ar,pt,it,zh-CN" }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    function initWidget() {
      if (!window.google || !window.google.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages, // must match your dropdown options (except EN)
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        "google_translate_element"
      );
    }

    if (window.google && window.google.translate) { initWidget(); return; }
    window.googleTranslateElementInit = initWidget;

    if (!document.getElementById("gt-script")) {
      const s = document.createElement("script");
      s.id = "gt-script";
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.body.appendChild(s);
    }
  }, [languages]);

  return <div id="google_translate_element" />;
}
