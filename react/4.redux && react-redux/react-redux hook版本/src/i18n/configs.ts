import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from './en.json'
import translationZh from './zh.json'

const resources = {
  en: {
    translation: translationEn
  },
  zh: {
    translation: translationZh
  }
};

i18n
  .use(initReactI18next) // pass es i18n down to react-i18next
  .init({
    resources,
    lng: "zh", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;