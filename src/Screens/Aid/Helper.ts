import i18n from '../../i18n';
import { getProtocolData } from '../../i18n/utils/getProtocolData';
import HeartAttackIcon from '../../Icons/heart-attack-24.svg';
import AnaphylaxisIcon from '../../Icons/anaphylaxis-24.svg';
import HeadInjuryIcon from '../../Icons/head-injury-24.svg';
import OpiateOverdoseIcon from '../../Icons/opiate-overdose-24.svg';
import SeizureIcon from '../../Icons/seizure-24.svg';
import BurnInjuryIcon from '../../Icons/burn-injury-24.svg';
import CPRIcon from '../../Icons/cpr-24.svg';
import BleedingIcon from '../../Icons/bleeding-24.svg';
import ShockIcon from '../../Icons/shock-24.svg';
import BurnsIcon from '../../Icons/burns-24.svg';
import FracturesIcon from '../../Icons/fractures-24.svg';
import WoundsIcon from '../../Icons/wounds-24.svg';

const getCategoriesEmergency = () => [
  {
    label: i18n.t('aid.categories.heartAttack'),
    icon: HeartAttackIcon,
    pageContent: getProtocolData('heart_attack'),
  },
  {
    label: i18n.t('aid.categories.anaphylaxis'),
    icon: AnaphylaxisIcon,
    pageContent: getProtocolData('anaphylaxis'),
  },
  {
    label: i18n.t('aid.categories.headInjury'),
    icon: HeadInjuryIcon,
    pageContent: getProtocolData('head_injury'),
  },
  {
    label: i18n.t('aid.categories.opiateOverdose'),
    icon: OpiateOverdoseIcon,
    pageContent: getProtocolData('opiate_overdose'),
  },
  {
    label: i18n.t('aid.categories.seizure'),
    icon: SeizureIcon,
    pageContent: getProtocolData('seisure'),
  },
  {
    label: i18n.t('aid.categories.burnInjury'),
    icon: BurnInjuryIcon,
    pageContent: getProtocolData('burn_injury'),
  },
  { label: i18n.t('aid.categories.cpr'), icon: CPRIcon, pageContent: getProtocolData('CPR') },
];

const getCategoriesFirstAid = () => [
  { label: i18n.t('aid.categories.bleeding'), icon: BleedingIcon, pageContent: null },
  { label: i18n.t('aid.categories.shock'), icon: ShockIcon, pageContent: null },
  { label: i18n.t('aid.categories.burns'), icon: BurnsIcon, pageContent: null },
  { label: i18n.t('aid.categories.fractures'), icon: FracturesIcon, pageContent: null },
  { label: i18n.t('aid.categories.wounds'), icon: WoundsIcon, pageContent: null },
];

export const getTabs = () => [
  {
    key: i18n.t('aid.emergencyResponse'),
    title: i18n.t('aid.emergencyResponse'),
    content: getCategoriesEmergency(),
  },
  {
    key: i18n.t('aid.firstAid'),
    title: i18n.t('aid.firstAid'),
    content: getCategoriesFirstAid(),
  },
];
