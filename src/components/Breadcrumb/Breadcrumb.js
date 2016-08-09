import React from 'react';
import { IndexLink } from 'react-router';

class Breadcrumb extends React.Component {
	render() {
		if(this.props.rootNode){
			return(<p>You are here: <IndexLink to="/" activeClassName="active">Home</IndexLink></p>);
		}
		else{
			return(
				<p>You are here: <IndexLink to="/" activeClassName="active">Home </IndexLink>
	                > {this.props.childNode}</p>
			);
		}
	}
}

export default Breadcrumb;