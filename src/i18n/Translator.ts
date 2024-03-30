import gettext from "gettext.js";

type FormatArgumentsProps = {
  msgid: string;
  msgid_plural: string;
  args: object;
};

export default class Translator {
  i18n;

  constructor(locale, loadedJSON) {
    this.i18n = gettext();
    this.i18n.loadJSON(loadedJSON, "");
    this.i18n.setLocale(locale);
  }

  formatArguments({msgid, msgid_plural, args}: FormatArgumentsProps) {
    let newMsgid = msgid ?? "";
    let newMsgidPlural = msgid_plural ?? "";
    const newArgs = [];
    Object.keys(args).forEach((key, index) => {
      newMsgid = newMsgid.replace(`{${key}}`, `%${index+1}`);
      newMsgidPlural = newMsgidPlural.replace(`{${key}}`, `%${index+1}`);
      newArgs.push(args[key]);
    });
    return {newMsgid, newMsgidPlural, newArgs};
  }

  _ = (...originalArguments) => {
    const [msgid, args] = originalArguments;
    if (args) {
      const {newMsgid, newArgs} = this.formatArguments({msgid, args});
      return this.i18n.gettext(newMsgid, ...newArgs);
    }
    return this.i18n.gettext.apply(this.i18n, originalArguments);
  }

  _n = (...originalArguments) => {
    const [msgid, msgid_plural, count, args] = originalArguments;
    if (args) {
      const {newMsgid, newMsgidPlural, newArgs} = this.formatArguments({msgid, msgid_plural, args});
      return this.i18n.ngettext(newMsgid, newMsgidPlural, count, ...newArgs);
    }
    return this.i18n.ngettext.apply(this.i18n, originalArguments);
  };

  _c = (...originalArguments) => {
    const [msgctxt, msgid, args] = originalArguments;
    if (args) {
      const {newMsgid, newArgs} = this.formatArguments({msgid, args});
      return this.i18n.pgettext(msgctxt, newMsgid, newArgs);
    }
    return this.i18n.pgettext.apply(this.i18n, originalArguments);
  }

  _cn = (...originalArguments) => {
    const [msgctxt, msgid, msgid_plural, n, args] = originalArguments;
    if (args) {
      const {newMsgid, newMsgidPlural, newArgs} = this.formatArguments({msgid, msgid_plural, args});
      return this.i18n.dcnpgettext(undefined, msgctxt, newMsgid, newMsgidPlural, n, ...newArgs);
    }
    return this.i18n.dcnpgettext(undefined, msgctxt, msgid, msgid_plural, n, args);
  }
}
