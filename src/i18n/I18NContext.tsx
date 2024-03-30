import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import Translator from "./Translator";

const I18NContext = createContext({});

type I18NProviderProps = {
  locale: string;
  urlApp: string;
  folderPath: string
  children: ReactNode;
}

export function I18NProvider(props: I18NProviderProps) {
  const { locale: originalLocale, urlApp, folderPath, children } = props;

  const [locale, setLocale] = useState(originalLocale);
  const [translator, setTranslator] = useState();

  useEffect(() => {
    async function fetchData(locale) {
      const loadedJSON = await fetch(`${urlApp}${folderPath}${locale}.json`)
        .then((response) => response.json())
        .then((json) => json);

      const translator = new Translator(locale, loadedJSON);
      setTranslator(translator);
    }
    fetchData(locale);
  }, [locale]);

  const value = useMemo(()=> {
    return translator ? {locale, setLocale, _: translator._, _n: translator._n, _c: translator._c, _cn: translator._cn} : {};
  }, [translator, locale, setLocale]);

  return translator ? <I18NContext.Provider value={value}>{children}</I18NContext.Provider> : <div>Loading...</div>;
}

export function useI18NContext() {
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
