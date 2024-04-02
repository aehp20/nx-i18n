import gettext from "gettext.js";

type ArgumentsProps = { [key: string]: string | number };

type FormatArgumentsProps = {
  msgid: string;
  msgid_plural?: string;
  args: ArgumentsProps;
};

export default class Translator {
  i18n;

  constructor(locale: string, loadedJSON: gettext.JsonData) {
    this.i18n = gettext();
    this.i18n.loadJSON(loadedJSON, "");
    this.i18n.setLocale(locale);
  }

  formatArguments({msgid, msgid_plural, args}: FormatArgumentsProps) {
    let newMsgid = msgid ?? "";
    let newMsgidPlural = msgid_plural ?? "";

    const newArgs: unknown[] = [];

    Object.keys(args).forEach((key: string, index: number) => {
      newMsgid = newMsgid.replace(`{${key}}`, `%${index+1}`);
      newMsgidPlural = newMsgidPlural.replace(`{${key}}`, `%${index+1}`);
      newArgs.push(args[key]);
    });
    return {newMsgid, newMsgidPlural, newArgs};
  }

  _ = (...originalArguments: Array<any>) => {
    const [msgid, args] = originalArguments;
    if (args) {
      const {newMsgid, newArgs} = this.formatArguments({msgid, args});
      return this.i18n.gettext(newMsgid, ...newArgs);
    }
    return this.i18n.gettext(msgid, args);
  }

  _n = (...originalArguments: Array<any>) => {
    const [msgid, msgid_plural, count, args] = originalArguments;
    if (args) {
      const {newMsgid, newMsgidPlural, newArgs} = this.formatArguments({msgid, msgid_plural, args});
      return this.i18n.ngettext(newMsgid, newMsgidPlural, count, ...newArgs);
    }
    return this.i18n.ngettext(msgid, msgid_plural, count, args);
  };

  _c = (...originalArguments: Array<any>) => {
    const [msgctxt, msgid, args] = originalArguments;
    if (args) {
      const {newMsgid, newArgs} = this.formatArguments({msgid, args});
      return this.i18n.pgettext(msgctxt, newMsgid, newArgs);
    }
    return this.i18n.pgettext(msgctxt, msgid, args);
  }

  _cn = (...originalArguments: Array<any>) => {
    const [msgctxt, msgid, msgid_plural, n, args] = originalArguments;
    if (args) {
      const {newMsgid, newMsgidPlural, newArgs} = this.formatArguments({msgid, msgid_plural, args});
      return this.i18n.dcnpgettext(undefined, msgctxt, newMsgid, newMsgidPlural, n, ...newArgs);
    }
    return this.i18n.dcnpgettext(undefined, msgctxt, msgid, msgid_plural, n, args);
  }
}
