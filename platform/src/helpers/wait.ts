export default function wait(condition: () => boolean, time = 50) {
    return new Promise((resolve) => {
        const int = setInterval((() => {
            if (!condition()) return;

            clearInterval(int);
            resolve(true);
        }), time);
    });
}
