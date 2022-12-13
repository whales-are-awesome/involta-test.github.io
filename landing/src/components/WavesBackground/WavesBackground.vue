<template>
    <div
        ref="root"
        :class="classes.root"
    >
        <canvas :class="classes.canvas" ref="canvas"></canvas>
    </div>
</template>


<script lang="ts" setup>
/* IMPORTS */
import { computed, onMounted, ref } from 'vue';
import SineWaves from '@/plugins/sine-waves';

import {  } from './types';
import makeClasses, { makeThemeSettings } from '@/helpers/makeClasses';

/* INTERFACES */

interface IProps {
    modelValue: string
    themeSettings?: any
}

interface IEmits {
    (e: 'update:modelValue', value: IProps['modelValue']): void
}

interface IThemeProps extends Pick<IProps, 'themeSettings'>{

}

/* META */

const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits<IEmits>();

/* CONSTANTS AND CUSTOM HOOKS */

const useClasses = makeClasses<IThemeProps>(() => ({
    root: ({ themeSettings }) => {
        return makeThemeSettings(themeSettings?.root, [
            'overflow-hidden',
            `after:absolute after:inset-0 after:z-2 after:shadow-[inset_0_0_150px_200px_rgba(0,0,0,1)] after:invert`
        ]);
    },
    canvas: ({ themeSettings }) => {
        return makeThemeSettings(themeSettings?.root, ['absolute w-full h-full scale-x-[-1]']);
    },
}));

/* DATA */

const root = ref(null);
const canvas = ref(null);

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
        themeSettings: props.themeSettings
    });
});

/* WATCH */


/* LIFECYCLE */

onMounted(() => {
    /* eslint-disable */
    var waves = new SineWaves({
        el: canvas.value,
        speed: 0.4,
        rotate: 30,
        width: function() {
            return root.value.offsetWidth;
        },
        height: function() {
            return root.value.offsetHeight;
        },
        wavesWidth: '100%',
        ease: 'SineInOut',

        waves: [
            {
                timeModifier: 2,
                lineWidth: 1,
                amplitude: -50,
                wavelength: 200,
                segmentLength: 10,
                type: 'Sine',
                fillStyle: function(el, bound) {
                    // #B565FE #ccfff6 #3BD7F5 #6577F5
                    var gradient = this.ctx.createLinearGradient(bound.x0, bound.y0, bound.x1, bound.y1);
                    gradient.addColorStop(0, 'rgba(181, 101, 254, 0.2)');
                    gradient.addColorStop(0.5, 'rgba(204, 255, 246, 0.2)');
                    gradient.addColorStop(1, '#fff');
                    return gradient;
                },
                strokeStyle: '',
                yAxis: function() {
                    return this.height * 0.5;
                }
            },
            {
                timeModifier: 2,
                lineWidth: 1,
                amplitude: -50,
                wavelength: 200,
                segmentLength: 10,
                type: 'Sine',
                fillStyle: function(el, bound) {
                    // #B565FE #ccfff6 #3BD7F5 #6577F5
                    var gradient = this.ctx.createLinearGradient(bound.x0, bound.y0, bound.x1, bound.y1);
                    gradient.addColorStop(0, 'rgba(196, 236, 246, 0.5)');
                    gradient.addColorStop(0.5, 'rgba(181, 101, 254, 0.2)');
                    gradient.addColorStop(1, '#fff');
                    return gradient;
                },
                strokeStyle: '',
                yAxis: function() {
                    return this.height * 0.63;
                }
            },
            {
                timeModifier: 2,
                lineWidth: 1,
                amplitude: -50,
                wavelength: 200,
                segmentLength: 10,
                type: 'Sine',
                fillStyle: function(el, bound) {
                    // #B565FE #ccfff6 #3BD7F5 #6577F5
                    var gradient = this.ctx.createLinearGradient(bound.x0, bound.y0, bound.x1, bound.y1);
                    gradient.addColorStop(0, 'rgba(238, 225, 223, 0.5)');
                    gradient.addColorStop(0.5, 'rgba(181, 101, 254, 0.2)');
                    gradient.addColorStop(1, '#fff');
                    return gradient;
                },
                strokeStyle: '',
                yAxis: function() {
                    return this.height * 0.8;
                }
            },
        ],
        initialize: function() {},
        resizeEvent: function() {}
    });

});

/* METHODS */

</script>
