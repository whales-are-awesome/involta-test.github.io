const scrollAt = {
    /**
     * @example: <div v-scroll-at.bottom="loadMore"></div>
     */

    beforeMount(el: any, binding: any) {
        binding.dir.scrollHandler = scrollHandler;

        let loading = false
        const done = () => { loading = false }

        function scrollHandler() {
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


        //@ts-ignore

        binding.dir.scrollHandler();

        //@ts-ignore
        window.addEventListener('scroll', binding.dir.scrollHandler)
    },
    unmounted(el: any, binding: any) {
        //@ts-ignore
        window.removeEventListener('scroll', binding.dir.scrollHandler)
    }
}
export default scrollAt;
