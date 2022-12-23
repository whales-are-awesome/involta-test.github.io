let scrollHandler = scrollHandlerTemplate();

const scrollAt = {
    /**
     * @example: <div v-scroll-at.bottom="loadMore"></div>
     */

    beforeMount(el: any, binding: any) {
        scrollHandler = scrollHandler.bind(null, el, binding);

        //@ts-ignore

        scrollHandler();

        //@ts-ignore
        window.addEventListener('scroll', scrollHandler)
    },
    unmounted(el: any, binding: any) {
        //@ts-ignore
        window.removeEventListener('scroll', scrollHandler)
    }
}

function scrollHandlerTemplate() {
    let loading = false
    const done = () => { loading = false }

    return function (el: any, binding: any) {
        const { modifiers } = binding;

        const triggerTop = modifiers.top || false
        const scrollY = window.scrollY;
        const elHeight = el.offsetHeight;
        const elOffsetTop = el.offsetTop;
        const trigger = triggerTop ? scrollY < 10 : window.innerHeight + scrollY > elHeight + elOffsetTop - 10;

        if (binding.value && !loading && trigger) {
            loading = true

            const result = binding.value()

            if (result === undefined) done()
            else if (result.then && result.then.call) result.then(done, done)
            else done()
        }
    }
}

export default scrollAt;
