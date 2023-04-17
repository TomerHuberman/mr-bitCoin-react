import { Link } from "react-router-dom";

export function ContactPreview({ contact }) {
  const robotStyle = {
    backgroundImage: `url(https://robohash.org/${contact._id})`,
  };
  return (
    <Link to={`/contact/${contact._id}`} className="contact-preview">
      <div className="img" style={robotStyle}></div>
      <h2 className="name">{contact.name}</h2>
      <h4 className="phone">{contact.phone}</h4>
    </Link>
  );
}
