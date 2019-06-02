import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {

    contacts: any;

    constructor(public navCtrl: NavController, public contactsProvider: ContactsProvider) {
        this.getContacts();
    }

    getContacts() {
        this.contactsProvider.getContacts()
        .then(data => {
            this.contacts = data;
            console.log(this.contacts);
        });
    }
}
