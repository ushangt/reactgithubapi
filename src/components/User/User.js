import React from 'react';
import { Link } from 'react-router';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import ajax from 'superagent';

class User extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			events: []
		}
	}

	componentWillMount(){
		const baseURL = 'https://api.github.com/users';

		// -------- Discarding fetch for superagent -----------------------------
        /*fetch(`${baseURL}/${this.props.params.user}/events`).then((response) => {
            return response.json();
        }).then((body) => {
            this.setState({ events: body });
        }).catch((err) => {
            console.log(`Error fetching ${this.props.params.user}`,err);
        });*/

        // -------------- superagent code ---------------------------------------------------
        ajax.get(`${baseURL}/${this.props.params.user}/events`) //es6 String Interpolation: Need `` and not ''
            .end((error, response) => {
                if (!error && response) {
                    this.setState({ events: response.body }); //es6 Computed property names: surround variable names by []
                } else {
                    console.log(`Error fetching ${this.props.params.user} data`, error);
                }
            }
        );
	}

	getContent() {
		return this.state.events.map((event, index) => {
			var eventMap = [
				{key:"Event Type", value: event.type},
				{key:"Actor Name", value: event.actor.login},
				{key:"Actor URL", value: event.actor.url},
				{key:"Repo Name", value: event.repo.name},
				{key:"Repo URL", value: event.repo.url},
				{key:"Created At", value: event.created_at}
			];
			return(
					<ul key={index}>
						{
							eventMap.map((data,index) => {
								return <li key={index}> <b> {data.key} </b>: {data.value} </li>;
							})
						}
					</ul>
				);
			});
	}

	render() {
		let content = this.getContent();
		return(<div>
				<Breadcrumb childNode = {this.props.params.user} />
				{content}
			</div>);
	}
}

export default User;
