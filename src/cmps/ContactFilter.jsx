import { Component } from "react";

export class ContactFilter extends Component {
  state = {
    filterBy: null,
  };

  componentDidMount() {
    this.setState({ filterBy: { ...this.props.filterBy } });
  }

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;

    // switch (target.type) {
    //   case "number":
    //   case "range":
    //     value = +value;
    //     break;
    //   case "checkbox":
    //     value = target.checked;
    //     break;
    //   default:
    //     break;
    // }
    this.setState(
      ({ filterBy }) => ({ filterBy: { ...filterBy, [field]: value } }),
      () => this.props.onChangeFilter(this.state.filterBy)
    );
  };

  render() {
    if (!this.state.filterBy) return <div>Loading...</div>;
    const { term } = this.state.filterBy;
    return (
      <section className="contact-filter">
        <section>
          <label htmlFor="term">Search </label>
          <input
            onChange={this.handleChange}
            value={term}
            term="text"
            name="term"
            id="term"
          />
        </section>
      </section>
    );
  }
}
