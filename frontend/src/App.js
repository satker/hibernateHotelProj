import React, {Component} from 'react';
import './App.css';

import Login from './FormLogin';
import Register from './FormRegister';
import ListOfOrders from './ListOfOrders';
import MainUserPage from './MainUserPage';
import MainAdminPage from './MainAdminPage';
import UserInfoPage from './UserInfoPage';
import CreateRequest from './CreateRequest';
import ListOfConfirmed from './ListOfConfirmed';
import EditProfile from './EditProfile';
import NavBar from './NavBar';
import AdminConfirmPage from './AdminConfirmPage';
import ListOfAvailableRooms from './ListOfAvailableRooms'

class App extends Component {
    constructor(props) {
        super(props);
        this.setScreen = this.setScreen.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getTargetUser = this.getTargetUser.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = {
            me: null,
            user: null,
            screen: "login",
            stack: [],
            forms: {
                login: <Login setScreen={this.setScreen}/>,
                register: <Register setScreen={this.setScreen}/>,
                list_of_orders: <ListOfOrders setScreen={this.setScreen} me={this.getCurrentUser}
                                              user={this.getTargetUser}/>,
                list_of_confirmed: <ListOfConfirmed me={this.getCurrentUser} user={this.getTargetUser}/>,
                user_home: <MainUserPage setScreen={this.setScreen} me={this.getCurrentUser}/>,
                admin_home: <MainAdminPage setScreen={this.setScreen} me={this.getCurrentUser}/>,
                user_info: <UserInfoPage setScreen={this.setScreen} me={this.getCurrentUser}
                                         user={this.getTargetUser} goBack={this.goBack}/>,
                create_request: <CreateRequest me={this.getCurrentUser} goBack={this.goBack}/>,
                edit_profile: <EditProfile me={this.getCurrentUser} goBack={this.goBack}/>,
                confirm: <AdminConfirmPage user={this.getTargetUser} goBack={this.goBack}/>,
                list_of_available_rooms: <ListOfAvailableRooms me={this.getCurrentUser} user={this.getTargetUser}/>
            },
        };
    }

    componentWillMount() {
        this.setScreen(this.state.screen, null, true);
    }

    setScreen(scr, opt, ignoreStack) {
        let nextState = {
            screen: scr,
            form: this.state.forms[scr],
            stack: this.state.stack,
        };
        if (opt) {
            for (let k in opt) {
                nextState[k] = opt[k];
            }
        }
        if (!ignoreStack) {
            nextState.stack.push(scr);
        }
        if (scr === "login" || scr === "register") {
            nextState.stack = [];
        }
        this.setState(nextState);
    }

    goBack() {
        let stack = this.state.stack;
        stack.pop();
        if (stack.length > 0) {
            this.setScreen(stack[stack.length - 1], null, true);
        }
        this.setState({stack: stack});
    }

    getCurrentUser() {
        return this.state.me;
    }

    getTargetUser() {
        return this.state.user;
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <h1 className="App-title">EPAM Grand Hotel</h1>
                </header>
                {this.state.stack.length > 1 && <NavBar goBack={this.goBack}/>}
                {this.state.form}
            </div>
        );
    }
}

export default App;
