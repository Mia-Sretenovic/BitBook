import React from "react";
import { Switch, Route } from "react-router-dom";

import { storageService } from "../services/serviceStorage";
import { USER_ID } from "../../constants";

import { Header } from "./header";

import ProfilePage from "../profile/profilePage";
import FeedPage from "../feed/feedPage";
import PeoplePage from "../people/peoplePage";
import UserProfilePage from "../people/userProfilePage";
import SinglePostPage from "../posts/singlePost/singlePostPage";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userId = storageService.getStorageItem(USER_ID);

        return (
            <div className="wrapper">
                <Header />
                <div className="container mainContent">
                    <Switch>
                        <Route exact path="/" component={FeedPage} />
                        <Route path="/feed" component={FeedPage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route exact path="/people" component={PeoplePage} />
                        <Route exact path={`/people/${userId}`} component={ProfilePage} />
                        <Route path="/people/:id" component={UserProfilePage} />
                        <Route path="/posts/:type/:id" component={SinglePostPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default MainPage;