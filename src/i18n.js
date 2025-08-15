// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      globalShipping: "Global Shipping Solutions",
      shipping: "Shipping",
      tracking: "Tracking",
      support: "Support",
      account: "Account",
      login: "Sign Up/Log In"
    }
  },
  fr: {
    translation: {
      globalShipping: "Solutions d'Expédition Globales",
      shipping: "Expédition",
      tracking: "Suivi",
      support: "Support",
      account: "Compte",
      login: "Inscription/Connexion"
    }
  },
  es: {
    translation: {
      globalShipping: "Soluciones de Envío Globales",
      shipping: "Envío",
      tracking: "Seguimiento",
      support: "Soporte",
      account: "Cuenta",
      login: "Registrarse/Iniciar sesión"
    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;