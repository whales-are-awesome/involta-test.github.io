<template>
    <BaseLayer
        :id="id"
        position="right"
        :theme-settings="{
            container: classes.rootContainer
        }"
    >
        <div :class="classes.top">
            <div :class="classes.topLeft">
                <p :class="classes.title">
                    Create new {{ name }}
                </p>
                <p :class="classes.topText">
                    Read the doc <ActionLink href="//docs.outercircle.io/general/outercircle" target="_blank">”How to create a new {{ name }}?”</ActionLink>.
                </p>
            </div>
            <BaseCross @click="close(id)" />
        </div>
        <div :class="classes.fields">
            <TextField
                v-model="formData.name"
                :title="`Name of ${ name }`"
                :placeholder="`Name of ${ name }`"
                :required="true"
                :maxlength="50"
                :tip="`${ formData.name.length }/50`"
                :error="formErrors.name"
            />
            <TextField
                v-model="formData.description"
                :title="`${ name } description`"
                :placeholder="`${ name } description`"
                :tooltip="`${ name } description`"
                :required="true"
                view="textarea"
                :maxlength="150"
                :tip="`${ formData.description.length }/150`"
                :error="formErrors.description"
            />
            <TextField
                v-model="formData.link"
                title="External link"
                placeholder="External link"
                :required="true"
                :error="formErrors.link"
            />
            <BaseAccordion
                :class="classes.accordionItem"
                title="Governance"
                :is-visible="true"
            >
                <div :class="classes.accordionInner">
                    <TextField
                        v-model="formData.governanceTokenSupply"
                        title="Token supply"
                        placeholder="Token supply"
                        :is-wrapped="true"
                        :required="true"
                        mask="N"
                        tooltip="Some text"
                        :error="formErrors.governanceTokenSupply"
                    />
                    <TextField
                        v-model="formData.governanceTicker"
                        title="Ticker"
                        placeholder="Ticker"
                        :is-wrapped="true"
                        :required="true"
                        tooltip="Some text"
                        :error="formErrors.governanceTicker"
                    />
                </div>
            </BaseAccordion>
<!--            <DropField-->
<!--                class="max-w-[400px]"-->
<!--            />-->
            <BaseAccordion
                :class="classes.accordionItem"
                title="Advanced DAO information"
                :is-visible="true"
            >
                <div :class="classes.accordionInner">
                    <TextField
                        v-model="formData.proposalExpirationTime"
                        title="Proposal expiration time"
                        placeholder="Proposal expiration time"
                        :is-wrapped="true"
                        mask="N"
                        tooltip="Some text"
                    />
                    <TextField
                        v-model="formData.quorumRequired"
                        title="Quorum required"
                        placeholder="Quorum required"
                        :is-wrapped="true"
                        :required="true"
                        mask="N"
                        tooltip="Some text"
                        :error="formErrors.quorumRequired"
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
            Create {{ name }}
        </BaseButton>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
import API from '@/helpers/api';
import useLayer from '@/composables/useLayer';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import BaseAccordion from '@/components/BaseAccordion/BaseAccordion.vue';
import DropField from '@/components/Form/DropField/DropField.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';
import changeNetworkRequest from '@/helpers/changeNetworkRequest';
import useForm from '@/composables/useForm';
import DaoService from '@/services/DaoService';
import useWatchForCreatedDaos from '@/composables/useWatchForCreatedDaos';

import { NetworksType } from '@/types/networks';
import { store } from '@/store';


// META

export interface IProps {
    id: string
    parentAddress?: string
    network?: NetworksType
}

const props = withDefaults(defineProps<IProps>(), {

});

const router = useRouter();
const route = useRoute();

const { close, alert, closeLast, open } = useLayer();


// CREATE DAO

const watchForCreatedDaos = useWatchForCreatedDaos();

const isSending = ref(false);

const [formData, formErrors, checkErrors] = useForm({
    name: {
        value: '',
        required: 'Empty field',
        pattern: {
            text: 'Minimum 2 symbols',
            value: /[a-zA-Zа-яА-Я]{2,}/
        }
    },
    governanceTokenSupply: {
        value: '',
        required: 'Empty field'
    },
    governanceTicker: {
        value: '',
        required: 'Empty field'
    },
    description: {
        value: '',
        required: 'Empty field'
    },
    link: {
        value: '',
        required: 'Empty field'
    },
    proposalExpirationTime: {
        value: 1000
    },
    quorumRequired: {
        value: '',
        required: 'Empty field'
    },
});

watch(() => formData.value.governanceTicker, () => {
    formData.value.governanceTicker = formData.value.governanceTicker.replace(/[ ]/g, '').trim().toUpperCase();
});

watch(() => [formData.value.governanceTokenSupply, formData.value.quorumRequired], ([token, quorum]) => {
    if (+quorum > +token || !token) {
        formData.value.quorumRequired = formData.value.governanceTokenSupply;
    }
});

async function createDAO() {
    if (checkErrors() || isSending.value) return;

    isSending.value = true;

    const currentNetwork = store.state.wallet.network;

    if (props.network && currentNetwork !== props.network) {
        const isChanged = await changeNetworkRequest(props.network);

        if (!isChanged) {
            isSending.value = false;

            return;
        }
    }

    const [response, error] = await DaoService.sample.create({
        name: formData.value.name,
        governanceTokenSupply: +formData.value.governanceTokenSupply,
        governanceTicker: formData.value.governanceTicker,
        quorumRequired: formData.value.quorumRequired,
        proposalExpirationTime: formData.value.proposalExpirationTime,
        parentRegistry: props.parentAddress || '0x' + '0'.repeat(40)
    });

    if (response?.trx) {
        notify({
            text: 'Dao creation Tx is pending.'
        });

        watchForCreatedDaos.add({
            network: props.network || currentNetwork,
            hash: response.trx.hash,
            description: formData.value.description,
            name: formData.value.name,
            link:  formData.value.link
        });
        close(props.id);
    } else {
        notify({
            title: 'Error',
            text: 'The <strong>transaction was cancelled</strong>',
            data: {
                view: 'shadow',
                theme: 'alert'
            }
        });
    }


    isSending.value = false;
}


// CLASSES

const useClasses = makeClasses(() => ({
    rootContainer: ({ isSending }) => [
        'right-layer min-h-full w-[455px] p-10 flex flex-col sm:w-full',
        {
            '-preloader -preloader_cover': isSending
        }
    ],
    top: 'flex items-center justify-between mb-11',
    title: 'title-h5 text-600 mb-2',
    topText: 'text-sm font-medium text-400',
    cross: 'text-[#B6B6BE] cursor-pointer',
    fields: 'pb-6 space-y-6',
    button: 'font-semibold w-full mt-auto flex-shrink-0',
    accordionItem: 'max-w-[400px]',
    accordionInner: 'space-y-2'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        isSending: isSending.value
    });
});


// SUBDAO

const isSubDao = computed(() => !!props.parentAddress);

const name = computed(() => isSubDao.value ? 'SubDAO' : 'DAO');
</script>

<style>
.fade-enter-active .right-layer, .fade-leave-active .right-layer {
    transition: transform .5s;
}
.fade-enter-from .right-layer, .fade-leave-to .right-layer  {
    transform: translateX(100%);
}
</style>
