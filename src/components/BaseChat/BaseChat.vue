<template>
    <div>
        <div
            class="flex flex-col chat h-full w-full bg-primary-500 relative overflow-y-auto rotate-180 [&>*]:scale-y-[-1] [&>*]:scale-x-[-1]"
            ref="chat"
            id="scroller"
            v-scroll-at.top="scrolll"
        >
            <form
                class="w-full flex-shrink-0 h-[60px] flex justify-between sticky top-0 z-10 border-t border-[#1e2b3a] bg-primary-500 p-4"
                @submit.prevent="addMessage"
            >
                <input
                    v-model="text"
                    ref="input"
                    class="flex-grow bg-transparent text-white placeholder:text-[#a1b1c4]"
                    type="text"
                    placeholder="Сообщение..."
                >
                <Transition name="fade">
                    <button
                        v-if="text"
                        class="text-white"
                    >
                        <BaseIcon
                            class="fill-white hover:fill-[#2ea6ff] rotate-[30deg]"
                            name="telegram"
                            width="30"
                        />
                    </button>
                </Transition>
            </form>
            <div class="flex-grow flex flex-col justify-end p-4">
                <TransitionGroup
                    class="relative"
                    tag="div"
                    name="list"
                >
                    <MessageItem
                        v-for="item in [...value].reverse().filter(item => !item.isDeleted)"
                        :key="item.id"
                        class="mb-1"
                        :class="{
                            'flex justify-end': item.isFromUser
                        }"
                        :text="item.text"
                        :reaction="item.reaction"
                        :is-from-user="item.isFromUser"
                        @remove="removeMessage(item.id)"
                        @set-reaction="setReaction(item.id, $event)"
                    />
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick, computed } from 'vue';
import MessageItem from '@/components/MessageItem/MessageItem.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { INormalizedMessageAsMessenger } from '@/types/services/MessageService';
import { confirm } from '@/composables/useLayer';


//META

interface IProps {
    modelValue: INormalizedMessageAsMessenger[]
    onScrollTop: () => void
}

interface IEmits {
    (e: 'update:modelValue', value: INormalizedMessageAsMessenger[]): void
}

const loading = ref(false);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value: INormalizedMessageAsMessenger[]) {
        emit('update:modelValue', value)
    }
});

const input = ref(null);

const props = withDefaults(defineProps<IProps>(), {
});

const emit = defineEmits<IEmits>();


const chat = ref(null);

onMounted(() => {
    if (chat.value) {
        chat.value.scrollTop = chat.value.scrollHeight;
    }

    chat.value.addEventListener('wheel', (e) => {
        e.stopPropagation();
        e.preventDefault();

        chat.value.scrollBy(0, -e.deltaY)
    });

    window.addEventListener('keydown', (e) => {
        input.value.focus();
    });
});


async function scrolll() {
    loading.value = true;
    await props.onScrollTop();
    loading.value = false;
}


const text = ref('');

async function addMessage() {
    if (!text.value) {
        return;
    }

    value.value = [{
        id: value.value.length,
        text: text.value,
        isDeleted: false,
        isFromUser: true,
        reaction: ''
    }, ...value.value];


    text.value = '';
    await nextTick();
    chat.value.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

async function removeMessage(id: INormalizedMessageAsMessenger['id']) {
    const isDelete = await confirm({
        title: 'Удалить выбранное сообщение',
        buttonText: 'Удалить',
        cancelButtonText: 'Отмена',
    });

    if (isDelete) {
        value.value = value.value.map(item => item.id === id
            ? { ...item, isDeleted: true }
            : item
        );
    }
}

async function setReaction(id: INormalizedMessageAsMessenger['id'], reaction: INormalizedMessageAsMessenger['reaction']) {
    value.value = value.value.map(item => item.id === id
        ? { ...item, reaction }
        : item
    );
}
</script>

<style scoped>
.chat::-webkit-scrollbar{
    display: none;
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-leave-active {
    position: absolute;
}


.fade-enter-active, .fade-leave-active {
    transition: all .5s;
}
.fade-enter-from, .fade-leave-to  {
    opacity: 0;
    transform: scale(0.8);
}
</style>
