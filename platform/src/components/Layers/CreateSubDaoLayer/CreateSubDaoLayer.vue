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
        id="CreateSubDaoLayer"
    >
        <div :class="classes.top">
            <div :class="classes.topLeft">
                <p :class="classes.title">
                    Create new SubDAO
                </p>
                <p :class="classes.topText">
                    Read the doc <ActionLink href="#">”How to create a new DAO?”</ActionLink>.
                </p>
            </div>
            <BaseCross @click="close('CreateSubDaoLayer')" />
        </div>
        <div :class="classes.fields">
            <TextField
                v-model="formData.name"
                label="Name of SubDAO"
                placeholder="SubDAO Name"
                :required="true"
                :maxlength="50"
                :tip-top="`${ formData.name.length }/50`"
                :error="formErrors.name"
            />
            <TextField
                v-model="formData.description"
                label="SubDAO description"
                placeholder="About SubDAO"
                tooltip="About SubDAO"
                :required="true"
                :textarea="true"
                :maxlength="150"
                :tip-top="`${ formData.description.length }/150`"
                :error="formErrors.description"
            />
            <BaseAccordion
                class="max-w-[400px]"
                title="Advanced DAO information"
                :is-visible="true"
            >
                <div class="space-y-2">
                    <TextField
                        v-model="formData.governanceTokens"
                        label="Amount of Governance tokens"
                        placeholder="100"
                        :is-wrapped="true"
                        tooltip="Some text"
                    />
                    <TextField
                        v-model="formData.addressReceiver"
                        label="Address of tokens receiver"
                        placeholder="0x2c934...a180"
                        :is-wrapped="true"
                        tooltip="Some text"
                    />
                    <TextField
                        v-model="formData.addressRegistry"
                        label="Address of Proposal Registry"
                        placeholder="0x2c934...a180"
                        :is-wrapped="true"
                        tooltip="Some text"
                    />
                </div>
            </BaseAccordion>
        </div>
        <BaseButton
            :class="classes.button"
            size="lg"
            theme="primary"
            @click="createSubDao"
        >
            Create SubDAO
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
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import BaseAccordion from '@/components/BaseAccordion/BaseAccordion.vue';
import DropField from '@/components/Form/DropField/DropField.vue';
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

const { close, alert, closeLast, open } = useLayer();
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
    fields: 'pb-6 space-y-6',
    button: 'font-semibold w-full mt-auto flex-shrink-0',
}));

/* DATA */

const isSending = ref(false);
const [formData, formErrors, checkErrors] = useForm({
    name: {
        value: '',
        required: 'Empty field',
        pattern: {
            text: 'Minimum 2 symbols',
            value: /[a-zA-Z]{2,}/
        }
    },
    description: {
        value: '',
        required: 'Empty field'
    },
    governanceTokens: {
        value: ''
    },
    addressReceiver: {
        value: ''
    },
    addressRegistry: {
        value: ''
    },
});

/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

/* WATCH */

/* METHODS */

async function createSubDao() {
    if (checkErrors() || isSending.value) return;

    isSending.value = true;

    const [response, error] = await DaoFactoryService.createSubDao({
        parentDaoAddress: props.parentDaoAddress
    });

    if (response) {
        const isTake = await alert({
            title: 'All set successfully!',
            text: 'You’ve <strong>successfully created new SubDAO</strong>',
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
