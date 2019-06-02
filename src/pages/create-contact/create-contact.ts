import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { Camera, CameraOptions } from  '@ionic-native/camera';

/**
* Generated class for the CreateContactPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-create-contact',
    templateUrl: 'create-contact.html',
})
export class CreateContactPage {

    model: Contact;

    constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, public contactsProvider: ContactsProvider, private camera: Camera) {
        this.model = new Contact();
        this.model.name = 'Novo contato';
        this.model.gender = 'male';
        this.model.photo = '';
    }

    createContact() {
        var data = {
            'contact': {
                'name': this.model.name,
                'gender': this.model.gender,
                'photo': this.model.photo
            }
        };

        console.log(data);

        this.contactsProvider.addContact(data)
        .then((result: any) => {
            this.toast.create({ message: 'Contato criado'}).present();
        })
        .catch((error: any) => {
            this.toast.create({ message: 'Falha ao criar o contato: '+
            error.error }).present();
            console.log(error);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateContactPage');
    }

    takePicture() {
        // this.photo = '';

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            targetWidth: 100,
            targetHeight: 100
        }

        this.camera.getPicture(options)
        .then((imageData) => {
            let base64image = 'data:image/jpeg;base64,' + imageData;
            this.model.photo = base64image;
        }, (error) => {
            console.error(error);
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

export class Contact {
    name: string;
    gender: string;
    photo: string;
}
