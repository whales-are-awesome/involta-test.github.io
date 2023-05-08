<template>
    <div
        :class="classes.root"
        @click="goToPage"
    >
        <div :class="classes.inner">
            <div :class="classes.top">
                <div :class="classes.avatarWrapper">
                    <BaseAvatar
                        :class="classes.avatar"
                        :src="avatar"
                        :alt="name"
                        size="xl"
                        rounded="xl"
                        :theme-settings="{
                            image: 'sm:rounded-[12px]'
                        }"
                    />
                    <NetworkIcon
                        v-if="showNetwork"
                        :class="classes.networkIcon"
                        :size="20"
                        :network="network"
                    />
                </div>
            </div>
            <p :class="classes.title">
                {{ name }}
            </p>
            <div :class="classes.info">
                <div :class="classes.infoItem">
                    <div>
                        <div :class="classes.infoItemTop">
                            Followers
                        </div>
                        <div :class="classes.infoItemBottom">
                            {{ addSpacesToNumber(followersAmountLocal) }}
                        </div>
                    </div>
                </div>
                <div :class="classes.infoDelimiter"></div>
                <div :class="classes.infoItem">
                    <div>
                        <div :class="classes.infoItemTop">
                            Proposals
                        </div>
                        <div :class="classes.infoItemBottom">
                            {{ proposals }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                :class="classes.buttonWrapper"
                @click.stop
            >
                <CategoryLabel v-if="category">
                    {{ category }}
                </CategoryLabel>
                <BaseButton
                    v-else
                    :class="classes.button"
                    view="outlined"
                    size="sm"
                    rounded="lg"
                    :loading="isFollowingPending"
                    @click="follow"
                >
                    {{ isFollowedLocal ? 'Unfollow' : 'Follow' }}
                </BaseButton>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseAvatar from '@/components/BaseAvatar/BaseAvatar.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import NetworkIcon from '@/components/NetworkIcon/NetworkIcon.vue';
import CategoryLabel from '@/components/CategoryLabel/CategoryLabel.vue';
import {  } from './types';
import makeClasses from '@/helpers/makeClasses';
import addSpacesToNumber from '@/helpers/addSpacesToNumber';
import ThemeSettings from '@/types/themeSettings';
import IRouterLink from '@/types/routerLink';
import followDao from '@/helpers/followDao';
import useLayer from '@/composables/useLayer';


// META

interface IProps {
    to?: IRouterLink
    avatar: string | null
    name: string
    address?: string
    network?: string
    category?: string
    followersAmount: number
    isFollowed?: boolean
    showNetwork?: boolean
    proposals: string
    themeSettings?: ThemeSettings<'root'>
}

const props = withDefaults(defineProps<IProps>(), {});

const router = useRouter();

const { alert } = useLayer();


// CLASSES

interface IThemeProps extends Pick<IProps, 'themeSettings'>{
    isLink: boolean
}

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings, isLink }) => [themeSettings?.root,
        'flex border border-gray-100 bg-white rounded-[12px] px-8 py-6 md:py-6 md:px-5 md:px-2.5 sm:px-2',
        {
            'cursor-pointer': isLink
        }
    ],
    inner: 'w-full flex flex-col',
    top: 'flex justify-center relative mb-4',
    avatarWrapper: 'relative',
    networkIcon: 'absolute right-0 top-0',
    title: 'text-sm font-semibold text-gray-600 mb-4 text-center overflow-ellipsis overflow-hidden',
    info: 'flex justify-center mb-9 sm:mb-6',
    infoItem: 'text-center w-1/2 flex first:justify-end last:justify-start',
    infoItemTop: 'text-gray-400 text-xs whitespace-nowrap',
    infoItemBottom: 'text-center text-xxs text-gray-600 font-semibold',
    infoDelimiter: 'bg-gray-100 flex-shrink-0 w-px h-[26px] mx-7 md:mx-2',
    buttonWrapper: 'flex justify-center mt-auto',
    button: 'mx-auto w-[117px] sm:w-[64px]'
}));

const classes = computed<ReturnType<typeof useClasses>>(() => {
    return useClasses({
        themeSettings: props.themeSettings,
        isLink: !!props.to
    });
});


// LINK

function goToPage() {
    if (props.to) {
        router.push(props.to);
    }
}


// FOLLOW

const isFollowedLocal = ref<boolean>(!!props.isFollowed);
const followersAmountLocal = ref(props.followersAmount);
const isFollowingPending = ref(false);

async function follow() {
    if (!props.address || !props.network) {
        return;
    }

    isFollowingPending.value = true;

    const [_, error] = await followDao(props.name, props.address, props.network, alert, isFollowedLocal.value);

    if (!error ){
        followersAmountLocal.value = isFollowedLocal.value ? followersAmountLocal.value - 1 : followersAmountLocal.value + 1;
        isFollowedLocal.value = !isFollowedLocal.value;
    }

    isFollowingPending.value = false;
}
</script>
