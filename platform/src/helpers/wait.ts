export default function wait(condition: Function, time = 50) {
    return new Promise((resolve: Function) => {
        let int = setInterval((() => {
            if (!condition()) return;

            clearInterval(int);
            resolve();
        }), time);
    });
}
