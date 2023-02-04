import React from "react"

const LangSelector = () => {
  return (
    <>
      <select name="" id="" onChange={changeLanguage}>
        <option value="tr" selected={locale === "tr" ? true : false}>
          Türkçe
        </option>
        <option value="en" selected={locale === "en" ? true : false}>
          English
        </option>
      </select>
    </>
  )
}

export default LangSelector
