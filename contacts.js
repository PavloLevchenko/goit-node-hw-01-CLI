import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

/* Asynchronously reads the entire contents of a file and returns it */
export async function listContacts() {
  try {
    const contacts = await readFile(contactsPath);
    return contacts;
  } catch (err) {
    console.error(err);
  }
}
/* Reads file, constructs array from JSON string, filter, 
converts filtered value to a JSON string and returns it */
export async function getContactById(contactId) {
  try {
    const contactsStr = await readFile(contactsPath);
    const contactsArr = JSON.parse(contactsStr);
    const contact = contactsArr.find((contact) => contact.id == contactId);
    return JSON.stringify(contact);
  } catch (err) {
    console.error(err);
  }
}
/* Reads file, constructs array from JSON string, filter.
If contact exist, excludes it by filtering, converts filtered array to a JSON string.
Writes changed Contacts to the file. Returns removed contact as a JSON string. */
export async function removeContact(contactId) {
  try {
    const contactsStr = await readFile(contactsPath);
    const contactsArr = JSON.parse(contactsStr);
    const contact = contactsArr.find((contact) => contact.id == contactId);
    if (contact) {
      const newContacts = contactsArr.filter(
        (contact) => contact.id != contactId
      );
      const jsonString = JSON.stringify(newContacts, " ", 2);
      await writeFile(contactsPath, jsonString);
    }
    return JSON.stringify(contact);
  } catch (err) {
    console.error(err);
  }
}
/* Constructs a new contact object. Reads file, constructs array from JSON string.
Adds a new contact to the end of the array. Converts a JavaScript array to a JSON string.
Writes changed Contacts to the file. Returns added contact as a JSON string. */
export async function addContact(name, email, phone) {
  try {
    const contact = { id: nanoid(), name, email, phone };
    const contactsStr = await readFile(contactsPath);
    const contactsArr = JSON.parse(contactsStr);
    const jsonString = JSON.stringify([...contactsArr, contact], " ", 2);
    await writeFile(contactsPath, jsonString);
    return JSON.stringify(contact);
  } catch (err) {
    console.error(err);
  }
}
