import { createContext, ReactNode, useContext, useState } from "react";
import type { Contact } from "@/types";

type ContactsValue = {
  contacts: Contact[];
  refreshContacts: () => Promise<void>;
  addContact: (contactUserId: number) => Promise<void>;
};

const ContactsContext = createContext<ContactsValue | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts] = useState<Contact[]>([]);

  // TEMP: stubs, Mahfi implements these
  const value: ContactsValue = {
    contacts,
    refreshContacts: async () => {},
    addContact: async () => {
      throw new Error("TODO Mahfi: implement addContact");
    },
  };

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

export function useContacts() {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactsProvider");
  return ctx;
}
