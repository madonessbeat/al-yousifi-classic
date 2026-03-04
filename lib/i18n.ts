export type Lang = 'ar' | 'en'

export const translations = {
  ar: {
    lang: 'ar' as Lang,
    dir: 'rtl',
    nav: {
      home: 'الرئيسية',
      about: 'عن المحل',
      collections: 'التشكيلات',
      categories: 'الفئات',
      lookbook: 'لوك بوك',
      contact: 'تواصل',
    },
    hero: {
      tagline: 'حيث تُعرَّف الأناقة',
      sub: 'تشكيلات حصرية للرجل العصري',
      cta: 'اكتشف التشكيلة',
      scroll: 'مرر',
    },
    about: {
      label: 'قصتنا',
      title: 'وُلدنا في قلب',
      titleAccent: 'الخرطوم',
      body: 'تأسّست اليوسفي كلاسيك برؤية واحدة: إعادة تعريف أزياء الرجال في السودان. نؤمن بأنّ كلّ رجل يستحقّ أزياءً تتحدّث قبل أن يتحدّث — قطعٌ صُنعت بعناية فائقة من خامات راقية وبفهمٍ عميق للرجولة العصرية. من مرسمنا في الخرطوم، نُبدع تشكيلات تجمع بين الإرث السوداني والأسلوب العالمي المعاصر.',
      stat1: { value: '١٠+', label: 'سنوات الخبرة' },
      stat2: { value: '٥٠٠+', label: 'تصميم حصري' },
      stat3: { value: '١٠٠٪', label: 'إرث سوداني' },
      cta: 'تعرّف علينا',
    },
    categories: {
      label: 'فئاتنا',
      title: 'كل ما يحتاجه',
      titleAccent: 'الرجل الراقي',
      explore: 'استعرض',
    },
    featured: {
      label: 'التشكيلة المميزة',
      tag: 'خريف ٢٠٢٥',
      title: 'التشكيلة',
      titleAccent: 'النوبية',
      body: 'مستوحاة من صمت الصحراء النوبية عند الغسق. ألوان كحلية داكنة وفحمية مع لمسات كهرمانية دافئة. كتان مُهيأ بدقة، بليزرات هيكلية، وإكسسوارات جلدية مخيطة يدويًا — صُمّمت للرجل السوداني العصري.',
      details: [
        { label: 'الخامة', value: 'كتان وقطن فاخر' },
        { label: 'الأسلوب', value: 'منظّم معاصر' },
        { label: 'اللون', value: 'كحلي ✦ فحمي ✦ كهرماني' },
      ],
      cta: 'اكتشف التشكيلة',
    },
    craftsmanship: {
      label: 'الحرفية',
      title: 'الكمال في',
      titleAccent: 'كل تفصيل',
      pillars: [
        {
          number: '٠١',
          title: 'القماش',
          body: 'نختار فقط أرقى الخامات: قطن فاخر، كتان مُشطَّف يدويًا، وخلطات صوف مستوردة لا تجدها في أي مكان آخر.',
        },
        {
          number: '٠٢',
          title: 'القصّة',
          body: 'كل قطعة مُفصَّلة بدقة لتناسب الرجل السوداني — واثق، رشيق، وراقٍ. لا شيء مصادفة، كل شيء بحساب.',
        },
        {
          number: '٠٣',
          title: 'التفاصيل',
          body: 'من خياطة يدوية دقيقة إلى تجهيزات مخصصة — الكمال يسكن في أصغر تفاصيل كل قطعة.',
        },
      ],
    },
    lookbook: {
      label: 'لوك بوك',
      title: 'سرد بصري',
      titleAccent: 'للأناقة',
      sub: 'لحظات من الأسلوب الراقي',
    },
    testimonials: {
      label: 'ما يقوله عملاؤنا',
      title: 'كلمات',
      titleAccent: 'صادقة',
      items: [
        {
          quote: 'اليوسفي لم يمنحني بدلة فحسب — بل منحني حضورًا. كلّ غرفة أدخلها، أدخلها بشكل مختلف.',
          author: 'أحمد م.',
          role: 'رجل أعمال، الخرطوم',
        },
        {
          quote: 'الجودة لا مثيل لها في السودان. كلّ قطعة تشعر وكأنها صُنعت لي وحدي.',
          author: 'عمر ع.',
          role: 'مهندس، أم درمان',
        },
        {
          quote: 'علامة تجارية تفهم الرجل السوداني — أنيق، واثق، وفخور بهويّته.',
          author: 'خالد س.',
          role: 'طبيب، الخرطوم بحري',
        },
      ],
    },
    contact: {
      label: 'تواصل معنا',
      title: 'نُسعد',
      titleAccent: 'بخدمتكم',
      address: { label: 'العنوان', value: 'شارع الكلاكلة\nالخرطوم، السودان' },
      phone: { label: 'الهاتف / واتساب', value: '+249 912 302 693' },
      hours: { label: 'ساعات العمل', value: 'السبت – الخميس: ١٠ص – ٩م\nالجمعة: مغلق' },
      instagram: { label: 'إنستغرام', value: '@alyousify.classic' },
      cta: 'تواصل عبر واتساب',
    },
    footer: {
      tagline: 'حيث تُعرَّف الأناقة — الخرطوم، السودان',
      navTitle: 'روابط',
      contactTitle: 'تواصل',
      copyright: '© ٢٠٢٥ اليوسفي كلاسيك. جميع الحقوق محفوظة.',
      madeIn: 'صُنع بعناية في الخرطوم ✦',
    },
    whatsapp: {
      message: 'مرحبًا، أنا مهتم بتشكيلات اليوسفي كلاسيك',
    },
  },

  en: {
    lang: 'en' as Lang,
    dir: 'ltr',
    nav: {
      home: 'Home',
      about: 'About',
      collections: 'Collections',
      categories: 'Categories',
      lookbook: 'Lookbook',
      contact: 'Contact',
    },
    hero: {
      tagline: 'Where Elegance Is Defined',
      sub: 'Exclusive Collections for the Modern Man',
      cta: 'Explore the Collection',
      scroll: 'Scroll',
    },
    about: {
      label: 'Our Story',
      title: 'Born in the Heart of',
      titleAccent: 'Khartoum',
      body: "Al-Yousifi Classic was founded with a singular vision: to redefine men's fashion in Sudan. We believe that every man deserves garments that speak before he does — pieces crafted with meticulous attention to detail, premium materials, and an understanding of modern masculinity. From our atelier in Khartoum, we create collections that bridge Sudanese heritage with contemporary global style.",
      stat1: { value: '10+', label: 'Years of Excellence' },
      stat2: { value: '500+', label: 'Exclusive Designs' },
      stat3: { value: '100%', label: 'Sudanese Heritage' },
      cta: 'Our Story',
    },
    categories: {
      label: 'Our Categories',
      title: 'Everything the',
      titleAccent: 'Distinguished Man Needs',
      explore: 'Explore',
    },
    featured: {
      label: 'Featured Collection',
      tag: 'Fall 2025',
      title: 'The Nubian',
      titleAccent: 'Collection',
      body: 'Inspired by the vast silence of the Nubian Desert at dusk. Deep navy and charcoal tones with amber accents. Tailored linens, structured blazers, and hand-stitched leather accessories — designed for the modern Sudanese gentleman.',
      details: [
        { label: 'Material', value: 'Premium Linen & Cotton' },
        { label: 'Style', value: 'Structured Contemporary' },
        { label: 'Palette', value: 'Navy ✦ Charcoal ✦ Amber' },
      ],
      cta: 'Explore Collection',
    },
    craftsmanship: {
      label: 'Craftsmanship',
      title: 'Perfection in',
      titleAccent: 'Every Detail',
      pillars: [
        {
          number: '01',
          title: 'The Fabric',
          body: "We source only the finest materials: premium cotton, hand-finished linens, and imported wool blends that you won't find anywhere else.",
        },
        {
          number: '02',
          title: 'The Cut',
          body: 'Every garment is precision-tailored to fit the Sudanese gentleman — confident, poised, and refined. Nothing is accidental. Everything is intentional.',
        },
        {
          number: '03',
          title: 'The Details',
          body: 'From hand-stitched seams to custom hardware — we believe that perfection lives in the smallest detail of every piece.',
        },
      ],
    },
    lookbook: {
      label: 'Lookbook',
      title: 'A Visual',
      titleAccent: 'Narrative',
      sub: 'Moments of refined style',
    },
    testimonials: {
      label: 'Client Words',
      title: 'Voices of',
      titleAccent: 'Excellence',
      items: [
        {
          quote: "Al-Yousifi didn't just give me a suit — it gave me a presence. Every room I enter, I enter differently.",
          author: 'Ahmed M.',
          role: 'Entrepreneur, Khartoum',
        },
        {
          quote: "The quality is unlike anything I've found in Sudan. Every piece feels like it was made for me alone.",
          author: 'Omar A.',
          role: 'Engineer, Omdurman',
        },
        {
          quote: 'A brand that truly understands the modern Sudanese man — elegant, confident, and culturally proud.',
          author: 'Khaled S.',
          role: 'Doctor, Khartoum North',
        },
      ],
    },
    contact: {
      label: 'Get in Touch',
      title: 'We Are',
      titleAccent: 'Here for You',
      address: { label: 'Address', value: 'Alkalakla Avenue\nKhartoum, Sudan' },
      phone: { label: 'Mobile / WhatsApp', value: '+249 912 302 693' },
      hours: { label: 'Opening Hours', value: 'Saturday – Thursday: 10AM – 9PM\nFriday: Closed' },
      instagram: { label: 'Instagram', value: '@alyousify.classic' },
      cta: 'Chat on WhatsApp',
    },
    footer: {
      tagline: 'Where Elegance Is Defined — Khartoum, Sudan',
      navTitle: 'Navigation',
      contactTitle: 'Contact',
      copyright: '© 2025 Al-Yousifi Classic. All rights reserved.',
      madeIn: 'Crafted with care in Khartoum ✦',
    },
    whatsapp: {
      message: "Hello, I'm interested in Al-Yousifi Classic collections",
    },
  },
}

