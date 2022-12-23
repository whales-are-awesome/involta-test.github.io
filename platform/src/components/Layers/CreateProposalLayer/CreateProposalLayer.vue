<template>
    <BaseLayer
        position="right"
        :theme-settings="{
            container: [
                'p-10 w-[455px] flex flex-col create-dao-layer sm:w-full sm:px-6',
                {
                    '-preloader -preloader_cover': isSending
                }
            ]
        }"
        :id="id"
    >
        <div :class="classes.top">
            <div :class="classes.topLeft">
                <p :class="classes.title">
                    Create new Proposal
                </p>
                <p :class="classes.topText">
                    Read the doc <ActionLink href="#">”How to create a new Proposal?”</ActionLink>.
                </p>
            </div>
            <BaseCross @click="close(id)" />
        </div>
        <div :class="classes.fields">
            <TextField
                v-model="formData.name"
                title="Name of Proposal"
                placeholder="Proposal Name"
                :required="true"
                :maxlength="50"
                :tip="`${ formData.name.length }/50`"
                :error="formErrors.name"
            />
            <TextField
                v-model="formData.description"
                title="Proposal description"
                placeholder="About Proposal"
                tooltip="About SubDAO"
                :required="true"
                view="textarea"
                :maxlength="150"
                :tip="`${ formData.description.length }/150`"
                :error="formErrors.description"
            />
<!--            <SelectField-->
<!--                v-model="formData.subDaoId"-->
<!--                :options="formInfo.subDao"-->
<!--                title="Select relative SubDAO"-->
<!--                tooltip="Select relative SubDAO"-->
<!--                size="lg"-->
<!--                angle-view="secondary"-->
<!--            />-->
            <DateFieldsWrapper
                title="Choose Dates"
                tooltip="About SubDAO"
                :required="true"
            >
                <DateField
                    v-model="formData.startDate"
                    class="w-1/2"
                    title="Start date"
                />
                <DateField
                    v-model="formData.endDate"
                    class="w-1/2"
                    title="End date"
                />
            </DateFieldsWrapper>
        </div>
        <div :class="classes.advanced">
            <TextSeparator>
                Advanced Pipeline tasks
            </TextSeparator>
