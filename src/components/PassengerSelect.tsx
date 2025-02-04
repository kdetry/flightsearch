import { useAtom } from 'jotai';
import { passengersAtom } from '../store/atoms';
import PassengerCount from './PassengerCount';

export default function PassengerSelect() {
  const [passengers, setPassengers] = useAtom(passengersAtom);
  return <PassengerCount value={passengers} onChange={setPassengers} />;
} 