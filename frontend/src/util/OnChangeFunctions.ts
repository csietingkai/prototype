import { getValueByKeys } from './AppUtil';

export const onTextChange = (component: React.Component, stateName: string) => (event: any) => {
    const newState: any = component.state;
    newState[stateName] = getValueByKeys(event, 'target', 'value');
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