export const CATEGORIES = [
  {
    id: 'formal',
    image: 'photo-1617137968427-85924c800a22',
    ar: 'الرسمي',
    en: 'Formal',
    arSub: 'بدلات وقمصان فاخرة',
    enSub: 'Refined suits & dress shirts',
  },
  {
    id: 'casual',
    image: 'photo-1490114538077-0a7f8cb49891',
    ar: 'الكاجوال',
    en: 'Casual',
    arSub: 'أناقة يومية معاصرة',
    enSub: 'Premium everyday elegance',
  },
  {
    id: 'footwear',
    image: 'photo-1542291026-7eec264c27ff',
    ar: 'الأحذية',
    en: 'Footwear',
    arSub: 'جلود مصنوعة يدويًا',
    enSub: 'Handcrafted leather shoes',
  },
  {
    id: 'slippers',
    image: 'photo-1608256246200-54f2c77b77d5',
    ar: 'الشبشب',
    en: 'Slippers',
    arSub: 'راحة بلمسة فاخرة',
    enSub: 'Artisanal comfort & luxury',
  },
  {
    id: 'watches',
    image: 'photo-1523275335684-37898b6baf30',
    ar: 'الساعات',
    en: 'Watches',
    arSub: 'توقيت من مستوى آخر',
    enSub: 'Curated timepieces',
  },
  {
    id: 'rings',
    image: 'photo-1602173574767-37ac01994b2a',
    ar: 'الخواتم',
    en: 'Rings',
    arSub: 'قطع توقيع مميزة',
    enSub: 'Signature statement pieces',
  },
]

export const LOOKBOOK_IMAGES = [
  { id: 'photo-1507003211169-0a1dd7228f2d', span: 'tall' },
  { id: 'photo-1490895668178-57960d4f8c0f', span: 'wide' },
  { id: 'photo-1441984904996-e0b6ba687e04', span: 'normal' },
  { id: 'photo-1558618666-fcd25c85cd64', span: 'normal' },
  { id: 'photo-1515886657613-9f3515b0c78f', span: 'normal' },
  { id: 'photo-1536766820879-059fec98ec0a', span: 'wide' },
  { id: 'photo-1534030347209-467a5b0ad3e6', span: 'normal' },
  { id: 'photo-1474631245212-32dc3c8310c6', span: 'normal' },
]

export type TranslationType = typeof translations.ar