<!--            <BaseBlock>-->
<!--                <BlockInfo-->
<!--                    title="To add App search for it’s Name"-->
<!--                    tooltip="To add App search for it’s Name"-->
<!--                >-->
<!--                    <DropdownSearch-->
<!--                        v-model="formData.name"-->
<!--                    />-->
<!--                </BlockInfo>-->
<!--            </BaseBlock>-->
<!--            <BaseAccordion :no-chevron="true">-->
<!--                <template #top>-->
<!--                    <BaseAvatar-->
<!--                        :src="require('@/assets/images/common/placeholder.jpeg')"-->
<!--                        alt="DAO"-->
<!--                        rounded="sm"-->
<!--                        size="md"-->
<!--                    >-->
<!--                        <BlockInfo-->
<!--                            title="Add Dapp"-->
<!--                            tooltip="Add Dapp"-->
<!--                            description="Use APPs for your advanced proposal"-->
<!--                            :theme-settings="{-->
<!--                                description: '!text-gray-500'-->
<!--                            }"-->
<!--                        />-->
<!--                    </BaseAvatar>-->
<!--                    <DeleteButton-->
<!--                        theme="surface-300"-->
<!--                    />-->
<!--                </template>-->
<!--                <div class="space-y-3">-->
<!--                    <SelectField-->
<!--                        v-model="formData.name"-->
<!--                        size="xl"-->
<!--                        inner-label="Type"-->
<!--                        :options="formInfo.solidityTypes"-->
<!--                        placeholder="Text"-->
<!--                        :searchable="true"-->
<!--                        angle-view="secondary"-->
<!--                        :error="formErrors.name"-->
<!--                        value="Function to do"-->
<!--                        :required="true"-->
<!--                        tooltip="lool"-->
<!--                        :is-wrapped="true"-->
<!--                        title="Function to do"-->
<!--                        :theme-settings="{-->
<!--                            innerLabel: '!text-300'-->
<!--                        }"-->
<!--                    />-->
<!--                    <TextField-->
<!--                        v-model="formData.name"-->
<!--                        title="Name of the task"-->
<!--                        placeholder="Task Name"-->
<!--                        :maxlength="50"-->
<!--                        :tip="`${ formData.name.length }/50`"-->
<!--                        :is-wrapped="true"-->
<!--                        :error="formErrors.name"-->
<!--                    />-->
<!--                    <TextField-->
<!--                        v-model="formData.name"-->
<!--                        title="Task Description"-->
<!--                        placeholder="Task Description"-->
<!--                        :maxlength="150"-->
<!--                        :tip="`${ formData.name.length }/150`"-->
<!--                        :is-wrapped="true"-->
<!--                        view="textarea"-->
<!--                        :error="formErrors.name"-->
<!--                    />-->
<!--                </div>-->
<!--            </BaseAccordion>-->
<!--            <BaseAdd class="items-center !mb-8">-->
<!--                <BlockInfo-->
<!--                    class="ml-4"-->
<!--                    title="Add Dapp"-->
<!--                    tooltip="Add Dapp"-->
<!--                    description="Use APPs for your advanced proposal"-->
<!--                    :theme-settings="{-->
<!--                        description: '!text-gray-500'-->
<!--                    }"-->
<!--                />-->
<!--            </BaseAdd>-->
            <BaseAccordion
                v-for="transaction in formData.transactions"
                :key="transaction.id"
                title="Custom Transaction"
                description="Create custom transaction description"
                :is-visible="true"
                :no-chevron="true"
            >
                <template #top>
                    <DeleteButton
                        theme="surface-300"
                        @click="deleteTransaction(transaction.id)"
                    />
                </template>
                <div class="space-y-3">
                    <TextField
                        v-model="transaction.to"
                        title="Contract address"
                        placeholder="0x2c934...a180"
                        :required="true"
                        :is-wrapped="true"
                    />
                    <TextField
                        v-model="transaction.data"
                        title="Data"
                        placeholder="Data"
                        :required="true"
                        :maxlength="50"
                        :tip="`${ transaction.data.length }/50`"
                        :is-wrapped="true"
                    />
                    <TextField
                        v-model="transaction.value"
                        title="Value"
                        placeholder="0"
                        mask="N"
                        :required="true"
                        :is-wrapped="true"
                    />
                </div>
            </BaseAccordion>
            <BaseAdd
                class="items-center"
                @click="addTransaction"
            >
                <BlockInfo
                    class="ml-4"
                    title="Add Custom Transaction"
                    tooltip="Use Custom transaction for personal data?"
                    description="Use Custom transaction for personal data?"
                    :theme-settings="{
                        description: '!text-gray-500'
                    }"
                />
            </BaseAdd>
        </div>
        <BaseButton
            :class="classes.button"
            :size="!isMobile.sm ? 'lg' : 'md'"
            theme="primary"
            @click="createProposal"
        >
            Create Proposal
        </BaseButton>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import { omit } from 'lodash';
import { ethers } from 'ethers';
import { useRouter, useRoute } from 'vue-router';
import useLayer from '@/composables/useLayer';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import BaseAccordion from '@/components/BaseAccordion/BaseAccordion.vue';
import BlockInfo from '@/components/BlockInfo/BlockInfo.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseAdd from '@/components/BaseAdd/BaseAdd.vue';
import BaseBlock from '@/components/BaseBlock/BaseBlock.vue';
import DeleteButton from '@/components/DeleteButton/DeleteButton.vue';
import { solidityTypes } from '@/types/solidityTypes';
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch.vue';
import DateField from '@/components/Form/DateField/DateField.vue';
import DateFieldsWrapper from '@/components/Form/DateField/DateFieldsWrapper.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';
import useForm from '@/composables/useForm';
import ProposalService from '@/services/ProposalService';
import { createId } from '@/helpers/uuid';
import useIsMobile from '@/composables/useIsMobile';
import sign from '@/helpers/sign';
import { store } from '@/store';

// META

