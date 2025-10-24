import { Messages } from '../../Constants/Messages';
import Icon from '../../Icons/anaphylaxis-24.svg';

const categoriesEmergency = [
  { label: 'Heart attack', icon: Icon },
  { label: 'Anaphylaxis', icon: Icon },
  { label: 'Head injury', icon: Icon },
  { label: 'Opiate overdose', icon: Icon },
  { label: 'Seizure', icon: Icon },
  { label: 'Burn injury', icon: Icon },
  { label: 'CPR', icon: Icon },
];

const categoriesFirstAid = [
  { label: 'Bleeding', icon: Icon },
  { label: 'Shock', icon: Icon },
  { label: 'Burns', icon: Icon },
  { label: 'Fractures', icon: Icon },
  { label: 'Wounds', icon: Icon },
];

export const tabs = [
  {
    key: Messages.emergencyRespone,
    title: Messages.emergencyRespone,
    content: categoriesEmergency,
  },
  {
    key: Messages.firstAid,
    title: Messages.firstAid,
    content: categoriesFirstAid,
  },
];
