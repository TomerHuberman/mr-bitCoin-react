import { ContactPreview } from "./ContactPreview";

export function ContactList({ contacts, onSelectContactId }) {
  return (
    <section className="contact-list">
      {contacts.map((contact) => (
        <ContactPreview
          onSelectContactId={onSelectContactId}
          key={contact._id}
          contact={contact}
        />
      ))}
    </section>
  );
}
