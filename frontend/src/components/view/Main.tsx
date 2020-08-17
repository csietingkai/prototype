// react
import * as React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

// components
import Sidebar from 'components/view/Sidebar';
import Header from 'components/view/Header';

// utils
import RouterConfig from 'util/RouteConfig';

interface MainProps {
    logout: () => void;
}

interface MainState {
    isSidebarShow: boolean;
}

export default class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = {
            isSidebarShow: true
        };
    }

    private toggle = () => {
        this.setState({ isSidebarShow: !this.state.isSidebarShow });
    };

    render() {
        const { logout } = this.props;
        const { isSidebarShow } = this.state;

        const sidebarSize = 3;
        const contentSize = 12 - (isSidebarShow ? sidebarSize : 0);

        const routes = RouterConfig.map((config, index) => {
            return <Route path={config.route} component={config.component} exact={index === 0} key={`route${index}`} />;
        });

        return (
            <>
                <Header isSidebarShow={isSidebarShow} toggleSidebar={this.toggle} logout={logout} />
                <Container fluid>
                    <Row>
                        <Col md={sidebarSize}>
                            <Sidebar isShow={isSidebarShow} />
                        </Col>
                        <Col md={contentSize}>
                            <Switch>
                                {routes}
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
