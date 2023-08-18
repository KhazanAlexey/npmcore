export enum WpKeys {
  LoanTerm = 'loan_term',
  LoanSum = 'loan_sum',
  LoanPromoCode = 'loan_promocode',
  AccessToken = 'access_token',
  RefreshToken = 'refresh_token',
  TargetUrl = 'target_url',
  CurrentLanguage = 'current_language',
  DevApiUrl = 'dev_api_url',
}

export interface WpContactsHeader {
  title: string;
  phone: string;
  phone_text: string;
  phone_whatsapp: string;
  phone_whatsapp_text: string;
  email: string;
  email_text: string;
  schedule: string;
  schedule_text: string;
  language_title: string;
  subtitle: string;
  telegram: string;
  telegram_text: string;
  description: string;
}

export interface WpContactsFooter extends WpContactsHeader {
  phone_title: string;
  phone_whatsapp_title: string;
  telegram_title: string;
  email_title: string;
  schedule_title: string;
  add_field_title: string;
  add_field: string;
  add_field_text: string;
  address: string;
}

export interface WpMenu {
  title: string;
  url: string;
}

export interface WpSocial {
  icon: string;
  url: string;
}

export interface WpModalInfo {
  title: string;
  content: string;
}

export interface WpDocument {
  title: string;
  content: string;
  url: string;
}

export interface WpContent {
  header: {
    contacts: WpContactsHeader;
    menu: WpMenu[];
    mobile_menu: WpMenu[];
    mobile_menu_title: string;
    stocks_count: number;
  };
  footer: {
    contacts: WpContactsFooter;
    contacts_2: WpContactsFooter;
    btn_text: string;
    btn_link: string;
    menu_title: string;
    menu: WpMenu[];
    menu_title_2: string;
    menu2: WpMenu[];
    btn_more: string;
    btn_less: string;
    socials_title: string;
    socials: WpSocial[];
    apps_title: string;
    apps_description: string;
    apps_links: WpSocial[];
    license: string;
    note: string;
    copyright: string;
    documents: WpMenu[];
    underfooter_title: string;
    underfooter_text: string;
    underfooter_description: string;
    modal_info: WpModalInfo[];
  };
  documents: {
    [key: string]: WpDocument[];
  };
}
