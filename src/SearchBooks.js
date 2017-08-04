import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Terms from './SearchTerms'
import Autocomplete from 'react-autocomplete'

class SearchBooks extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
	}

	state = {
		query: '',
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
						<Autocomplete
							value={this.state.query}
							inputProps={{ placeholder: 'Search by title or author' }}
							items={Terms.map(term => ({
								label: term,
							}))}
							getItemValue={item => item.label}
							shouldItemRender={(item, value) =>
								item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1}
							onChange={(event, value) => this.setState({ query: value })}
							onSelect={value => this.setState({ query: value })}
							renderItem={(item, isHighlighted) =>
								<div
									style={{ background: isHighlighted ? 'lightgray' : 'white' }}
								>
									{item.label}
								</div>}
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
