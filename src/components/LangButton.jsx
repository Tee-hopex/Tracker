import { useEffect, useState } from "react";

// List shown in the dropdown (include EN for reset)
const LANGS = [
  { code: "en",   label: "English" },
  { code: "fr",   label: "Français" },
  { code: "es",   label: "Español" },
  { code: "de",   label: "Deutsch" },
  { code: "ar",   label: "العربية" },
  { code: "pt",   label: "Português" },
  { code: "it",   label: "Italiano" },
  { code: "zh-CN",label: "中文(简体)" }
];

function setCookieForAll(pair) {
  // pair like "/en/fr" or "/auto/en"
  const host = window.location.hostname;
  const domains = [host, host && `.${host}`].filter(Boolean);
  // path=/
  document.cookie = `googtrans=${pair}; path=/`;
  // and with domain (covers some hosting setups)
  domains.forEach(d => (document.cookie = `googtrans=${pair}; domain=${d}; path=/`));
}

function readCookieLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!m) return "en";
  const to = decodeURIComponent(m[1]).split("/").pop();
  return to || "en";
}

export default function LangDropdown() {
  const [value, setValue] = useState(readCookieLang());

  // Keep dropdown in sync if user changes via Google gadget
  useEffect(() => {
    const id = setInterval(() => setValue(readCookieLang()), 1000);
    return () => clearInterval(id);
  }, []);

  const onChange = (code) => {
    setValue(code);
    if (code === "en") {
      // reset to English (two variants)
      setCookieForAll("/auto/en");
      setCookieForAll("/en/en");
      window.location.reload();
      return;
    }
    // Base language is EN — if your base isn't English, change "/en/" below
    setCookieForAll(`/en/${code}`);
    window.location.reload();
  };

  return (
    <div className="lang-select-wrap">
      <label className="visually-hidden" htmlFor="lang-select">Change language</label>
      <select
        id="lang-select"
        className="lang-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Change language"
      >
        {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
      </select>
    </div>
  );
}
