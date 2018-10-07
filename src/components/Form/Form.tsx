import * as React from 'react';
import './Form.css';

interface IFormState {
  value: number;
  minValue: number;
  maxValue: number;
  pets: string[];
  selectedPet: string;
}

interface IFormProps {
  formSubmitted: (data: any) => void;
}

class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps){
    super(props);
    this.state = { 
      maxValue: 10,
      minValue: 1, 
      pets: [
        "shibes",
        "cats",
        "birds",
        "random" ],
      selectedPet: "shibes",
      value: 1 };
    this.numberOnChange = this.numberOnChange.bind(this);
    this.formOnSubmit = this.formOnSubmit.bind(this);
    this.petsOnChange = this.petsOnChange.bind(this);
  }

  public render() {
    return (
      <form onSubmit={this.formOnSubmit}>
        <input type="number" 
               min={this.state.minValue}
               max={this.state.maxValue}
               value={this.state.value}
               onChange={this.numberOnChange}/>
        <select onChange={this.petsOnChange}
                defaultValue={this.state.selectedPet}>
                {this.state.pets.map(pet => <option key={pet}>{pet}</option>)}
        </select>
        <button type="submit">Show</button>
      </form>
    );
  }

  private numberOnChange(event: React.ChangeEvent<HTMLInputElement>){    
    let newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue) ||
        newValue < 1) {
      newValue = this.state.minValue;
    } else if (newValue > 10){
      newValue = this.state.maxValue;
    }
    this.setState({ value: newValue });
  }

  private petsOnChange(event: React.ChangeEvent<HTMLSelectElement>){
    this.setState({selectedPet: event.target.value});
  }

  private formOnSubmit(event: React.FormEvent<HTMLFormElement>){
    this.props.formSubmitted({selectedPet: this.state.selectedPet});
    event.preventDefault();
  }
}

export default Form;