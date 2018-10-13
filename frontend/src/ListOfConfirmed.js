import React from "react";
import {Container, Table} from "reactstrap";

import ItemConfirmed from "./ItemConfirmed";

const URL = "http://localhost:8080/user/_id_/confirms";

export default class ListOfConfirmed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: null};
    }

    componentDidMount() {
        this.load();
    }

    async load() {
        let resp = await fetch(URL.replace("_id_", this.props.user().id), {credentials: "include"});
        let text = await resp.text();
        console.log(text);
        this.setState({list: JSON.parse(text)});
    }

    tableContent() {
        if (!this.state.list) {
            return <tr>
                <td>Loading...</td>
            </tr>
        }
        return this.state.list.map(conf => <ItemConfirmed refresh={()=>this.load()} me={this.props.me()} user={this.props.user()} order={conf}/>)
    }

    render() {
        return (
            <Container>
                <h1>Confirmed requests</h1>
                <Table>
                    <thead>
                    <tr>
                        <th>Arrival date</th>
                        <th>Departure date</th>
                        <th>Room type</th>
                        <th>Room number</th>
                        <th>Place number</th>
                        <th>Night cost</th>
                    </tr>
                    </thead>
                    <tbody>{this.tableContent()}</tbody>
                </Table>
            </Container>
        );
    }
};
