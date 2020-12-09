import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, RouteChildrenProps } from 'react-router-dom';

import { LoginDispatcher, LogoutDispatcher } from 'reducer/PropsMapper';
import { getAuthToken } from 'reducer/Selector';
import { removeAuthToken } from 'reducer/StateHolder';

import Form from 'component/common/Form';
import Modal from 'component/common/Modal';
import Breadcrumb from 'component/layout/Breadcrumb';
import Footer from 'component/layout/Footer';
import Header from 'component/layout/Header';
import Sidebar from 'component/layout/Sidebar';
import DashBoard from 'view/DashBoard';
import CardsExample from 'view/CardsExample';
import FormExample from 'view/FormExample';

import AuthApi from 'api/auth';

import { AuthResponse, AuthToken } from 'util/Interface';
import Notify from 'util/Notify';
import { InputType } from 'util/Enum';

export interface AppProps extends RouteChildrenProps<any> {
    authToken?: AuthToken;
    login: (authToken: AuthToken) => void;
    logout: () => void;
}

export interface AppState {
    loginModalOpen: boolean;
    username: string;
    password: string;
}

class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            loginModalOpen: false,
            username: '',
            password: ''
        };
    }

    private togglLoginModal = () => {
        this.setState({ loginModalOpen: !this.state.loginModalOpen });
    };

    private onLoginClick = async () => {
        const { username, password } = this.state;
        const response: AuthResponse = await AuthApi.login(username, password);
        const { success, data, message } = response;
        if (success) {
            this.props.login(data);
            Notify.success(message);
            this.setState({ username: '', password: '' }, this.togglLoginModal);
        } else {
            removeAuthToken();
            Notify.error(message);
        }
    };

    private onLogoutClick = () => {
        this.props.logout();
    };

    render() {
        const { loginModalOpen, username, password } = this.state;

        const loginModal = (
            <Modal
                headerText='Login'
                isShow={loginModalOpen}
                okBtnText='Submit'
                onOkClick={this.onLoginClick}
                onCancelClick={this.togglLoginModal}
                verticalCentered={true}
            >
                <Form
                    singleRow
                    inputs={[
                        { key: 'username', title: 'Username', value: username },
                        { key: 'password', title: 'Password', type: InputType.password, value: password }
                    ]}
                    onChange={(formState: any) => { this.setState({ ...formState }); }}
                />
            </Modal>
        );

        const app = (
            <div className='app'>
                <Header {...this.props} authToken={this.props.authToken} onLogoutClick={this.onLogoutClick} toggleLoginModal={this.togglLoginModal} />
                <div className='app-body'>
                    <Sidebar {...this.props} />
                    <main className='main'>
                        <Breadcrumb {...this.props} />
                        <Container fluid>
                            <Switch>
                                <Route path='/dashboard' name='Dashboard' component={DashBoard} />
                                {/* <Route path='/theme/colors' name='Colors' component={Colors} /> */}
                                {/* <Route path='/theme/typography' name='Typography' component={Typography} /> */}
                                <Route path='/base/cards' name='Cards' component={CardsExample} />
                                <Route path='/base/forms' name='Forms' component={FormExample} />
                                {/* <Route path='/base/switches' name='Swithces' component={Switches} /> */}
                                {/* <Route path='/base/tables' name='Tables' component={Tables} /> */}
                                {/* <Route path='/base/tabs' name='Tabs' component={Tabs} /> */}
                                {/* <Route path='/base/breadcrumbs' name='Breadcrumbs' component={Breadcrumbs} /> */}
                                {/* <Route path='/base/carousels' name='Carousels' component={Carousels} /> */}
                                {/* <Route path='/base/collapses' name='Collapses' component={Collapses} /> */}
                                {/* <Route path='/base/dropdowns' name='Dropdowns' component={Dropdowns} /> */}
                                {/* <Route path='/base/jumbotrons' name='Jumbotrons' component={Jumbotrons} /> */}
                                {/* <Route path='/base/list-groups' name='ListGroups' component={ListGroups} /> */}
                                {/* <Route path='/base/navbars' name='Navbars' component={Navbars} /> */}
                                {/* <Route path='/base/navs' name='Navs' component={Navs} /> */}
                                {/* <Route path='/base/paginations' name='Paginations' component={Paginations} /> */}
                                {/* <Route path='/base/popovers' name='Popovers' component={Popovers} /> */}
                                {/* <Route path='/base/progress-bar' name='Progress Bar' component={ProgressBar} /> */}
                                {/* <Route path='/base/tooltips' name='Tooltips' component={Tooltips} /> */}
                                {/* <Route path='/buttons/buttons' name='Buttons' component={Buttons} /> */}
                                {/* <Route path='/buttons/button-dropdowns' name='ButtonDropdowns' component={ButtonDropdowns} /> */}
                                {/* <Route path='/buttons/button-groups' name='ButtonGroups' component={ButtonGroups} /> */}
                                {/* <Route path='/buttons/social-buttons' name='Social Buttons' component={SocialButtons} /> */}
                                {/* <Route path='/icons/flags' name='Flags' component={Flags} /> */}
                                {/* <Route path='/icons/font-awesome' name='Font Awesome' component={FontAwesome} /> */}
                                {/* <Route path='/icons/simple-line-icons' name='Simple Line Icons' component={SimpleLineIcons} /> */}
                                {/* <Route path='/notifications/alerts' name='Alerts' component={Alerts} /> */}
                                {/* <Route path='/notifications/badges' name='Badges' component={Badges} /> */}
                                {/* <Route path='/notifications/modals' name='Modals' component={Modals} /> */}
                                {/* <Route path='/widgets' name='Widgets' component={Widgets} /> */}
                                {/* <Route path='/charts' name='Charts' component={Charts} /> */}
                                <Redirect from='/' to='/dashboard' />
                            </Switch>
                        </Container>
                    </main>
                </div>
                <Footer {...this.props} />
            </div>
        );
        return (
            <>
                {app}
                {loginModal}
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        authToken: getAuthToken(state)
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: LoginDispatcher(dispatch),
        logout: LogoutDispatcher(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
