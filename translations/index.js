var i18n = require("gettext.js")();

const locale = "es";
const json = require(`../locale/${locale}.json`);

i18n.loadJSON(json, "");
i18n.setLocale(locale);

function formatArguments({msgid, msgid_plural, args}) {
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

const _ = function () {
  const [msgid, args] = arguments;
  if (args) {
    const {newMsgid, newArgs} = formatArguments({msgid, args});
    return i18n.gettext(newMsgid, ...newArgs);
  }
  return i18n.gettext.apply(i18n, arguments);
};

const _n = function () {
  const [msgid, msgid_plural, count, args] = arguments;
  if (args) {
    const {newMsgid, newMsgidPlural, newArgs} = formatArguments({msgid, msgid_plural, args});
    return i18n.ngettext(newMsgid, newMsgidPlural, count, ...newArgs);
  }
  return i18n.ngettext.apply(i18n, arguments);
};

const _c = function () {
  const [msgctxt, msgid, args] = arguments;
  if (args) {
    const {newMsgid, newArgs} = formatArguments({msgid, args});
    return i18n.pgettext(msgctxt, newMsgid, newArgs);
  }
  return i18n.pgettext.apply(i18n, arguments);
};

const _cn = function () {
  const [msgctxt, msgid, msgid_plural, n, args] = arguments;
  if (args) {
    const {newMsgid, newMsgidPlural, newArgs} = formatArguments({msgid, msgid_plural, args});
    return i18n.dcnpgettext(undefined, msgctxt, newMsgid, newMsgidPlural, n, ...newArgs);
  }
  return i18n.dcnpgettext(undefined, msgctxt, msgid, msgid_plural, n, args);
};

module.exports = { _, _n, _c, _cn };
