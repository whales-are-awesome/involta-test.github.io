const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = event => {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value();
            }
        };
        window.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
        window.removeEventListener("click", el.clickOutsideEvent);
    },
};

export default clickOutside;
