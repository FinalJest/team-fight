import { ReduxState } from '../modules';

const download = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(text)}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

export const saveAsJson = (state: ReduxState) => {
    download('data.json', JSON.stringify(state));
};

export const loadJson = (data: string | ArrayBuffer): ReduxState => {
    const stringData = data instanceof ArrayBuffer ? Buffer.from(data).toString() : data;
    return JSON.parse(stringData) as ReduxState;
};
