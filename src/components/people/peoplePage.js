import React from "react";
import { dataService } from "../services/serviceData";
import Search from "../common/search";

import { UserDescription } from "./userDescription";

class PeoplePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
        this.bindEventHandlers();
    }

    initState() {
        return {
            usersOriginal: [],
            users: [],
            error: ""
        };
    }

    componentDidMount() {
        this.getPeople();
    }

    bindEventHandlers() {
        this.filterUsers = this.filterUsers.bind(this);
    }

    getPeople() {
        dataService.getUsers(users => this.setState({ usersOriginal: users, users: users }), error => this.handleNetworkRequestError(error));
    }

    filterUsers(searchItem) {
        const usersOriginal = this.state.usersOriginal;

        if (!searchItem) {
            this.setState({ users: usersOriginal });
            return;
        }

        const searchMatches = usersOriginal.filter(user => {
            const searchUserName = user.name.toLowerCase();
            return searchUserName.includes(searchItem);
        });
        this.setState({ users: searchMatches });
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    render() {
        if (this.state.usersOriginal.length < 1) {
            return (
                <main className="container">
                    <Search onSearch={this.filterUsers} />
                    <h1 className="text-center">Loading users...</h1>
                </main>
            );
        }

        return (
            <main className="container">
                <Search onSearch={this.filterUsers} />
                <p className="error">{this.state.error}</p>
                {this.state.users.map(user => {
                    return (
                        <UserDescription userData={user} key={user._id} id={user._id} />
                    );
                })}
            </main>
        );
    }
}

export default PeoplePage;