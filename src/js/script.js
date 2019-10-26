import {Popup} from "./popup";
import {Api} from "./api";
import {CardList} from "./cardlist";

const l = (text) => console.log(text);

const popup = new Popup(document.querySelector('#popup'));
const album = new CardList (document.querySelector('.places-list'),[]);
const url = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'
const token = "386c8238-7cc6-475d-b7c2-fb29c9264cb1";
const api = new Api(url, token);
document.querySelector(".user-info__photo").addEventListener('click',popup.open);

//api.changeAvatar("https://i.ibb.co/Csjxrf6/photo-2019-08-18-15-34-40.jpg");

api.getProfileInfo().then(resJson => {
    document.querySelector(".user-info__name").textContent = resJson.name;
    document.querySelector(".user-info__job").textContent = resJson.about;
    document.querySelector(".user-info__photo").style.backgroundImage = `url(${resJson.avatar})`;
});


api.getCardArray().then(resJson => {
    if (resJson && resJson.length > 0) {
        resJson.forEach (element => album.addNewCard(element));
        album.render();
    }
});
