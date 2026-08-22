export const EXTERNAL_APIS = {
  mailTm: 'https://api.mail.tm',
  mailGw: 'https://api.mail.gw',
} as const;

export const MAIL_API_BASES = [EXTERNAL_APIS.mailGw, EXTERNAL_APIS.mailTm] as const;

export const SOCIAL_URLS = {
  facebook: 'https://facebook.com/genkiwardrobelk',
  instagram: 'https://instagram.com/genkiwardrobelk',
  tiktok: 'https://www.tiktok.com/@genkiwardrobelk',
  whatsapp: 'https://wa.me/94701002922',
  phoneTel: 'tel:0701002922',
} as const;
