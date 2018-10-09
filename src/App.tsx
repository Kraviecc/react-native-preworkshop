import * as React from 'react';
import Form from './components/Form/Form';
import Picture from './components/Picture/Picture';
import Configuration from './models/Configuration';
import IFormData from './models/IFormData';

interface IAppState {
  pictures: string[];
  isLoading: boolean;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { pictures: [], isLoading: true };
    this.formSubmitted = this.formSubmitted.bind(this);
  }

  public render() {
    return (
      <div>
        <Form formSubmitted={this.formSubmitted}
          isLoading={this.state.isLoading} />
        {this.state.pictures.map(picture => <Picture src={picture} key={picture} />)}
      </div>
    );
  }

  private formSubmitted(formData: IFormData) {
    this.setState({ isLoading: true });
    fetch(`${Configuration.CorsEscape}http://shibe.online/api/${formData.pets}?count=${formData.count}`)
      .then(response => response.json())
      .then((data: string[]) => this.setState({ pictures: data }))
      .catch(error => alert(`Error occured, try again later. ${error}`))
      .finally(() => this.setState({ isLoading: false }));
  }
}

export default App;
