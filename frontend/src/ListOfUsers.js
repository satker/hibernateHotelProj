import React, {Component} from 'react';
import {Table} from 'reactstrap';
import ItemUser from './ItemUser';

const URL = "http://localhost:8080/admin/users";

class ListOfUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {list: null};

        this.loadList = this.loadList.bind(this);
    }

    componentDidMount() {
        this.loadList();
    }

    render() {
        if (!this.state.list) {
            return (
                <p>Loading...</p>
            );
        }

        return (
            <Table hover>
                <thead>
                <tr>
                    <th>Login</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {this.state.list.map(user =>
                    <ItemUser key={user.id} user={user}/>)}
                </tbody>
            </Table>
        );
    }

    async loadList() {
        let resp = await fetch(URL);
        let data = await resp.text();
        console.log(data);
        this.setState({list: JSON.parse(data)});
    }
}

export default ListOfUsers;
