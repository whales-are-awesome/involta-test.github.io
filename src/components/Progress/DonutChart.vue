<template>
    <div :class="classes.root">
        <div :class="classes.inner">
            <VueApexCharts
                :class="classes.chart"
                :width="chartSizes[props.size]"
                :height="chartSizes[props.size]"
                type="donut"
                :options="options"
                :series="series"
            />
            <div :class="classes.round">
                <div :class="classes.roundInner"></div>
            </div>
            <BaseAvatar
                :class="classes.avatar"
                :url="avatar"
                :verified="verified"
                size="md"
            />
        </div>
    </div>
</template>

<script lang="ts">
    enum Sizes {
        Sm = 'sm',
        Md = 'md'
    }
    export {}
</script>

<script setup lang="ts">
import {computed} from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import makeClasses from '@/helpers/makeClasses';
import BaseAvatar from '@/components/BaseAvatar';
import tailwind from '../../../tailwind.config.js'


interface IProps {
    size: Sizes
    avatar: string
    verified: boolean
}

interface ThemeProps extends Pick<IProps, 'size'> {}

const props = withDefaults(defineProps<IProps>(), {
    size: Sizes.Sm,
    verified: false
});
const chartSizes = {
    [Sizes.Sm]: 150,
    [Sizes.Md]: 280
}

const colors = tailwind.theme.colors({});

const options = {
    labels: ['14% Team Allocation', '', 'Team finder'],
    fill: {
        colors: [colors.primary[400], 'transparent', colors.primary[500]]
    },
    plotOptions: {
        pie: {
            donut: {
                size: '50%',
                background: '#fff',
                labels: {
                    show: true,
                    name: {
                        show: false
                    },
                    value: {
                        show: true,
                        fontSize: '1rem',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 700,
                        color: 'black',
                        offsetY: 4
                    },
                    total: {
                        show: false,
                        showAlways: false,
                        offsetY: 30,
                        label: 'LEFT'
                    }
                }
            }
        },
    },
    legend: false,
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: 0
    }
};
const series = [12, 34, 50];
const useClasses = makeClasses<ThemeProps>(() => ({
    root: ({ size }) => [
        'rounded-full shadow-[0px_8px_32px_#DDE0E7] inline-block relative after:bg-[#f7f7f7] after:absolute after:inset-0 after:-z-10 after:rounded-full',
        {
            'p-5': size === Sizes.Sm,
            'p-[40px]': size === Sizes.Md,
        }
    ],
    inner: 'relative',
    chart: 'chart',
    avatar: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',

    round: 'pointer-events-none w-[70%] bg-secondary-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full z-m2',
    roundInner: 'pb-[100%]',
}));
const classes = computed((): ReturnType<typeof useClasses> => {
    return useClasses({
        size: props.size
    });
});
</script>

<style scoped>
    .chart :deep(path[fill="transparent"]) {
        @apply pointer-events-none;
    }
    .chart :deep(.apexcharts-series path) {
        @apply cursor-pointer;
    }
    .chart :deep(.apexcharts-tooltip) {
        @apply bg-transparent rounded-none;
    }
    .chart :deep(.apexcharts-tooltip-series-group) {
        @apply text-text-400 px-3 py-1.5 rounded-bl-none rounded-lg text-xs border border-info-300;
        background-color: theme('colors.info.100') !important;
    }

    .chart :deep(.apexcharts-tooltip-y-group) {
        @apply p-0;
        background-color: theme('colors.info.100') !important;
    }
    .chart :deep(.apexcharts-tooltip-text-y-value) {
        @apply hidden;
    }
</style>
