const imageTobase64 = async (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        //reader.onerror = reject;
        reader.onerror = error => reject(error);
    });
    return data;
};
export default imageTobase64;