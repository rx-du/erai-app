import i18n from '../config';

// English protocols
import activeShooterEn from '../locales/protocols/en/active_shooter.json';
import heartAttackEn from '../locales/protocols/en/heart_attack.json';
import anaphylaxisEn from '../locales/protocols/en/anaphylaxis.json';
import burnInjuryEn from '../locales/protocols/en/burn_injury.json';
import chokingEn from '../locales/protocols/en/choking.json';
import cprEn from '../locales/protocols/en/CPR.json';
import diabetesEn from '../locales/protocols/en/diabetes.json';
import headInjuryEn from '../locales/protocols/en/head_injury.json';
import mentalHealthEn from '../locales/protocols/en/mental_health.json';
import opiateOverdoseEn from '../locales/protocols/en/opiate_overdose.json';
import seisureEn from '../locales/protocols/en/seisure.json';
import splintingEn from '../locales/protocols/en/splinting.json';
import bleedingEn from '../locales/protocols/en/bleeding.json';
import shockEn from '../locales/protocols/en/shock.json';
import burnsEn from '../locales/protocols/en/burns.json';
import fracturesEn from '../locales/protocols/en/fractures.json';
import woundsEn from '../locales/protocols/en/wounds.json';
import fluidElectrolyteEn from '../locales/protocols/en/fluid_electrolyte.json';

// Romanian protocols
import heartAttackRo from '../locales/protocols/ro/heart_attack.json';

const protocols = {
  en: {
    active_shooter: activeShooterEn,
    heart_attack: heartAttackEn,
    anaphylaxis: anaphylaxisEn,
    burn_injury: burnInjuryEn,
    choking: chokingEn,
    CPR: cprEn,
    diabetes: diabetesEn,
    head_injury: headInjuryEn,
    mental_health: mentalHealthEn,
    opiate_overdose: opiateOverdoseEn,
    seisure: seisureEn,
    splinting: splintingEn,
    bleeding: bleedingEn,
    burns: burnsEn,
    shock: shockEn,
    fractures: fracturesEn,
    wounds: woundsEn,
    fluid_electrolyte: fluidElectrolyteEn,
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
