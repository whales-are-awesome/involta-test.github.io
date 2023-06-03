async function getBase64(file: File) {
    const reader = new FileReader();
    let result: [string, Error|null] = ['', null];

    reader.readAsDataURL(file);
    await new Promise((resolve) => {
        reader.onload = function () {
            result = [reader.result as string, null];
            resolve(true);
        };

        reader.onerror = function (error) {
            result = ['', new Error()];
            resolve(true);
        };
    });

    return result;
}

export default getBase64;
