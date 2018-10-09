import * as React from 'react';
import Configuration from 'src/models/Configuration';
import IFormData from 'src/models/IFormData';
import Pet from 'src/models/Pet';

interface IFormState {
  value: number;
  pets: Pet[];
  selectedPet: Pet;
}

interface IFormProps {
  formSubmitted: (data: IFormData) => void;
  isLoading: boolean;
}

class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = {
      pets: Configuration.Pets.concat([Configuration.RandomPet]),
      selectedPet: Configuration.Pets[0],
      value: 1
    };
    this.numberOnChange = this.numberOnChange.bind(this);
    this.formOnSubmit = this.formOnSubmit.bind(this);
    this.petsOnChange = this.petsOnChange.bind(this);

    this.sendData();
  }

  public render() {
    return (
      <form onSubmit={this.formOnSubmit}>
        Ilość zdjęć&nbsp;
        <input type="number"
          min={Configuration.MinCountValue}
          max={Configuration.MaxCountValue}
          value={this.state.value}
          onChange={this.numberOnChange} />
        <br />
        Typ zwierzaka&nbsp;
        <select onChange={this.petsOnChange}
          defaultValue={this.state.selectedPet.endpointName}>
          {this.state.pets.map(pet => <option key={pet.endpointName}>{pet.name}</option>)}
        </select>
        <br />
        <button type="submit" disabled={this.props.isLoading}>{this.getSubmitButtonText()}</button>
      </form>
    );
  }

  private getSubmitButtonText(): string {
    return this.props.isLoading ? "Ładowanie danych" : "Szukaj";
  }

  private numberOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue) || newValue < 1) {
      newValue = Configuration.MinCountValue;
    } else if (newValue > 10) {
      newValue = Configuration.MaxCountValue;
    }
    this.setState({ value: newValue });
  }

  private petsOnChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedPet: this.state.pets.filter(pet => pet.name === event.target.value)[0] });
  }

  private formOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    this.sendData();
    event.preventDefault();
  }

  private sendData() {
    this.props.formSubmitted({ pets: this.getSelectedPets(), count: this.state.value });
  }

  private getSelectedPets(): string {
    return this.state.selectedPet === Configuration.RandomPet ?
      this.getRandomPets() :
      this.state.selectedPet.endpointName;
  }

  private getRandomPets(): string {
    return Configuration.Pets[Math.floor(Math.random() * Configuration.Pets.length)].endpointName;
  }
}

export default Form;