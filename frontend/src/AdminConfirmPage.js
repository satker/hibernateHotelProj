import React from "react";
import {Form, Input, Table} from "reactstrap";

const URL = "http://localhost:8080/admin/users/_id_/confirms";

export default class AdminConfirmPage extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {};
    }

    onChange(evt) {
        this.setState({[evt.target.name]: evt.target.value});
    }

    async onSubmit(evt) {
        evt.preventDefault();

        let body = {};
        Object.assign(body, this.state);

        let resp = await fetch(URL.replace("_id_", this.props.user().id), {
            method: "post",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (resp.status === 200) {
            //this.props.goBack();
        } else {
            alert("Failed to confirm");
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <h1>Confirm request</h1>
                <Table>
                    <tbody>
                    <tr>
                        <td>Number of room</td>
                        <td><Input type="text" name="number"/></td>
                    </tr>
                    <tr>
                        <td>Cost one night</td>
                        <td><Input type="text" name="costNight"/></td>
                    </tr>
                    </tbody>
                </Table>
                <Input className="btn btn-success" type="submit" value="Confirm"/>
            </Form>
        );
    }
};
