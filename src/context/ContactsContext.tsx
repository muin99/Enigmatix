import { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { contacts as seedContacts } from "@/data/contacts";
import type { Contact } from "@/types";

type ContactsValue = {
  contacts: Contact[];
  addContact: (contactUserId: number) => void;
  toggleVerified: (id: number) => void;
};

const ContactsContext = createContext<ContactsValue | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>(seedContacts);

  const addContact = (contactUserId: number) => {
    if (!user) return;
    setContacts((prev) => [
      ...prev,
      { id: prev.length + 1, ownerId: user.id, contactUserId, verified: false },
    ]);
  };

  const toggleVerified = (id: number) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c)),
    );
  };

  return (
    <ContactsContext.Provider value={{ contacts, addContact, toggleVerified }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactsProvider");
  return ctx;
}
