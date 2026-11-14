import { createContext, ReactNode, useContext, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { Contact } from "@/types";

type ContactsValue = {
  contacts: Contact[];
  addContact: (contactUserId: number) => void;
};

const ContactsContext = createContext<ContactsValue | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (contactUserId: number) => {
    if (!user) return;
    setContacts((prev) => [
      ...prev,
      { id: prev.length + 1, ownerId: user.id, contactUserId, verified: false },
    ]);
  };

  return (
    <ContactsContext.Provider value={{ contacts, addContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactsProvider");
  return ctx;
}
