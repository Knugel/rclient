import { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Subreddit from './components/subreddit/Subreddit';
import Post from './components/post/Post';

export default function App(): ReactElement {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                </Route>
                <Route path="/r/:id/comments/:postId">
                    <Post/>
                </Route>
                <Route path="/r/:id">
                    <Subreddit/>
                </Route>
            </Switch>
        </Router>
    );
}
