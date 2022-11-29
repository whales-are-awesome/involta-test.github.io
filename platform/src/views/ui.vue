<template>
    <h1 class="mb-16 pb-16 border-b border-gray-300 mt-16">
        UI
    </h1>
    <div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Button</h3>
            <div class="space-y-8">
                <div class="space-x-5">
                    <h5 class="mb-6">Filled</h5>
                    <BaseButton
                        rounded="sm"
                        size="lg"
                        :icon="{
                            name: 'wallet',
                            width: 24
                        }"
                    >
                        Gray
                    </BaseButton>
                    <BaseButton
                        rounded="sm"
                        theme="surface"
                        :icon="{
                            name: 'wallet',
                            width: 20
                        }"
                    >
                        Surface
                    </BaseButton>
                    <BaseButton
                        rounded="sm"
                        theme="primary"
                        size="sm"
                        :icon="{
                            name: 'wallet',
                            width: 16
                        }"
                    >
                        Primary
                    </BaseButton>
                    <BaseButton
                        rounded="sm"
                        size="sm"
                        :icon="{
                            name: 'wallet',
                            width: 16
                        }"
                        :disabled="true"
                    >
                        Disabled
                    </BaseButton>
                </div>
                <div class="space-x-5">
                    <h5 class="mb-6">Outlined</h5>
                    <BaseButton
                        view="outlined"
                        rounded="lg"
                        size="lg"
                        :icon="{
                            name: 'wallet',
                            width: 24
                        }"
                    >
                        Button
                    </BaseButton>
                    <BaseButton
                        view="outlined"
                        rounded="lg"
                        :icon="{
                            name: 'wallet',
                            width: 20
                        }"
                    >
                        Button
                    </BaseButton>
                    <BaseButton
                        view="outlined"
                        rounded="lg"
                        size="sm"
                        :icon="{
                            name: 'wallet',
                            width: 16
                        }"
                    >
                        Button
                    </BaseButton>
                    <BaseButton
                        view="outlined"
                        rounded="lg"
                        size="sm"
                        :icon="{
                            name: 'wallet',
                            width: 16
                        }"
                        :disabled="true"
                    >
                        Button
                    </BaseButton>
                </div>
                <div class="space-x-5">
                    <h5 class="mb-6">Ghost</h5>
                    <BaseButton
                        view="ghost"
                        rounded="sm"
                        size="lg"
                        :icon="{
                            name: 'wallet',
                            width: 24,
                            prepend: true
                        }"
                    >
                        Button
                    </BaseButton>
                    <BaseButton
                        view="ghost"
                        rounded="sm"
                        :icon="{
                            name: 'wallet',
                            width: 20,
                            prepend: true
                        }"
                    >
                        Button
                    </BaseButton>
                    <BaseButton
                        view="ghost"
                        rounded="sm"
                        size="sm"
                        :icon="{
                            name: 'wallet',
                            width: 16,
                            prepend: true
                        }"
                    >
                        Button
                    </BaseButton>
                    <BaseButton
                        view="ghost"
                        rounded="sm"
                        size="sm"
                        :icon="{
                            name: 'wallet',
                            width: 16,
                            prepend: true
                        }"
                        :disabled="true"
                    >
                        Button
                    </BaseButton>
                </div>
            </div>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Labels</h3>
            <div class="space-y-7">
                <div class="space-x-5">
                    <BaseLabel theme="positive" view="filled" rounded="lg">Active</BaseLabel>
                    <BaseLabel theme="positive" view="faded" rounded="lg">Active</BaseLabel>
                    <BaseLabel theme="positive" view="outlined" rounded="lg">Active</BaseLabel>
                    <BaseLabel theme="positive" view="rounded" rounded="lg"/>
                </div>
                <div class="space-x-5">
                    <BaseLabel theme="warning" view="filled" rounded="lg">Stopped</BaseLabel>
                    <BaseLabel theme="warning" view="faded" rounded="lg">Stopped</BaseLabel>
                    <BaseLabel theme="warning" view="outlined" rounded="lg">Stopped</BaseLabel>
                    <BaseLabel theme="warning" view="rounded" rounded="lg"/>
                </div>
                <div class="space-x-5">
                    <BaseLabel theme="primary" view="filled" rounded="lg">Active</BaseLabel>
                    <BaseLabel theme="primary" view="faded" rounded="lg">Active</BaseLabel>
                    <BaseLabel theme="primary" view="outlined" rounded="lg">Active</BaseLabel>
                    <BaseLabel theme="primary" view="rounded" rounded="lg"/>
                </div>
                <div class="space-x-5">
                    <BaseLabel theme="critical" view="filled">Closed</BaseLabel>
                    <BaseLabel theme="critical" view="faded">Closed</BaseLabel>
                    <BaseLabel theme="critical" view="outlined">Closed</BaseLabel>
                    <BaseLabel theme="critical" view="rounded"/>
                </div>
                <div class="space-x-5">
                    <BaseLabel theme="neutral" view="filled">Closed</BaseLabel>
                    <BaseLabel theme="neutral" view="faded">Closed</BaseLabel>
                    <BaseLabel theme="neutral" view="outlined">Closed</BaseLabel>
                    <BaseLabel theme="positive" view="rounded"/>
                </div>
            </div>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Tag List</h3>
            <TagsList v-model="tagListValue" :items="tagList" />
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Breadcrumbs</h3>
            <div class="space-y-2">
                <BaseBreadcrumbs :items="breadcrumbs" />
                <BaseBreadcrumbs :items="breadcrumbs" :hash="false" :first-angle="false" view="primary" />
            </div>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Select Field</h3>
            <Form.SelectField
                class="max-w-[150px]"
                v-model="selectValue"
                :options="selectItems"
            />
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Timer</h3>
            <BaseTimer :end-date="new Date((new Date).setHours(23))"/>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Avatar</h3>
            <div class="space-x-5 flex">
                <BaseAvatar size="sm" src="data:image/jpeg;base64,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" alt="image" />
                <BaseAvatar size="md" src="data:image/jpeg;base64,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" alt="image" />
                <BaseAvatar src="data:image/jpeg;base64,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" alt="image" />
                <BaseAvatar rounded="sm" size="lg" src="data:image/jpeg;base64,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" alt="image" />
                <BaseAvatar rounded="lg" size="xl" src="data:image/jpeg;base64,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" alt="image" />
            </div>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Card</h3>
            <BaseCard
                :avatar="require('@/assets/images/common/placeholder.jpeg')"
                name="DAO Name"
                label-title="Active"
                title="Proposal Name"
                votes="14"
                :users="[{ id: 1, avatar: require('@/assets/images/common/placeholder.jpeg') }, { id: 2, avatar: require('@/assets/images/common/placeholder.jpeg') }, { id: 3, avatar: require('@/assets/images/common/placeholder.jpeg') } ]"
                text="Early Birds Early Birds  Early Birds Early Birds мEarly Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds Early Birds"
                :end-date="new Date((new Date).setHours(23))"
            />
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Search</h3>
            <BaseSearch
                class="max-w-[400px]"
                v-model="searchValue"
            />
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Dapp Card</h3>
            <div class="flex flex-wrap -mx-6">
                <div
                    class="w-1/4 px-6"
                    v-for="item in 4"
                    :key="item"
                >
                    <DaoCard
                        :avatar="require('@/assets/images/common/placeholder.jpeg')"
                        name="Dapp Name"
                        members="232"
                        proposals="232"
                    />
                </div>
            </div>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Drop Field</h3>
            <DropField
                class="max-w-[400px]"
            />
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Text Field</h3>
            <div class="space-y-10">
                <div>
                    <TextField
                        v-model="textField3"
                        class="max-w-[400px]"
                        placeholder="Placeholder text"
                        :is-bold="true"
                        title="Default field"
                    />
                </div>
                <div>
                    <TextField
                        v-model="textField"
                        class="max-w-[400px]"
                        placeholder="Placeholder text"
                        :required="true"
                        tip="tip 10/13"
                        tip-bottom="tip 12/13"
                        :icon="{
                            name: 'warning',
                            width: 12,
                            prepend: true
                        }"
                        title="Field with inset label"
                        tooltip="Some text"
                        inset-label="$9.32"
                        hint="Hint message."
                    />
                </div>
                <div>
                    <TextField
                        v-model="textField2"
                        class="max-w-[400px]"
                        placeholder="Placeholder text"
                        :required="true"
                        tip="tip 10/13"
                        tip-bottom="tip 12/13"
                        :icon="{
                            name: 'warning',
                            width: 12,
                            prepend: true
                        }"
                        title="Field with inset button"
                        tooltip="Some text"
                        hint="Hint message."
                        :is-bold="true"
                        button-title="Use average amount"
                        @button-click="textField2 = 'Ян киса'"
                    />
                </div>
                <div>
                    <TextField
                        v-model="textarea"
                        view="textarea"
                        class="max-w-[400px]"
                        placeholder="Placeholder text"
                        :is-bold="true"
                        title="Textarea field"
                        :maxlength="500"
                        :tip-bottom="`${500 - textarea.length} left`"
                    />
                </div>
                <div>
                    <TextField
                        v-model="textField4"
                        class="max-w-[400px]"
                        placeholder="Placeholder text"
                        :required="true"
                        tip="tip 10/13"
                        tip-bottom="tip 12/13"
                        :icon="{
                            name: 'warning',
                            width: 12,
                            prepend: true
                        }"
                        title="Field with inset button"
                        tooltip="Some text"
                        error="Error text."
                        :is-bold="true"
                        button-title="Use average amount"
                        @button-click="textField2 = 'Ян киса'"
                    />
                </div>
                <div>
                    <TextField
                        v-model="textField4"
                        class="max-w-[400px]"
                        placeholder="Placeholder text"
                        :required="true"
                        tip="tip 10/13"
                        :disabled="true"
                        tip-bottom="tip 12/13"
                        :icon="{
                            name: 'warning',
                            width: 12,
                            prepend: true
                        }"
                        title="Disabled field"
                        tooltip="Some text"
                        :is-bold="true"
                        button-title="Use average amount"
                        @button-click="textField2 = 'Ян киса'"
                    />
                </div>
            </div>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Date Field {{ dateField }}</h3>
            <DateFieldsWrapper>
                <DateField
                    v-model="dateField"
                    title="Date Field"
                />
                <DateField
                    v-model="dateField"
                    title="Date Field"
                />
            </DateFieldsWrapper>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Accordion</h3>
            <BaseAccordion
                class="max-w-[400px]"
                title="Advanced DAO information"
            >
                <div class="space-y-2">
                    <TextField
                        v-for="item in 4"
                        :key="item"
                        v-model="textField2"
                        placeholder="Placeholder text"
                        :required="true"
                        tip="tip 10/13"
                        tip-bottom="tip 12/13"
                        :is-wrapped="true"
                        :icon="{
                        name: 'warning',
                        width: 12,
                        prepend: true
                    }"
                        title="Field with inset button"
                        tooltip="Some text"
                        hint="Hint message."
                        :is-bold="true"
                        button-title="Use average amount"
                        @button-click="textField2 = 'Ян киса'"
                    />
                </div>
            </BaseAccordion>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Layers</h3>
            <div class="space-x-5">
                <BaseButton @click="open('CreateDaoLayer')">
                    Create Dao
                </BaseButton>
                <BaseButton @click="alert({
                    title: 'All set successfully!',
                    text: 'You’ve <strong>successfully created new DAO</strong>. You can add SubDAOs, manage proposals and use Dapps on the page of your DAO any time.',
                    buttonText: 'Take me Home',
                    status: 'success'
                })">
                    Success Layer
                </BaseButton>
                <BaseButton @click="alert({
                    title: 'Warning message!',
                    text: 'The <strong>Transaction was cancelled</strong> due current mistake',
                    buttonText: 'Take me Home',
                    status: 'error'
                })">
                    Warning Layer
                </BaseButton>
                <BaseButton @click="alert({
                    title: 'Someone tripped over a wire in the metaverse',
                    text: 'An unknown error has occured please try again.',
                    buttonText: 'Take me Home',
                    status: 'unknown'
                })">
                    Unknown Layer
                </BaseButton>
            </div>
        </div>
        <div class="mb-10 pb-10 border-b border-gray-300">
            <h3 class="mb-6">Wallet Cards</h3>
            <div class="space-x-5 flex">
                <WalletNameCard
                    v-for="item in wallets"
                    :key="item.icon"
                    class="w-[200px]"
                    v-bind="item"
                />
            </div>
        </div>
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
import useLayer from '@//composables/useLayer';

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
