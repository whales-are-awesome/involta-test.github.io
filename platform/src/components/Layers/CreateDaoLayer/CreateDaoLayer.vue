<template>
    <BaseLayer
        id="CreateDaoLayer"
        position="right"
        :theme-settings="{
            container: 'create-dao-layer w-[455px] p-10 flex flex-col'
        }"
    >
        <div :class="classes.top">
            <p :class="classes.title">
                Create new DAO
            </p>
            <BaseCross @click="close('CreateDaoLayer')" />
        </div>
        <div :class="classes.fields">
            <TextField
                v-model="formData.name"
                label="Name of DAO"
                placeholder="Name of DAO"
                :required="true"
                :maxlength="50"
                :tip-top="`${ formData.name.length }/50`"
                :error="formErrors.name"
            />
            <TextField
                v-model="formData.description"
                label="DAO description"
                placeholder="DAO description"
                tooltip="DAO description"
                :required="true"
                :textarea="true"
                :maxlength="150"
                :tip-top="`${ formData.description.length }/150`"
                :error="formErrors.description"
            />
            <TextField
                v-model="formData.externalLink"
                label="External link"
                placeholder="External link"
                :required="true"
            />
            <DropField
                class="max-w-[400px]"
            />
            <BaseAccordion
                class="max-w-[400px]"
                title="Advanced DAO information"
            >
                <div class="space-y-2">
                    <TextField
                        v-model="formData.governanceTokens"
                        label="Amount of Governance tokens"
                        placeholder="Amount of Governance tokens"
                        :is-wrapped="true"
                        tooltip="Some text"
                    />
                    <TextField
                        v-model="formData.addressReceiver"
                        label="Address of tokens receiver"
                        placeholder="Address of tokens’ receiver"
                        :is-wrapped="true"
                        tooltip="Some text"
                    />
                    <TextField
                        v-model="formData.addressRegistry"
                        label="Address of Proposal Registry"
                        placeholder="Address of Proposal Registry"
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
            @click="createDAO"
        >
            Create DAO
        </BaseButton>
    </BaseLayer>
</template>

<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import useLayer from '@//composables/useLayer';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import BaseAccordion from '@/components/BaseAccordion/BaseAccordion.vue';
import DropField from '@/components/Form/DropField/DropField.vue';
import BaseLayer from '../BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';
import useForm from '@/composables/useForm';
import DaoFactoryService from '@/services/DaoFactoryService';

/* META */

/* CONSTANTS AND HOOKS */

const { close } = useLayer();
const useClasses = makeClasses(() => ({
    top: () => [
        'flex items-center justify-between mb-11'
    ],
    title: () => [
        'title-h5 !text-600'
    ],
    cross: () => [
        'text-[#B6B6BE] cursor-pointer'
    ],
    fields: 'pb-6 space-y-6',
    button: 'font-semibold w-full mt-auto flex-shrink-0',
}));

/* DATA */
const [formData, formErrors, checkErrors] = useForm({
    name: {
        value: '',
        required: {
            text: 'Введите значение',
            value: true
        }
    },
    description: {
        value: '',
        required: {
            text: 'Введите значение',
            value: true
        },
    },
    externalLink: {
        value: '',
        required: {
            text: 'Введите значение',
            value: true
        }
    },
    governanceTokens: {
        value: '',
        required: {
            text: 'Введите значение',
            value: true
        }
    },
    addressReceiver: {
        value: '',
        required: {
            text: 'Введите значение',
            value: true
        }
    },
    addressRegistry: {
        value: '',
        required: {
            text: 'Введите значение',
            value: true
        }
    },
});

/* COMPUTED */

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
    });
});

/* WATCH */

/* METHODS */

function createDAO() {
    console.log(checkErrors());
    // DaoFactoryService.createDao({
    //
    // });
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
