<template>
    <BaseLayer
        position="right"
        :theme-settings="{
            container: [
                'p-10 w-[455px] flex flex-col create-dao-layer sm:w-full',
                {
                    '-preloader': isSending
                }
            ]
        }"
        id="CreateProposalLayer"
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
            <BaseCross @click="close('CreateProposalLayer')" />
        </div>
        <div :class="classes.fields">
            <TextField
                v-model="formData.name"
                label="Name of Proposal"
                placeholder="Proposal Name"
                :required="true"
                :maxlength="50"
                :tip-top="`${ formData.name.length }/50`"
                :error="formErrors.name"
            />
            <TextField
                v-model="formData.description"
                label="Proposal description"
                placeholder="About Proposal"
                tooltip="About SubDAO"
                :required="true"
                :textarea="true"
                :maxlength="150"
                :tip-top="`${ formData.description.length }/150`"
                :error="formErrors.description"
            />
            <SelectField
                v-model="formData.subdaoId"
                :options="formInfo.subdao"
                label="Select relative SubDAO"
                tooltip="Select relative SubDAO"
                size="lg"
                angle-view="secondary"
            />
            <DateFieldsWrapper
                label="Choose Dates"
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
            <BaseBlock>
                <BaseHeading
                    class="mb-3"
                    title="To add App search for it’s Name"
                    tooltip="To add App search for it’s Name"
                />
                <DropdownSearch
                    v-model="formData.name"
                />
            </BaseBlock>
            <BaseAccordion :no-chevron="true">
                <template #top>
                    <BaseAvatar
                        :src="require('@/assets/images/common/placeholder.jpeg')"
                        alt="DAO"
                        rounded="xs"
                        size="md"
                    >
                        <BaseHeading
                            title="Add Dapp"
                            tooltip="Add Dapp"
                        >
                            Use APPs for your advanced proposal
                        </BaseHeading>
                    </BaseAvatar>
                    <DeleteButton
                        theme="surface-300"
                    />
                </template>
                <div class="space-y-3">
                    <SelectField
                        v-model="formData.name"
                        size="xl"
                        inner-label="Type"
                        :options="formInfo.solidityTypes"
                        placeholder="Text"
                        :searchable="true"
                        angle-view="secondary"
                        :error="formErrors.name"
                        value="Function to do"
                        :required="true"
                        tooltip="lool"
                        :is-wrapped="true"
                        label="Function to do"
                        :theme-settings="{
                            innerLabel: '!text-300'
                        }"
                    />
                    <TextField
                        v-model="formData.name"
                        label="Name of the task"
                        placeholder="Task Name"
                        :maxlength="50"
                        :tip-top="`${ formData.name.length }/50`"
                        :is-wrapped="true"
                        :error="formErrors.name"
                    />
                    <TextField
                        v-model="formData.name"
                        label="Task Description"
                        placeholder="Task Description"
                        :maxlength="150"
                        :tip-top="`${ formData.name.length }/150`"
                        :is-wrapped="true"
                        :textarea="true"
                        :error="formErrors.name"
                    />
                </div>
            </BaseAccordion>
            <BaseAdd class="items-center !mb-8">
                <BaseHeading
                    class="ml-4"
                    title="Add Dapp"
                    tooltip="Add Dapp"
                >
                    Use APPs for your advanced proposal
                </BaseHeading>
            </BaseAdd>
            <BaseAccordion
                v-for="transaction in formData.transactions"
                :key="transaction.id"
                :title="transaction.funcName || 'Custom Transaction'"
                :description="transaction.address || 'Create custom transaction description'"
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
                        v-model="transaction.address"
                        label="Contract address"
                        placeholder="0x2c934...a180"
                        :required="true"
                        :is-wrapped="true"
                        :error="formErrors.name"
                    />
                    <TextField
                        v-model="transaction.funcName"
                        label="Function Name"
                        placeholder="Value"
                        :required="true"
                        :maxlength="50"
                        :tip-top="`${ formData.name.length }/50`"
                        :is-wrapped="true"
                        :error="formErrors.name"
                    />
                    <TextSeparator
                        v-if="transaction.parameters.length"
                        class="!my-8"
                    >
                        Parameters
                    </TextSeparator>
                    <div
                        v-for="(parameter, index) in transaction.parameters"
                        :key="index"
                        class="bg-white rounded-[4px] py-3 px-3"
                    >
                        <div class="flex justify-between items-center mb-2">
                            <BaseHeading
                                :title="(index + 1) + '. Parameter'"
                                tooltip="Use Custom transaction for personal data?"
                            />
                            <DeleteButton
                                @click="deleteTransactionParameter(transaction.id, index)"
                            />
                        </div>
                        <div class="flex space-x-3">
                            <SelectField
                                class="w-1/2"
                                v-model="parameter.type"
                                size="xl"
                                inner-label="Type"
                                :options="formInfo.solidityTypes"
                                placeholder="Text"
                                :searchable="true"
                                angle-view="secondary"
                                :error="formErrors.name"
                            />
                            <TextField
                                class="w-1/2"
                                v-model="parameter.value"
                                inset-left-label="Value"
                                placeholder="Text"
                                size="xl"
                                :error="formErrors.name"
                            />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <BaseButton
                            size="sm"
                            theme="primary-200"
                            view="outlined"
                            :icon="{
                                name: 'plus',
                                width: 10,
                                prepend: true
                            }"
                            @click="addTransactionParameter(transaction.id)"
                        >
                            Add Parameter
                        </BaseButton>
                    </div>
                </div>
            </BaseAccordion>
            <BaseAdd
                class="items-center"
                @click="addTransaction"
            >
                <BaseHeading
                    class="ml-4"
                    title="Add Custom Transaction"
                    tooltip="Use Custom transaction for personal data?"
                >
                    Use Custom transaction for personal data?
                </BaseHeading>
            </BaseAdd>
        </div>
        <BaseButton
            :class="classes.button"
            size="lg"
            theme="primary"
            @click="createProposal"
        >
            Create Proposal
        </BaseButton>
    </BaseLayer>
