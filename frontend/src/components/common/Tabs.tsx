//react
import * as React from 'react';
import { Tabs as RbTabs, Tab as RbTab } from 'react-bootstrap';

interface TabsProps {
    name: string;
    center?: boolean;
    data: Array<{ text: string, children?: React.ReactNode; }>;
}

interface TabsState { }

export default class Tabs extends React.Component<TabsProps, TabsState> {
    constructor(props: TabsProps) {
        super(props);
    }

    render() {
        const { name, center, data } = this.props;
        const tabs = data.map((tab, index) => {
            return (
                <RbTab eventKey={tab.text} title={tab.text} tabClassName={center ? 'centered-element' : undefined} key={name + index}>
                    {tab.children}
                </RbTab>
            );
        });
        return (
            <RbTabs defaultActiveKey={data.length ? data[0].text : name} id={name} className={center ? 'centered-elements' : undefined}>
                {tabs}
            </RbTabs>
        );
    }
}
