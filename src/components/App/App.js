import React from 'react';

class App extends React.Component {
	render() {
		return(
			<div>
				<h1> GitHub API using React with Docker & CI </h1>
				{this.props.children}
			</div>
		);
	}
}

export default App;
