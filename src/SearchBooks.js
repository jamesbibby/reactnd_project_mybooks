import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Terms from './SearchTerms'
import Autocomplete from 'react-autocomplete'
import Book from './Book'

class SearchBooks extends Component {
	static propTypes = {
		history: PropTypes.object.isRequired,
		onSearch: PropTypes.func.isRequired,
		clearSearchResults: PropTypes.func.isRequired,
		searchResults: PropTypes.array.isRequired,
		searchResultsMessage: PropTypes.string,
		onShelfChange: PropTypes.func.isRequired,
		getCurrentShelf: PropTypes.func.isRequired,
	}

	state = {
		query: '',
	}

	handleChange = (event, value) => {
		this.setState({ query: value })
		this.props.onSearch(value)
	}

	handleSelect = value => {
		this.setState({ query: value })
		this.props.onSearch(value)
	}

	componentDidMount() {
		this.input.focus() // autofocus on the text input box
	}

	render() {
		const {
			history,
			clearSearchResults,
			onShelfChange,
			searchResults,
			searchResultsMessage,
			getCurrentShelf,
		} = this.props
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<a
						className="close-search"
						onClick={() => {
							clearSearchResults()
							history.push('/')
						}}
					>
						Close
					</a>
					<div className="search-books-input-wrapper">
						{
							// https://github.com/reactjs/react-autocomplete Autocompleting text
							// box based on the terms available to the API
						}
						<Autocomplete
							value={this.state.query}
							inputProps={{ placeholder: 'Search by title or author' }}
							items={Terms.map(term => ({
								label: term,
							}))}
							wrapperStyle={{}}
							getItemValue={item => item.label}
							shouldItemRender={(item, value) =>
								item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1}
							onChange={this.handleChange}
							onSelect={this.handleSelect}
							ref={el => (this.input = el)}
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
					<p>
						{searchResultsMessage}
					</p>
					<ol className="books-grid">
						{searchResults.map(book => {
							const shelf = getCurrentShelf(book.id, book.title)
							return (
								<Book
									key={book.id}
									onShelfChange={onShelfChange}
									showIcon={true}
									book={{
										...book,
										shelf: shelf, // override the shelf, search results are not accurate for this field
									}}
								/>
							)
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks
