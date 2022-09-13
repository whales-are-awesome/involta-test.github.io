<template>
    <div :class="classes.root">
        <div class="relative">
            <div
                :class="classes.image"
                :style="{ backgroundImage: `url(${ url })` }"
            >
            </div>
            <BaseIcon
                v-if="verified"
                :class="classes.verified"
                name="verified"
            />
        </div>
    </div>
</template>

<script lang="ts">
    enum Sizes {
        Sm = 'sm',
        Md = 'md',
        Lg = 'lg'
    }

    export {}
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseIcon from '@/components/BaseIcon';
import makeClasses from '@/helpers/makeClasses';

interface IProps {
    size: Sizes
    url: string
    verified: boolean
}

interface ITheme extends Pick<IProps,'size'> {}

const props = withDefaults(defineProps<IProps>(), {
    size: Sizes.Md,
    verified: false
});

const widthVariants = computed(() => {
    return {
        [Sizes.Lg]: 45,
        [Sizes.Md]: 14,
        [Sizes.Sm]: 14
    }
});

const useClasses = makeClasses<ITheme>(() => ({
    root: () => 'flex',
    image: ({ size }) => [
        'bg-cover rounded-full',
        {
            'w-[120px] h-[120px]': size === Sizes.Lg,
            'w-[100px] h-[100px]': size === Sizes.Md,
            'w-[50px] h-[50px]': size === Sizes.Sm
        }
    ],
    verified: ({ size }) => [
        'absolute',
        {
            'w-[45px] h-[45px] top-[77px] left-[79px]': size === Sizes.Lg,
            'w-[14px] h-[14px] top-[31px] right-[-3px]': [Sizes.Md, Sizes.Sm].includes(size)
        }
    ]
}));

const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        size: props.size
    });
});
</script>
