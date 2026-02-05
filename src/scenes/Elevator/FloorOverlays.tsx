import { useInventory } from '../../hooks/useInventory';
import { FairyLights } from '../Martina/objects/FairyLights/index';
import { Rosary } from '../Martina/objects/Rosary/index';
import { Lava } from '../Martina/objects/Lava/index';
import { Steam as JulieSteam } from '../Julie/objects/Steam/index';
import { ClockLines } from '../Julie/objects/ClockLines/index';
import { Urn } from '../Julie/objects/Urn/index';
import { Cat } from '../Samuel/objects/Cat/index';
import { Mask } from '../Samuel/objects/Mask/index';
import { Notes } from '../Laura/objects/Notes/index';
import { Steam as LauraSteam } from '../Laura/objects/Steam/index';

interface FloorOverlaysProps {
  floor: number;
}

export function FloorOverlays({ floor }: FloorOverlaysProps) {
  const { hasItem } = useInventory();

  if (floor === 1) {
    return (
      <>
        <FairyLights />
        {!hasItem('rosary') && <Rosary />}
        <Lava />
      </>
    );
  }

  if (floor === 2) {
    return (
      <>
        <Cat />
        {!hasItem('mask') && <Mask />}
      </>
    );
  }

  if (floor === 4) {
    return (
      <>
        <JulieSteam />
        <ClockLines />
        {!hasItem('urn') && <Urn />}
      </>
    );
  }

  if (floor === 5) {
    return (
      <>
        <Notes />
        <LauraSteam />
      </>
    );
  }

  return null;
}
