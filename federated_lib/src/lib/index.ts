import { FederatedComponent } from './factories/FederatedComponent';
import { Header as HeaderComponent, HeaderProps } from '../components/Header';
import { add as addFunction } from '../utils/add';
import { federatedFunction } from './factories/federatedFunction';


export const Header: React.FC<HeaderProps> = FederatedComponent(() => import('federated_lib/components/Header'), HeaderComponent);

export const add = federatedFunction(() => import('federated_lib/utils/add'), addFunction);