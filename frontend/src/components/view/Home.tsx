// react
import * as React from 'react';
import { Container } from 'react-bootstrap';

interface HomeProps { }

interface HomeState { }

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container fluid>
                <h1 className='mt-4'>Home</h1>
                <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
            </Container>
        );
    }
}
