import * as React from 'react';
import './App.css';
import Form from './components/Form/Form';
import Picture from './components/Picture/Picture';


class App extends React.Component {
  public render() {
    return (
      <div>
        <Form/>
        <Picture/>
        <Picture/>
      </div>
    );
  }
}

export default App;
