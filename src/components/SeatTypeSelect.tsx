import { useAtom } from 'jotai';
import { seatTypeAtom } from '../store/atoms';
import SeatType from './SeatType';

export default function SeatTypeSelect() {
  const [seatType, setSeatType] = useAtom(seatTypeAtom);
  return <SeatType value={seatType} onChange={setSeatType} />;
} 