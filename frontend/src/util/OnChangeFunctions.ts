import { isNull } from 'util';

export const onTextChange = (component: React.Component, stateName: string) => (event: any) => {
    const newState: any = component.state;
    newState[stateName] = getEventValue(event, 'target', 'value');
    component.setState(newState);
};

export const onSelectChange = (component: React.Component, stateName: string) => {

};

export const onRadioButtonChange = (component: React.Component, stateName: string) => {

};

export const onFileChange = (component: React.Component, stateName: string) => {

};

export const onCheckboxChange = (component: React.Component, stateName: string) => {

};

const getEventValue = (event: any, ...eventKey: string[]): any => {
    let value: any = event;
    for (let i = 0; i < eventKey.length; i++) {
        const key = eventKey[i];
        if (!isNull(value[key])) {
            value = value[key];
        } else {
            return value;
        }
    }
    return value;
};
