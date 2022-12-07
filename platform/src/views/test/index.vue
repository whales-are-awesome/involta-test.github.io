<template>
    <h1 class="mb-16 pb-16 border-b border-gray-300 mt-16">
        Test
    </h1>
    <div>
        <TextField
            v-model="textField3"
            view="floating-placeholder"
            placeholder="Placeholder text"
        />
    </div>
    <div>
        <TextField
            v-model="textField3"
            class="max-w-[400px]"
            inset-left-label="mdama"
            inset-label="lol"
            size="xl"
            placeholder="Placeholder text"
            :is-bold="true"
        />
    </div>
    <div>
        <TextField
            v-model="textField3"
            view="floating-placeholder"
            placeholder="Placeholder text"
            :icon="{
                name: 'warning',
                width: 12,
                prepend: false
            }"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WalletNameCard from '@/components/WalletNameCard/WalletNameCard.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseLabel from '@/components/BaseLabel/BaseLabel.vue';
import TagsList from '@/components/TagsList/TagsList.vue';
import BaseBreadcrumbs from '@/components/BaseBreadcrumbs/BaseBreadcrumbs.vue';
import BaseTimer from '@/components/BaseTimer/BaseTimer.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseCard from '@/components/BaseCard/BaseCard.vue';
import BaseSearch from '@/components/BaseSearch/BaseSearch.vue';
import DaoCard from '@/components/DaoCard/DaoCard.vue';
import DropField from '@/components/Form/DropField/DropField.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import DateField from '@/components/Form/DateField/DateField.vue';
import DateFieldsWrapper from '@/components/Form/DateField/DateFieldsWrapper.vue';
import BaseAccordion from '@/components/BaseAccordion/BaseAccordion.vue';
import useLayer from '@/composables/useLayer';

const tagList = [
    { title: 'Proposals', id: 0 },
    { title: 'Statistics', id: 1 },
    { title: 'DAOs', id: 2 },
    { title: 'APPs', id: 3 }
]
const tagListValue = 0;
const breadcrumbs = [
    { title: 'link 1', link: { name: 'home' } },
    { title: 'link 2', link: { name: 'home' } },
    { title: 'link 3', link: { name: 'home' } },
    { title: 'link 4' }
]
const selectItems = [
    { title: 'Earliest', id: 1 },
    { title: 'Latest', id: 2 }
];
const selectValue = ref(selectItems[0]);
const searchValue = ref('');

const textField = ref('');
const textField2 = ref('');
const textField3 = ref('');
const textField4 = ref('1234');
const dateField = ref('');
const textarea = ref('');

const { open, alert } = useLayer();

const wallets = [
    { name: 'InjectedWallet', icon: 'injectedWallet', isSelected: false, isDisabled: false },
    { name: 'ConnectWallet', icon: 'connect-wallet', isSelected: false, isDisabled: false },
    { name: 'Ledger', icon: 'ledger', isSelected: true, isDisabled: false },
    { name: 'TrustWallet', icon: 'trust-wallet', isSelected: false, isDisabled: true },
];
</script>
