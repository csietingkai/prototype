import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getAuthToken } from 'reducer/Selector';

import Card from 'component/common/Card';

import { AuthToken } from 'util/Interface';

export interface CardsExampleProps {
    authToken?: AuthToken;
}

export interface CardsExampleState { }

class CardsExample extends React.Component<CardsExampleProps, CardsExampleState> {

    constructor(props: CardsExampleProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className='animated fadeIn'>
                <Row>
                    <Col xs='12' sm='6' md='4'>
                        <Card
                            title='Card title'
                        >
                            Put Content Here.
                        </Card>
                    </Col>
                    <Col xs='12' sm='6' md='4'>
                        <Card
                            title='Card with footer'
                            footer='Card Footer'
                        >
                            Put Content Here.
                        </Card>
                    </Col>

                    <Col xs='12' sm='6' md='4'>
                        <Card
                            title='Card with Text Center'
                            textCenter
                        >
                            Center Content Here.
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' sm='6' md='4'>
                        <Card
                            title='Card outline primary'
                            border='primary'
                        >
                            Primary Content Here.
                        </Card>
                    </Col>
                    <Col xs='12' sm='6' md='4'>
                        <Card
                            title='Card with secondary accent'
                            accent='secondary'
                        >
                            Secondary Content Here.
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' sm='6' md='4'>
                        <Card
                            title='Card with Danger Background'
                            background='danger'
                        >
                            Backgroud Content Here.
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12' sm='6' md='4'>
                        <Card
                            title='Card collapsable'
                            collapsable
                        >
                            Collapsable Content Here.
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        authToken: getAuthToken(state)
    };
};

export default connect(mapStateToProps)(CardsExample);;
