import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import Card from 'component/common/Card';
import Form, { Input } from 'component/common/Form';

import FileApi from 'api/file';
import ItemApi from 'api/item';

import { isNull } from 'util/AppUtil';
import { InputType } from 'util/Enum';

export interface ImageExampleProps { }

export interface ImageExampleState {
    file: any;
}

class ImageExample extends React.Component<ImageExampleProps, ImageExampleState> {

    constructor(props: ImageExampleProps) {
        super(props);
        this.state = {
            file: null
        };
    }

    private upload = async () => {
        if (this.state.file) {
            // const response = await FileApi.upload(this.state.file);
            // console.log(response);
        }
        const response = await ItemApi.getAll();
    };

    render() {
        return (
            <div className='animated fadeIn'>
                <Row>
                    <Col xs='12' sm='12' md='12'>
                        <Card
                            title='3d Switch'
                        >
                            <Form
                                singleRow
                                inputs={[
                                    { key: 'file', title: 'File input', type: InputType.file }
                                ].map(x => {
                                    const input: Input = { ...x, value: this.state.file } as Input;
                                    if (input.type === 'checkbox' && isNull(input.value)) {
                                        input.value = {};
                                    } else if (isNull(input.value)) {
                                        input.value = '';
                                    }
                                    return input;
                                })}
                                onChange={(formState: any) => { this.setState({ file: formState.file }); }}
                            />
                            <div className='form-actions'>
                                <Button type='submit' variant='primary' onClick={this.upload}>Save changes</Button>
                                <Button variant='secondary'>Cancel</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

export default connect(mapStateToProps)(ImageExample);;
