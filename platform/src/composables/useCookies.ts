import { inject } from 'vue';
import { VueCookies } from 'vue-cookies';

export default function useCookies() {
    return inject<VueCookies>('$cookies')!;
}
