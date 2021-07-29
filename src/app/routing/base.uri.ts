import { trimEnd } from 'lodash';
import { environment } from '../../environment';

export function getBaseUri() {
    return trimEnd(environment.baseUri, '/');
}