</template>

<script lang="ts" setup>
/* IMPORTS */

import { computed, defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import useLayer from '@//composables/useLayer';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import SelectField from '@/components/Form/SelectField/SelectField.vue';
import BaseAccordion from '@/components/BaseAccordion/BaseAccordion.vue';
import BaseHeading from '@/components/BaseHeading/BaseHeading.vue';
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseAdd from '@/components/BaseAdd/BaseAdd.vue';
import BaseBlock from '@/components/BaseBlock/BaseBlock.vue';
import DeleteButton from '@/components/DeleteButton/DeleteButton.vue';
import { solidityTypes } from '@/models/solidityTypes';
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch.vue';
import DateField from '@/components/Form/DateField/DateField.vue';
import DateFieldsWrapper from '@/components/Form/DateField/DateFieldsWrapper.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';
import useForm from '@/composables/useForm';
import DaoFactoryService from '@/services/DaoFactoryService';
import { createId } from '@/helpers/uuid';
import API from '@/helpers/api';

/* INTERFACES */

interface IProps {
    parentDaoAddress: string
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const router = useRouter();

/* CONSTANTS AND HOOKS */

const { close, alert, closeLast } = useLayer();
const useClasses = makeClasses(() => ({
    top: () => [
        'flex items-center justify-between mb-11'
    ],
    title: () => [
        'title-h5 !text-600 mb-2'
    ],
    topText: () => [
        'text-sm font-medium text-400'
    ],
    cross: () => [
        'text-[#B6B6BE] cursor-pointer'
    ],
    fields: 'mb-11 space-y-6',
    advanced: 'pb-6 space-y-3',
    button: 'font-semibold w-full mt-auto flex-shrink-0',
}));

/* DATA */

const isSending = ref(false);
const formInfo = {
    subdao: [
        { id: 1, title: 'DAO 1' },
        { id: 2, title: 'DAO 2' }
    ],
    solidityTypes: solidityTypes.map(item => ({
        title: item,
        id: item
    }))
}
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
    subdaoId: {
        value: formInfo.subdao[0].id
    },
    typeId: {
        value: formInfo.solidityTypes[0].id
    },
    transactions: {
        value: []
    }
});


/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

const formResult = computed(() => {
    return {
        transactions: formData.value.transactions.map((item: any) => ({
            address: item.address,
            value: 0,
            response: '',
            data: `${ item.funcName }(${ item.parameters.map((param: any) => param.type.trim()).join(',') })`,
            transType: 0
        }))
    }
});


/* WATCH */

/* METHODS */

async function createProposal() {
    console.log(formResult.value.transactions);
    if (checkErrors() || isSending.value) return;

    isSending.value = true;

    const [response, error] = await DaoFactoryService.createProposal({
    });


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


    await closeLast();

    isSending.value = false;
}

function addTransaction() {
    formData.value.transactions.push({
        id: createId('transaction'),
        address: '',
        funcName: '',
        parameters: []
    });
}

function addTransactionParameter(id: string) {
    const transaction = formData.value.transactions.find((item: any) => item.id === id);

    transaction.parameters.push({
        type: '',
        value: ''
    });
}

function deleteTransaction(id: string) {
    const index = formData.value.transactions.findIndex((item: any) => item.id === id);

    formData.value.transactions.splice(index, 1);
}

function deleteTransactionParameter(id: string, index: number) {
    const transaction = formData.value.transactions.find((item: any) => item.id === id);

    transaction.parameters.splice(index, 1);
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
