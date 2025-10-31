import i18n from '../config';

import heartAttackEn from '../locales/protocols/en/heart_attack.json';

import heartAttackRo from '../locales/protocols/ro/heart_attack.json';

const protocols = {
  en: {
    heart_attack: heartAttackEn,
  },
  ro: {
    heart_attack: heartAttackRo,
  },
};

export const getProtocolData = (protocolId: string) => {
  const currentLanguage = i18n.language as 'en' | 'ro';
  const languageProtocols = protocols[currentLanguage] || protocols.en;

  // @ts-ignore - Dynamic key access
  return languageProtocols[protocolId] || protocols.en[protocolId];
};

export const getAvailableProtocols = () => {
  return Object.keys(protocols.en);
};
