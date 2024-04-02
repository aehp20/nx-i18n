import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";
import Translator from "./I18NTranslator";

type I18NProviderProps = {
  locale: string;
  urlApp: string;
  folderPath: string
  children: ReactNode;
}

type I18NContextProps = {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
  _: (...originalArguments: any[]) => string,
  _n: (...originalArguments: any[]) => string,
  _c: (...originalArguments: any[]) => string,
  _cn: (...originalArguments: any[]) => string
}

const I18NContext = createContext({} as I18NContextProps);

export function I18NProvider(props: I18NProviderProps) {
  const { locale: originalLocale, urlApp, folderPath, children } = props;

  const [locale, setLocale] = useState<string>(originalLocale);
  const [translator, setTranslator] = useState<Translator>();

  useEffect(() => {
    async function fetchData(locale: string) {
      const loadedJSON = await fetch(`${urlApp}${folderPath}${locale}.json`)
        .then((response) => response.json())
        .then((json) => json);

      const translator = new Translator(locale, loadedJSON);
      setTranslator(translator);
    }
    fetchData(locale);
  }, [locale]);

  const value = useMemo(()=> {
    if (translator) {
      const { _, _n, _c, _cn} = translator;
      return {
        locale,
        setLocale,
        _,
        _n,
        _c,
        _cn
      };
    }
    return null;
  }, [translator, locale, setLocale]);

  return value ? <I18NContext.Provider value={value}>{children}</I18NContext.Provider> : <div>Loading...</div>;
}

export function useI18NContext() {
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
