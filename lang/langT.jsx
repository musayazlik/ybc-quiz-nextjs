import tr from "./tr"
import en from "./en"

const lang = (lang) => {
  if (lang === "tr") {
    return tr
  } else if (lang === "en") {
    return en
  }
}

export { tr, en, lang }
