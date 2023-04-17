import { Component } from "react";
import { contactService } from "../services/contact.service";

export class ContactDetails extends Component {
  state = {
    contact: null,
  };

  componentDidMount() {
    this.loadContact();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact();
    }
  }

  onBack = () => {
    this.props.history.push("/contact");
  };

  loadContact = async () => {
    const contact = await contactService.getContactById(
      this.props.match.params.id
    );
    this.setState({ contact });
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading...</div>;

    return (
      <section className="contact-details">
        <h1>this is contact details</h1>
        <button onClick={this.onBack}>Back</button>
        <pre>{JSON.stringify(contact, null, 2)}</pre>
      </section>
    );
  }
}
