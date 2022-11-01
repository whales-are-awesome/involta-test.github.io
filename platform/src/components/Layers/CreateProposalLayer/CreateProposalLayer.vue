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
<!--            <BaseAccordion-->
<!--                class="max-w-[400px]"-->
<!--                title="Advanced DAO information"-->
<!--                :is-visible="true"-->
<!--            >-->
<!--            </BaseAccordion>-->
        </div>
        <div :class="classes.advanced">
            <TextSeparator>
                Advanced Pipeline tasks
            </TextSeparator>
            <BaseAccordion
                title="Dapp Name"
            >

            </BaseAccordion>
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
import TextSeparator from '@/components/TextSeparator/TextSeparator.vue';
import DateField from '@/components/Form/DateField/DateField.vue';
import DateFieldsWrapper from '@/components/Form/DateField/DateFieldsWrapper.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';
import useForm from '@/composables/useForm';
import DaoFactoryService from '@/services/DaoFactoryService';

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
    ]
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
});

/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

/* WATCH */

/* METHODS */

async function createProposal() {
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
</script>

<style>
.fade-enter-active .create-dao-layer, .fade-leave-active .create-dao-layer {
    transition: transform .5s;
}
.fade-enter-from .create-dao-layer, .fade-leave-to .create-dao-layer  {
    transform: translateX(100%);
}
</style>
