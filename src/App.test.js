import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App, { Button} from './components/App';
import Search from './components/Search';
import Table from './components/Table';



describe ('App', ()=>{

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', ()=>{
    const component = renderer.create(<App />);

  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
});

describe ('Search', ()=>{
  it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', ()=>{
    const component = renderer.create(<Search>Search</Search>);

  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
});

describe ('Button', ()=>{
  it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Button>Button</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', ()=>{
    const component = renderer.create(<Button>Button</Button>);

  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
});


describe ('Table', ()=>{
  const props = {
    list : [
      {title : '1', author: '1', num_comments: 1, points: 2, objectID: 'ID1234'},
      {title : '2', author: '2', num_comments: 1, points: 2, objectID: 'testID'},
    ],
  };
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props } />, div);
});
  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Table { ...props } />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