interface IProps {
    id: string
    parentDaoAddress?: string
}

const props = withDefaults(defineProps<IProps>(), {});

const router = useRouter();

const route = useRoute();

const { close, alert } = useLayer();

const isMobile = useIsMobile();


// CLASSES

const useClasses = makeClasses(() => ({
    top: () => [
        'flex items-center justify-between mb-11 sm:items-start'
    ],
    title: () => [
        'title-h5 !text-600 mb-2'
    ],
    topText: () => [
        'text-sm font-medium text-400 sm:text-xxs'
    ],
    cross: () => [
        'text-[#B6B6BE] cursor-pointer'
    ],
    fields: 'mb-11 space-y-6',
    advanced: 'pb-6 space-y-3',
    button: 'font-semibold w-full mt-auto flex-shrink-0',
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});



// CREATE PROPOSAL

const isSending = ref(false);

const formInfo = {
    subDao: [
        { id: 1, title: 'DAO 1' },
        { id: 2, title: 'DAO 2' }
    ],
    solidityTypes: solidityTypes.map(item => ({
        title: item,
        id: item
    }))
};

const [formData, formErrors, checkErrors] = useForm({
    name: {
        value: '',
        required: 'Empty field'
    },
    description: {
        value: '',
        required: 'Empty field'
    },
    startDate: {
        value: ''
    },
    endDate: {
        value: ''
    },
    subDaoId: {
        value: formInfo.subDao[0].id
    },
    typeId: {
        value: formInfo.solidityTypes[0].id
    },
    transactions: {
        value: []
    }
});

// const formResult = computed(() => {
//     return {
//         transactions: formData.value.transactions.map((item: any) => ({
//             address: item.address,
//             value: 0,
//             response: '',
//             data: `${ item.funcName }(${ item.parameters.map((param: any) => param.type.trim()).join(',') })`,
//             transType: 0
//         }))
//     }
// });

async function createProposal() {
    //if (checkErrors() || isSending.value) return;

    isSending.value = true;

    const [signInfo, err] = await sign('Do you want to follow this dao?');

    if (err) {
        return [null, err] as const;
    }


    const [response, error] = await ProposalService.createProposalOnChain({
        contractAddress: route.params.address as string,
        actions: formData.value.transactions
            .map((item: any) => ({
                ...item,
                data: ethers.utils.toUtf8Bytes(item.data),
                value: +item.value
            }))
            .map((item: any) => omit(item, ['id']))
    });

    if (response?.trx) {
        await ProposalService.createProposal(
            {
                address: route.params.address as string,
                network: route.params.network as string
            },
            {
                creationTx: response?.trx.hash,
                name: formData.value.name,
                description: formData.value.description,
            },
            {
                headers: {
                    'Auth-Hash': signInfo!.hash,
                    'Auth-Signature': signInfo!.sign,
                    'Auth-Address': store.state.wallet.address as string
                }
            });
    }


    if (response) {
        const isTake = await alert({
            title: 'All set successfully!',
            text: 'You’ve <strong>successfully created new Proposal</strong>',
            buttonText: 'Take me Home',
            status: 'success'
        });

        if (isTake) {
            router.push({ name: 'home' });
        }
    } else {
        const isTake = await alert({
            title: 'Warning message!',
            text: 'The <strong>Transaction was cancelled</strong> due current mistake',
            buttonText: 'Take me Home',
            status: 'error'
        })

        if (isTake) {
            router.push({ name: 'home' });
        }
    }


    await close(props.id);

    isSending.value = false;
}

function addTransaction() {
    formData.value.transactions.push({
        id: createId('transaction-'),
        actionType: 0,
        to: '',
        data: '',
        value: ''
    });
}

function deleteTransaction(id: string) {
    const index = formData.value.transactions.findIndex((item: any) => item.id === id);

    formData.value.transactions.splice(index, 1);
}
</script>

<style>
.fade-enter-active .create-dao-layer, .fade-leave-active .create-dao-layer {
    transition: transform .5s;
}
.fade-enter-from .create-dao-layer, .fade-leave-to .create-dao-layer  {
    transform: translateX(100%);
}
</style>
