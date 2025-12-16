export const EMERGENCY_NUMBERS: Record<
  string,
  {
    police: string;
    ambulance: string;
    fire: string;
  }
> = {
  RO: { police: '112', ambulance: '112', fire: '112' },
  US: { police: '911', ambulance: '911', fire: '911' },
  CA: { police: '911', ambulance: '911', fire: '911' },
  GB: { police: '999', ambulance: '999', fire: '999' },
  AU: { police: '000', ambulance: '000', fire: '000' },
  NZ: { police: '111', ambulance: '111', fire: '111' },
  FR: { police: '17', ambulance: '15', fire: '18' },
  DE: { police: '110', ambulance: '112', fire: '112' },
  IT: { police: '113', ambulance: '118', fire: '115' },
  ES: { police: '091', ambulance: '061', fire: '080' },
  NL: { police: '112', ambulance: '112', fire: '112' },
  TR: { police: '155', ambulance: '112', fire: '110' },
  CN: { police: '110', ambulance: '120', fire: '119' },
  JP: { police: '110', ambulance: '119', fire: '119' },
};

export type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
  fromDevice: boolean;
};

export function getDefaultEmergencyContactsByCountry(countryCode: string) {
  const info = EMERGENCY_NUMBERS[countryCode] ?? {
    police: '112',
    ambulance: '112',
    fire: '112',
  };

  return [
    { id: 'police', name: 'Police', phone: info.police, fromDevice: false },
    { id: 'ambulance', name: 'Ambulance', phone: info.ambulance, fromDevice: false },
    { id: 'fire', name: 'Fire Department', phone: info.fire, fromDevice: false },
  ];
}
