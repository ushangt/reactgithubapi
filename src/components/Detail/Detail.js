import React from 'react';
import { Link } from 'react-router';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import ajax from 'superagent';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'commits',
            commits: [],
            forks: [],
            pulls: []
        };
    }

    
    fetchFeed(type) {
        if(this.props.params.repo === ''){
            return;
        }

        const baseURL = 'https://api.github.com/repos/facebook';

        // -------- Discarding fetch for superagent -----------------------------
        /*fetch(`${baseURL}/${this.props.params.repo}/${type}`).then((response) => {
            return response.json();
        }).then((body) => {
            this.setState({ [type]: body });
        }).catch((err) => {
            console.log(`Error fetching ${type}`,err);
        });*/

        // --------------  superagent code ---------------------------------------------------
        ajax.get(`${baseURL}/${this.props.params.repo}/${type}`) //es6 String Interpolation: Need `` and not ''
            .end((error, response) => {
                if (!error && response) {
                    this.setState({ [type]: response.body }); //es6 Computed property names: surround variable names by []
                } else {
                    console.log(`Error fetching ${type}`, error);
                }
            }
        );
    }

    componentWillMount() {
        
        this.fetchFeed('commits');
        this.fetchFeed('forks');
        this.fetchFeed('pulls');
    }

    selectMode(mode) {
        this.setState({ mode });
    }


    renderCommits() {
        return this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : 'Anonymous';
            const profileLink = '/user/'+author;

            return (<p key={index}>
                <Link to={profileLink}> {author} </Link> :
                <a href={commit.html_url}>{commit.commit.message}</a>.
            </p>);
        });
    }

    renderForks() {
        return this.state.forks.map((fork, index) => {
            const owner = fork.owner ? fork.owner.login : 'Anonymous';
            const profileLink = '/user/'+owner;

            return (<p key={index}>
                <Link to={profileLink}> {owner} </Link> : forked to
                <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
            </p>);
        });
    }

    renderPulls() {
        return this.state.pulls.map((pull, index) => {
            const user = pull.user ? pull.user.login : 'Anonymous';
            const profileLink = '/user/'+user;

            return (<p key={index}>
                <Link to={profileLink}> {user} </Link> :
                <a href={pull.html_url}>{pull.body}</a>.
            </p>);
        });
    }

    render() {
        let content;

        if (this.state.mode === 'commits') {
            content = this.renderCommits();
        } else if (this.state.mode === 'forks') {
            content = this.renderForks();
        } else {
            content = this.renderPulls();
        }

        return (<div>
            <Breadcrumb childNode = {this.props.params.repo} />
            <br/>
            <button onClick={this.selectMode.bind(this, 'commits')}>Show Commits</button>
            <button onClick={this.selectMode.bind(this, 'forks')}>Show Forks</button>
            <button onClick={this.selectMode.bind(this, 'pulls')}>Show Pulls</button>
            <hr/>
            <h1>{this.state.mode}</h1> 
            {content}
        </div>);
    }
}

export default Detail;