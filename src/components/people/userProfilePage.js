import React from "react";

import { dataService } from "../services/serviceData";
import { redirect } from "../services/serviceRedirect";

import { Profile } from "../profile/profile";

class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        return {
            profile: {
                _name: "Loading...",
                _email: "",
                _aboutShort: "",
                _about: "",
                _avatarUrl: "http://3.bp.blogspot.com/_JBHfzEovWs8/S8X3wH9vbTI/AAAAAAAAAPM/O8r2xpeeur0/s1600/batman-for-facebook.jpg",
                _postsCount: 0,
                _commentsCount: 0
            },
            error: ""
        };
    }

    componentDidMount() {
        this.getProfile(this.props.match.params.id);
    }

    getProfile(id) {
        dataService.getUserProfile(id, profile => this.loadProfile(profile), error => this.handleNetworkRequestError(error));
    }

    handleNetworkRequestError(error) {
        if (error.request) {
            this.setState({ error: "There is no response from server." });
        }
    }

    loadProfile(profile) {
        this.setState({ profile: profile });
    }

    render() {

        let { _name, _email, _aboutShort, _about, _avatarUrl, _postsCount, _commentsCount } = this.state.profile;
        let { error } = this.state;

        return (
            <main className="container">
                <Profile user={this.state.profile} />
            </main>
        );
    }
}

export default UserProfilePage;