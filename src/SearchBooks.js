import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
	}

	state = {
		query: '',
	}

	handleChange = event => {
		this.setState({ query: event.target.value })
	}

	render() {
		const { history } = this.props
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<a className="close-search" onClick={() => history.push('/')}>
						Close
					</a>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							onChange={this.handleChange}
							placeholder="Search by title or author"
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid" />
				</div>
			</div>
		)
	}
}

export default SearchBooks
