import { useSelector } from '@app/client/hook';
import { selectPlayerWaitStatus, selectIsDealer } from '../../../client/selector/game';

export const usePlayerStatusList = () => useSelector(selectPlayerWaitStatus);

export const useIsDealer = () => useSelector(selectIsDealer);
