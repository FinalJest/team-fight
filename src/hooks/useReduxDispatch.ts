import { useDispatch } from 'react-redux';
import { DispatchActions } from '../modules';

export const useReduxDispatch = (): DispatchActions => useDispatch<DispatchActions>();
