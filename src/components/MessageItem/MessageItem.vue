<template>
    <div class="w-full">
        <div
            class="transition-fast max-w-[70%] inline-block p-2 rounded-xl text-white relative"
            :class="{
                'bg-primary-400': isFromUser,
                'bg-[#213040]': !isFromUser
            }"
        >
            <div
                class="flex break-words text-sm"
                :class="{
                    'justify-end': isFromUser,
                }"
            >
                <div v-html="text"></div>
                <Transition
                    name="fade-bounce"
                    mode="out-in"
                >
                    <div
                        v-if="reaction"
                        :key="reaction"
                        class="ml-2 flex-shrink-0 self-end"
                    >
                        <BaseIcon
                            class="w-[15px] h-[15px]"
                            :name="reaction"
                        />
                    </div>
                </Transition>
                <div
                    class="flex items-center justify-center rounded-full cursor-pointer w-[20px] h-[20px] bg-white bg-opacity-10 flex-shrink-0 ml-2 transition-fast hover:bg-opacity-[0.15]"
                    @click="show = !show"
                >
                    <BaseIcon
                        class="fill-white"
                        name="chevron-down"
                        width="8"
                        :class="{
                            'scale-y-[-1]': show
                        }"
                    />
                </div>
            </div>
            <BaseCollapse :show="show">
                <div class="flex items-start justify-between pt-2 mt-2 border-t border-white border-opacity-20">
                    <div
                        class="transition-fast flex flex-wrap -mx-1 -mt-2"
                    >
                        <div
                            v-for="emoji in emojiItems"
                            :key="emoji"
                            class="w-[25px] h-[25px] flex flex-shrink-0 items-center justify-center cursor-pointer mx-1 mt-2"
                            :class="{
                                'bg-white bg-opacity-10 transition-fast hover:bg-opacity-[0.15] rounded-full': emoji === reaction
                            }"
                            @click="setReaction(emoji)"
                        >
                            <BaseIcon
                                class="w-[20px] h-[20px]"
                                :name="emoji"
                            />
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center rounded-full cursor-pointer w-[25px] h-[25px] bg-white bg-opacity-10 flex-shrink-0 transition-fast ml-8 hover:bg-opacity-[0.15]"
                        @click="remove"
                    >
                        <BaseIcon
                            class="fill-white"
                            name="cross"
                            width="8"
                        />
                    </div>
                </div>
            </BaseCollapse>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import BaseCollapse from '@/components/BaseCollapse/BaseCollapse.vue';
import { INormalizedMessageAsMessenger } from '@/types/services/MessageService';

interface IProps {
    isFromUser: INormalizedMessageAsMessenger['isFromUser']
    text: INormalizedMessageAsMessenger['text']
    reaction: INormalizedMessageAsMessenger['reaction']
}

interface IEmits {
    (e: 'remove'): void
    (e: 'set-reaction', value: INormalizedMessageAsMessenger['reaction']): void
}


const emit = defineEmits<IEmits>();

const props = withDefaults(defineProps<IProps>(), {
});


const emojiItems: INormalizedMessageAsMessenger['reaction'][] = [
    'emoji-heart',
    'emoji-heart-broken',
    'emoji-thumb-up',
    'emoji-thumb-down',
    'emoji-anxious',
    'emoji-clown',
    'emoji-cry',
    'emoji-explosion',
    'emoji-tears',
];

const show = ref(false);

function remove() {
    emit('remove');
}

function setReaction(reaction: INormalizedMessageAsMessenger['reaction']) {
    show.value = false;
    emit('set-reaction', reaction);
}
</script>

<style scoped>
.fade-bounce-enter-active, .fade-bounce-leave-active {
    transition: all .3s;
}
.fade-bounce-enter-from, .fade-bounce-leave-to  {
    opacity: 0;
    transform: scale(0.7);
}
</style>
