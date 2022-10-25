import { ref, computed } from 'vue';

function useTimer(endDate: Date) {
    const timeLeft = ref(Math.ceil((+endDate - +new Date()) / 1000));

    setInterval(() => {
        timeLeft.value = Math.ceil((+endDate - +new Date()) / 1000);
    }, 1000);

    return computed(() => {
        const days = Math.floor(timeLeft.value / 3600 / 24);
        const hours = Math.floor((timeLeft.value / 3600) - (days * 24));
        const minutes = (new Date(+endDate - +new Date())).getMinutes();
        const seconds = timeLeft.value % 60;

        return {
            days: days < 0 ? '00' : (days < 9 ? '0' + days : days + ''),
            hours: hours < 0 ? '00' : (hours < 9 ? '0' + hours : hours + ''),
            minutes: minutes < 0 ? '00' : (minutes < 9 ? '0' + minutes : minutes + ''),
            seconds: seconds < 0 ? '00' : (seconds < 9 ? '0' + seconds : seconds + '')
        };
    });
}

export {
    useTimer
}
