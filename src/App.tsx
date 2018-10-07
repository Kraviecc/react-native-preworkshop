import * as React from 'react';
import './App.css';
import Form from './components/Form/Form';
import Picture from './components/Picture/Picture';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Form formSubmitted={this.formSubmitted}/>
        <Picture/>
        <Picture/>
      </div>
    );
  }

  private async formSubmitted(data: any) {
    alert("form submitted selected:" + data.selectedPet);
    try {
      const response = await fetch("http://shibe.online/api/shibes?count=1");
      alert(response);
    } catch (ex){
      alert(ex);
    }
  }
}

export default App;
