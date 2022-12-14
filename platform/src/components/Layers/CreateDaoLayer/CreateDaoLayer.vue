<template>
    <BaseLayer
        :id="id"
        position="right"
        :theme-settings="{
            container: [
                'create-dao-layer w-[455px] p-10 flex flex-col sm:w-full',
                {
                    '-preloader -preloader_cover': isSending
                }
            ]
        }"
    >
        <div :class="classes.top">
            <div :class="classes.topLeft">
                <p :class="classes.title">
                    Create new {{ name }}
                </p>
                <p :class="classes.topText">
                    Read the doc <ActionLink href="#">”How to create a new {{ name }}?”</ActionLink>.
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
            <DropField
                class="max-w-[400px]"
            />
            <BaseAccordion
                class="max-w-[400px]"
                title="Advanced DAO information"
            >
                <div class="space-y-2">
                    <TextField
                        v-model="formData.proposalExpirationTime"
                        title="Proposal expiration time"
                        placeholder="Proposal expiration time"
                        :is-wrapped="true"
                        tooltip="Some text"
                    />
                    <TextField
                        v-model="formData.quorumRequired"
                        title="Quorum required"
                        placeholder="Quorum required"
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
            Create {{ name }}
        </BaseButton>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useLayer from '@/composables/useLayer';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TextField from '@/components/Form/TextField/TextField.vue';
import BaseAccordion from '@/components/BaseAccordion/BaseAccordion.vue';
import DropField from '@/components/Form/DropField/DropField.vue';
import ActionLink from '@/components/ActionLink/ActionLink.vue';
import BaseLayer from '@/components/Layers/BaseLayer/BaseLayer.vue';
import makeClasses from '@/helpers/makeClasses';
import useForm from '@/composables/useForm';
import DaoFactoryService from '@/services/DaoFactoryService';
import useWatchForCreatedDaos from '@/composables/useWatchForCreatedDaos';


// META

export interface IProps {
    id: string
    parentAddress?: string
}

const props =withDefaults(defineProps<IProps>(), {

});

const router = useRouter();
const route = useRoute();

const { close, alert, closeLast, open } = useLayer();


// CLASSES

const useClasses = makeClasses(() => ({
    top: 'flex items-center justify-between mb-11',
    title: 'title-h5 !text-600 mb-2',
    topText: 'text-sm font-medium text-400',
    cross: 'text-[#B6B6BE] cursor-pointer',
    fields: 'pb-6 space-y-6',
    button: 'font-semibold w-full mt-auto flex-shrink-0',
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});


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
        value: 1000
    },
});

async function createDAO() {
    if (checkErrors() || isSending.value) return;

    isSending.value = true;

    const [trx, error] = await DaoFactoryService.createDao({
        quorumRequired: formData.value.quorumRequired,
        proposalExpirationTime: +new Date(formData.value.proposalExpirationTime),
        parentRegistry: props.parentAddress || '0x' + '0'.repeat(40)
    });

    if (trx) {
        await alert({
            title: 'Transaction is being processed!',
            text: 'We will show you a message when transaction will be done.',
            buttonText: 'OK',
            status: 'success'
        });

        watchForCreatedDaos.add({
            hash: trx.hash,
            description: formData.value.description,
            name: formData.value.name,
            link:  formData.value.link
        });
    } else {
        const isTake = await alert({
            title: 'Warning message!',
            text: 'The <strong>Transaction was cancelled</strong> due current mistake',
            buttonText: 'Take me Home',
            status: 'error'
        });

        if (isTake) {
            router.push({ name: 'home' });
        }
    }


    await closeLast();

    isSending.value = false;
}


// IS SUBDAO
const isSubDao = computed(() => !!props.parentAddress);

const name = computed(() => isSubDao.value ? 'SubDAO' : 'DAO');
</script>

<style>
.fade-enter-active .create-dao-layer, .fade-leave-active .create-dao-layer {
    transition: transform .5s;
}
.fade-enter-from .create-dao-layer, .fade-leave-to .create-dao-layer  {
    transform: translateX(100%);
}
</style>
