import React from "react";
import {Container, Table} from "reactstrap";

import ItemUser from "./ItemUser";
import LogoutButton from "./LogoutButton";

const URL = "http://localhost:8080/admin/users";

export default class MainAdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.tableContent = this.tableContent.bind(this);
        this.state = {list: null};
    }

    tableContent() {
        let list = this.state.list;
        if (!list) {
            return (
                <tr>
                    <td>Loading...</td>
                </tr>
            );
        }
        return list.map(user =>
            <ItemUser setScreen={this.props.setScreen} key={user.id} user={user}/>);
    }

    async componentDidMount() {
        let resp = await fetch(URL, {credentials: "include"});
        let text = await resp.text();
        this.setState({list: JSON.parse(text)});
    }

    render() {
        return (
            <Container>
                <b><h1>Admin page</h1></b>
                <LogoutButton setScreen={this.props.setScreen}/>
                <br/>
                <br/>
                <Table>
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Requests</th>
                        <th>Confirmed</th>
                    </tr>
                    </thead>
                    <tbody>{this.tableContent()}</tbody>
                </Table>
            </Container>
        );
    }
};