import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import Translator from "./Translator";

const I18NContext = createContext({});

type I18NProviderProps = {
  locale: string;
  urlLoadLocale: string;
  children: ReactNode;
}

export function I18NProvider(props: I18NProviderProps) {
  const { locale, urlLoadLocale, children } = props;

  const [translator, setTranslator] = useState();

  useEffect(() => {
    async function fetchData() {
      const loadedJSON = await fetch(urlLoadLocale)
        .then((response) => response.json())
        .then((json) => json);

      const translator = new Translator(locale, loadedJSON);
      setTranslator(translator);
    }
    fetchData();
  }, []);

  const value = useMemo(()=> {
    return translator ? {locale, _: translator._, _n: translator._n, _c: translator._c, _cn: translator._cn} : {};
  }, [translator, locale]);

  return translator ? <I18NContext.Provider value={value}>{children}</I18NContext.Provider> : <div>Loading...</div>;
}

export function useI18NContext() {
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
