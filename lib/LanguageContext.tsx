'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, TranslationType, translations } from './i18n'

interface LanguageContextType {
  lang: Lang
  t: TranslationType
  toggle: () => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  t: translations.ar,
  toggle: () => {},
  isRTL: true,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar')

  useEffect(() => {
    const saved = localStorage.getItem('ayc-lang') as Lang | null
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLang(saved)
    }
  }, [])

  useEffect(() => {
    const t = translations[lang]
    document.documentElement.dir = t.dir
    document.documentElement.lang = t.lang
    localStorage.setItem('ayc-lang', lang)
  }, [lang])

  const toggle = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'))

  return (
    <LanguageContext.Provider
      value={{
        lang,
        t: translations[lang],
        toggle,
        isRTL: lang === 'ar',
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
