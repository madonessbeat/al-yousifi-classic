'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  year: string
  title: { ar: string; en: string }
  body: { ar: string; en: string }
}

const ITEMS: TimelineItem[] = [
  {
    year: '2014',
    title: { ar: 'التأسيس', en: 'Founded' },
    body: {
      ar: 'أُسِّست اليوسفي كلاسيك برؤية واحدة — إعادة تعريف موضة الرجال في السودان.',
      en: 'Al-Yousifi Classic was born with one vision — to redefine menswear in Sudan.',
    },
  },
  {
    year: '2016',
    title: { ar: 'أول تشكيلة', en: 'First Collection' },
    body: {
      ar: 'إطلاق أول تشكيلة رسمية كاملة مع خطوط الكتان والقطن الفاخر.',
      en: 'Launch of the first full formal collection with premium linen and cotton lines.',
    },
  },
  {
    year: '2019',
    title: { ar: 'التوسع', en: 'Expansion' },
    body: {
      ar: 'توسيع المرسم وإضافة خطوط الأحذية الجلدية والإكسسوارات الحصرية.',
      en: 'Atelier expansion — adding handcrafted leather footwear and exclusive accessories.',
    },
  },
  {
    year: '2022',
    title: { ar: 'المتجر الرئيسي', en: 'Flagship Store' },
    body: {
      ar: 'افتتاح المتجر الرئيسي في شارع الكلاكلة، الخرطوم.',
      en: 'Grand opening of the flagship store on Alkalakla Avenue, Khartoum.',
    },
  },
  {
    year: '2025',
    title: { ar: 'التشكيلة النوبية', en: 'The Nubian Collection' },
    body: {
      ar: 'إطلاق التشكيلة النوبية — الخريف، ألوان الصحراء في أبهى صورها.',
      en: 'Launch of The Nubian Collection — Fall, desert tones at their finest.',
    },
  },
]

interface Props {
  lang: 'ar' | 'en'
}

export default function Timeline({ lang }: Props) {
  return (
    <div className="relative max-w-[700px] mx-auto">
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-1/2 top-0 bottom-0 w-px origin-top"
        style={{ background: 'rgba(193,167,130,0.12)', transform: 'translateX(-50%)' }}
      />

      <div className="flex flex-col gap-16">
        {ITEMS.map((item, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 }}
              className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6"
            >
              {/* Left content */}
              <div className={isLeft ? 'text-right' : ''}>
                {isLeft && (
                  <>
                    <p className="font-cormorant text-[28px] font-light text-gold leading-none mb-1">{item.year}</p>
                    <h4 className="text-[11px] tracking-[3px] uppercase text-ivory/60 font-jost mb-2">{item.title[lang]}</h4>
                    <p className="text-[13px] text-ivory/35 leading-[1.8] font-light" dir="auto">{item.body[lang]}</p>
                  </>
                )}
              </div>

              {/* Center dot */}
              <div className="flex flex-col items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: 'var(--gold)', boxShadow: '0 0 12px rgba(193,167,130,0.3)' }}
                />
              </div>

              {/* Right content */}
              <div>
                {!isLeft && (
                  <>
                    <p className="font-cormorant text-[28px] font-light text-gold leading-none mb-1">{item.year}</p>
                    <h4 className="text-[11px] tracking-[3px] uppercase text-ivory/60 font-jost mb-2">{item.title[lang]}</h4>
                    <p className="text-[13px] text-ivory/35 leading-[1.8] font-light" dir="auto">{item.body[lang]}</p>
                  </>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
