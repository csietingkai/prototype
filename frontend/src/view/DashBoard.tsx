import * as React from 'react';
import { connect } from 'react-redux';

import { getAuthToken } from 'reducer/Selector';
import { AuthToken } from 'util/Interface';

export interface DashBoardProps {
    authToken?: AuthToken;
}

export interface DashBoardState { }

class DashBoard extends React.Component<DashBoardProps, DashBoardState> {

    constructor(props: DashBoardProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { authToken } = this.props;
        let name = 'World';
        if (authToken) {
            name = authToken.name;
        }
        return <h1>Hello {name}</h1>;
    }
}

const mapStateToProps = (state: any) => {
    return {
        authToken: getAuthToken(state)
    };
};

export default connect(mapStateToProps)(DashBoard);;
