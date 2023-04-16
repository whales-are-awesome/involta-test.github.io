<template>
    <BaseLayer
        :id="id"
        position="right"
        :theme-settings="{
            container: [
                'create-dao-layer w-[455px] p-10 flex flex-col sm:w-full',
                {
                    '-preloader -preloader_cover': isSending || page.pending
                }
            ]
        }"
    >
        <div :class="classes.top">
            <div :class="classes.topLeft">
                <p :class="classes.title">
                    Edit
                </p>
            </div>
            <BaseCross @click="close(id)" />
        </div>
        <div :class="classes.fields">
            <TextField
                v-model="formData.name"
                title="Name of DAO"
                placeholder="Name of DAO"
                :required="true"
                :maxlength="50"
                :tip="`${ formData.name.length }/50`"
                :error="formErrors.name"
            />
            <TextField
                v-model="formData.description"
                title="DAO description"
                placeholder="DAO description"
                tooltip="DAO description"
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
            <!--            <DropField-->
            <!--                class="max-w-[400px]"-->
            <!--            />-->
        </div>
        <BaseButton
            :class="classes.button"
            size="lg"
            theme="primary"
            @click="editDao"
        >
            Edit
        </BaseButton>
    </BaseLayer>
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from 'vue';
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
import useForm from '@/composables/useForm';
import DaoService from '@/services/DaoService';
import useWatchForCreatedDaos from '@/composables/useWatchForCreatedDaos';
import sign from '@/helpers/sign';
import { store } from '@/store';
import { uuidv4 } from '@/helpers/uuid';
import useDao from '@/composables/fetch/useDao';
import useError from '@/composables/useError';
import { useTitle } from '@vueuse/core';
import emitter from '@/plugins/mitt';


// META

export interface IProps {
    id: string
    address: string
    network: string
}

const props = withDefaults(defineProps<IProps>(), {

});

const router = useRouter();
const route = useRoute();

const { close, alert, open } = useLayer();


// CLASSES

const useClasses = makeClasses(() => ({
    top: 'flex items-center justify-between mb-11',
    title: 'title-h5 text-600 mb-2',
    topText: 'text-sm font-medium text-400',
    cross: 'text-[#B6B6BE] cursor-pointer',
    fields: 'pb-6 space-y-6',
    button: 'font-semibold w-full mt-auto flex-shrink-0',
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
    });
});


// DAO

const [ page, fetchDao ] = useDao({
    address: route.params.address as string
});

watchEffect(() => {
    if (page.value.data) {
        formData.value = {
            name: page.value.data.name,
            description: page.value.data.description,
            link: page.value.data.link
        };
    }
});


// EDIT DAO


const isSending = ref(false);

const [formData, formErrors, checkErrors] = useForm({
    name: {
        value: '',
        required: 'Empty field',
    },
    description: {
        value: '',
        required: 'Empty field'
    },
    link: {
        value: '',
        required: 'Empty field'
    },
});

async function editDao() {
    if (checkErrors() || isSending.value) return;

    isSending.value = true;

    const text = [
        'By signing this message you will edit DAO metadata to:\n',
        'Name: ' + formData.value.name,
        'Description: ' + formData.value.description,
        'Link: ' + formData.value.link + '\n',
        'This request will not trigger a blockchain transaction or cost any gas fees.\n',
        'Wallet address: ' + store.state.wallet.address,
        'Nonce: ' + uuidv4()
    ].join('\n');

    const [signInfo, err] = await sign(text);

    if (err) {
        isSending.value = false;

        return;
    }

    const [response, error] = await DaoService.changeDao(
        {
            address: props.address,
            network: props.network
        },
        {
            name: formData.value.name,
            description: formData.value.description,
            link: formData.value.link,
        },
        {
            headers: {
                'X-Auth-Hash': signInfo!.hash,
                'X-Auth-Signature': signInfo!.sign
            }
        }
    );

    if (!error) {
        notify({
            title: 'Success',
            text: 'You\'ve successfully edit dao metadata',
            data: {
                view: 'shadow',
                theme: 'success'
            }
        });

        close(props.id);
        emitter.emit('daoEdited');
    } else {
        notify({
            title: 'Error',
            text: 'Something went wrong</strong>',
            data: {
                view: 'shadow',
                theme: 'alert'
            }
        });
    }


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
