<template>
    <div
        :class="classes.root"
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent
    >
        <input
            ref="fileRef"
            :class="classes.hidden"
            type="file"
            @change="uploadFile"
        >
        <Transition
            name="fade"
            mode="out-in"
        >
            <div v-if="!files.length">
                <BaseIcon
                    :class="classes.icon"
                    name="drag"
                    width="43"
                />
                <p :class="classes.text">
                    Drag your file here to start uploading:
                    <br>
                    jpg, png, svx 300x300px
                </p>
                <p :class="classes.max">
                    Maximum file size 5(MB)
                </p >
                <div :class="classes.delimiter"></div>
                <BaseButton
                    view="outlined"
                    theme="gray-500"
                    rounded="sm"
                    :icon="{
                        name: 'upload',
                        width: 20,
                        prepend: true
                    }"
                    @click="fileRef.click()"
                >
                    Browse File
                </BaseButton>
            </div>
            <div v-else>
                <div
                    v-for="(file, index) in files"
                    :key="index"
                    :class="classes.file"
                >
                    <div
                        :class="classes.fileCrossWrapper"
                    >
                        <BaseCross @click="removeFile(file.id)" />
                    </div>
                    <img
                        :class="classes.fileImage"
                        :src="file.image"
                        :alt="file.name"
                    >
                    <p :class="classes.fileText">
                        {{ file.name }}
                    </p>
                </div>
            </div>
        </Transition>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */

import { computed, ref } from 'vue';
import BaseCross from '@/components/BaseCross/BaseCross.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { IFile } from './types';
import makeClasses from '@/helpers/makeClasses';
import getBase64 from '@/helpers/getBase64';
import { createId } from '@/helpers/uuid';

/* INTERFACES */

interface IProps {
    modelValue: string
    themeSettings?: any
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    hasFiles: boolean
}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* VARS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, hasFiles }) => {
        return [themeSettings?.root, [
            'bg-primary-100 rounded-[10px] text-center border border-dashed border-gray-300',
            {
                'p-8': !hasFiles,
                'p-[14px]': hasFiles
            }
        ]];
    },
    icon: 'text-primary-500 mx-auto mb-4',
    delimiter: 'w-[180px] h-px bg-gray-300 mx-auto mb-5',
    text: 'text-gray-600 font-bold mb-2',
    max: 'text-gray-500 text-xs mb-5',
    file: 'w-[96px] h-[96px] relative z-1 overflow-hidden',
    fileImage: 'absolute h-full min-w-full top-0 left-1/2 -translate-x-1/2 -z-1',
    fileCrossWrapper: 'absolute right-0 top-0 bg-white cursor-pointer flex items-center justify-center',
    fileText: 'p-1 text-white bg-[rgba(36,36,36,.6)] text-xss absolute bottom-0 left-0 w-full text-left overflow-hidden overflow-ellipsis whitespace-nowrap',
    hidden: 'hidden'
}));

/* DATA */

const fileRef = ref('fileRef');
const files = ref<IFile[]>([]);

/* COMPUTED */

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: string) {
        emit('update:modelValue', value)
    }
});

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        themeSettings: props.themeSettings,
        hasFiles: !!files.value.length
    });
});

/* WATCH */
/* METHODS */

async function onDrop(event: any) {
    event.preventDefault();
    addFiles(event?.dataTransfer.files);
}

function addFiles(localFiles: File[]) {
    [].map.call(localFiles, async (file: any) => {
        const image = await getBase64(file);
        files.value.push({
            image: image[0],
            name: file.name,
            id: createId('drop-field-id')
        });
    });
}

function removeFile(id: string) {
    const fileIndex = files.value.findIndex(item => item.id === id);

    files.value.splice(fileIndex, 1);
}

function uploadFile(event: any) {
    addFiles(event.target.files);
}

</script>
