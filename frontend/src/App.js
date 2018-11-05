import React, {Component} from 'react';
import './App.css';

import Login from './FormLogin';
import Register from './FormRegister';
import ListOfOrders from './ListOfOrders';
import ChoosedHotelItem from './ChoosedHotelItem';
import MainAdminPage from './MainAdminPage';
import UserInfoPage from './UserInfoPage';
import PersonalArea from './PersonalArea';
import EditProfile from './EditProfile';
import NavBar from './NavBar';
import AdminConfirmPage from './AdminConfirmPage';
import CreateOrder from './CreateOrder'
import ListOfHotels from './ListOfHotels'

class App extends Component {
    constructor(props) {
        super(props);
        this.setScreen = this.setScreen.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getTargetUser = this.getTargetUser.bind(this);
        this.getCurrentHotel = this.getCurrentHotel.bind(this);
        this.setTitleScreen = this.setTitleScreen.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = {
            me: null,
            user: null,
            hotel: null,
            screen: "login",
            titleName: 'Main page',
            stack: [],
            forms: {
                login: <Login setTitleScreen={this.setTitleScreen} setScreen={this.setScreen}/>,
                register: <Register setTitleScreen={this.setTitleScreen} setScreen={this.setScreen}/>,
                list_of_orders: <ListOfOrders me={this.getCurrentUser}
                                              user={this.getTargetUser}
                                              goBack={this.goBack}/>,
                personal_area: <PersonalArea me={this.getCurrentUser} user={this.getTargetUser} goBack={this.goBack}/>,
                list_of_hotels: <ListOfHotels setTitleScreen={this.setTitleScreen} titleName={this.getTitleName}
                                              setScreen={this.setScreen} user={this.getTargetUser}
                                              me={this.getCurrentUser}/>,
                choose_hotel_item: <ChoosedHotelItem setTitleScreen={this.setTitleScreen} hotel={this.getCurrentHotel}
                                                     setScreen={this.setScreen}
                                                     me={this.getCurrentUser}/>,
                admin_home: <MainAdminPage setScreen={this.setScreen} me={this.getCurrentUser}/>,
                user_info: <UserInfoPage setScreen={this.setScreen} me={this.getCurrentUser}
                                         user={this.getTargetUser} goBack={this.goBack}/>,
                edit_profile: <EditProfile me={this.getCurrentUser} goBack={this.goBack}/>,
                confirm: <AdminConfirmPage user={this.getTargetUser} goBack={this.goBack}/>,
                create_order: <CreateOrder me={this.getCurrentUser} hotel={this.getCurrentHotel} goBack={this.goBack}/>
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

    setTitleScreen(opt) {
        let nextState = {
            stack: this.state.stack,
        };
        if (opt) {
            for (let k in opt) {
                nextState[k] = opt[k];
            }
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

    getCurrentHotel() {
        return this.state.hotel;
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
                    <h1 className="App-title">{this.state.titleName}</h1>
                </header>
                {this.state.stack.length > 1 && <NavBar goBack={this.goBack}/>}
                {this.state.form}
            </div>
        );
    }
}

export default App;
