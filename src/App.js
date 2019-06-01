
import React, { Component } from 'react';
import './App.css';




const DEFAULT_QUERY = '';
const DEFAULT_HPP = 100; 

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';


function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

const Search = ({value, onChange, onSubmit, children})=> //functional stateless components changed from an ES6 class component

    <form onSubmit={onSubmit}>
          <input 
          type="text" 
          value = {value} 
          onChange = {onChange} />
    <button type="submit">
      {children}
    </button>
    </form>

class Button extends Component{    //ES6 Class component
  render(){
    const {onClick, className ='', children} = this.props;
    return (
      <button onClick = {onClick} className={className} type="button">
        {children}
      </button>

    )

  }
}

const Table = ({ list, onDismiss }) =>
  <div className="table">
    {list.map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{width:'40%'}}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{width:'30%'}}>{item.author}</span>
        <span style={{width:'10%'}}>{item.num_comments}</span>
        <span style={{width:'10%'}}>{item.points}</span>
        <span style={{width:'10%'}}>
        <Button
      onClick={() => onDismiss(item.objectID)} className="button-inline">
         Dismiss
        </Button>
        </span>
</div>
)}
</div>


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
};
  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.onDismiss = this.onDismiss.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
  this.onSearchSubmit = this.onSearchSubmit.bind(this);
  this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
}

setSearchTopStories(result){

  const { hits , page}=result;
  const {searchKey, results} = this.state;
  const oldHits = results && results[searchKey]
  ? results[searchKey].hits
  : [];
  const updatedHits = [ ...oldHits, ...hits];
  this.setState({result: { hits: updatedHits, page }});

}

fetchSearchTopStories(searchTerm, page=0) {
  fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${
  PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
}


componentDidMount(){
  const {searchTerm } = this.state;
  this.setState({searchKey: searchTerm});
  this.fetchSearchTopStories(searchTerm);}

onSearchSubmit(event){
  const {searchTerm }=this.state;
  this.setState({searchKey: searchTerm});
  this.fetchSearchTopStories(searchTerm);
  event.preventDefault();
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId); 
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
  }); }

    render() {
      const { searchTerm, result } = this.state;
      const page = (result && result.page)||0;
      return (
        <div className="page">
          <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit = {this.onSearchSubmit}>
              Search 
            </Search>
          </div>
          { result &&
          <Table //If the condition is true, the expression after the logical && operator will be the output. If the condition is false, React ignores and skips the expression. It is applicable in the Table conditional rendering case, because it should return a Table or nothing.
          list={result.hits}
          onDismiss={this.onDismiss}
        /> }
        <div className="interactions">
          <Button onClick={()=> this.fetchSearchTopStories(searchTerm, page+1)}>
            More
          </Button>
        </div>
          
        </div> );
} }

export default App;
  