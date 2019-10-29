const buttonAddCard = document.querySelector('.user-info__button');
const buttonEditProfile = document.querySelector('.user-info__edit');
const link_REGEX = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
let form = null;

import {album} from "./script";
import {api} from "./script";

const popupNew = `
<div id="popupNew" class="popup">
   <div class="popup__content">
      <img id="popupNewClose" src="./images/close.svg" alt="" class="popup__close">
       <h3 class="popup__title">Новое место</h3>
       <form class="popup__form" name="new">
          <input type="text" name="name" required class="popup__input popup__input_type_name" placeholder="Название">
          <span id="error-name" class="error-message">Ошибка</span>
          <input type="text" name="link" required class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
             <span id="error-link" class="error-message">Ошибка</span>
           <button  class="button popup__button popup__button_new" disabled = "true">+</button>
       </form>
   </div>
</div>`;
const popupEdit = `
<div id="editProfile" class="popup">
    <div class="popup__content">
       <img id="popupEditClose"  src="./images/close.svg" alt="" class="popup__close">
       <h3 class="popup__title">Редактировать профиль</h3>
       <form class="popup__form" name="edit">
           <input type="text" name="name" required class="popup__input " placeholder="Имя">
           <span id="error-name" class="error-message">Ошибка</span>
          <input type="text" name="job" required class="popup__input " placeholder="О себе">
           <span id="error-job" class="error-message">Ошибка</span>
           <button  class="button popup__button popup__button_edit popup__button_is-active" >Сохранить</button>
       </form>
   </div>
</div> `;
const popupChangeAvatar = `
<div id="changeAvatar" class="popup">
    <div class="popup__content">
        <img id="popupChangeAvatarClose"  src="./images/close.svg" alt="" class="popup__close">
        <h3 class="popup__title">Обновить аватар</h3>
        <form class="popup__form" name="formChangeAvatar">
            <input type="text" name="link" required class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
            <span id="error-link" class="error-message">Ошибка</span>
            <button  class="button popup__button popup__button_edit popup__button_is-active" >Сохранить</button>
        </form>
    </div>
</div> `;
function buttonActive(buttonForm) {//Активация кнопки формы
    buttonForm.classList.add("popup__button_is-active")
    buttonForm.removeAttribute('disabled');
}
function buttonInactive(buttonForm) {//дезактивация кнопки формы
    buttonForm.setAttribute('disabled', true);      
    buttonForm.classList.remove("popup__button_is-active");
}
function getButton(event) { //получение ссылки на кнопку из event
    const thisForm = event.target.closest(".popup__content");
    const buttonForm = thisForm.querySelector('.button');
    return buttonForm;
}
function deleteSpace(input) {
    while (input.value.indexOf(" ")===0){
        input.value=input.value.slice(1);
    }
}
function errorElement(input) {
    const element = input.closest(".popup__form").querySelector(`#error-${input.name}`);
    function show() {
        element.classList.add("input-container__invalid");
    }
    function hide() {
        element.classList.remove("input-container__invalid");
    }
    function text(string) {
        element.textContent = `${string}`;
    }
    return {
        show,
        hide,
        text
    };
}
function checkName (input){
    const err = errorElement(input);
    err.hide();
    const length = input.value.length;
    deleteSpace(input);
    function only30Symbol () {
        err.hide();
    }
    if (!length) {
        err.show();
        err.text("Это обязательное поле");
        return false;
    } else if (length===1 || length>30) {
        err.show();
        err.text("Должно быть от 2 до 30 символов");
        if (length > 30) { 
            input.value=input.value.slice(0,30);
            window.setTimeout(only30Symbol, 2000); 
            return true;
        }
        return false;
    }
    return true;
}

function checkLink (input){
    const err = errorElement(input);
    err.hide();
    const length = input.value.length;
    deleteSpace(input);
    if (!length) {
        err.show();
        err.text("Это обязательное поле");
        return false;
    } else if (!input.value.match(link_REGEX)) {
        err.show();
        err.text("Здесь должна быть ссылка");
        return false;
    }
    return true;
}
function isValidFormAdd(event) {
    if (event.target.name === "name") {
        /**
         * Давай напишем аккуратнее:
         * 
         * if (!checkName || !checkLink) {
         *   return false;
         * }
         * return true;
         * 
         * Дальше по аналогии
         */
        if (!checkName(event.target)) {
            return false;
        } else if (!checkLink(form.link)) {
            return false;
        }else return true;
    } 
    if (event.target.name === "link") {
        if (!checkLink(event.target)) {
            return false;
        } else if (!checkName(form.name)) {
            return false;
        }else return true;
    }
}
function isValidFormEdit(event) {
    if (event.target.name === "name") {
        // И здесь как выше
        if (!checkName(event.target)) {
            return false;
        } else if (!checkName(form.job)) {
            return false;
        }else return true;
    } 
    if (event.target.name === "job") {
        if (!checkName(event.target)) {
            return false;
        } else if (!checkName(form.name)) {
            return false;
        }else return true;
    }
}
function inputToFormAdd(event) {
    if (isValidFormAdd(event)) {
        buttonActive(getButton(event));
    } else {
        buttonInactive(getButton(event));
    }
}
function inputToFormEdit(event) {
    if (isValidFormEdit(event)) {
        buttonActive(getButton(event));
    } else {
        buttonInactive(getButton(event));
    }
}

export class Popup {
    constructor(container) {
        this.container = container;
        this.popup = null;
        this.form = null;
        buttonAddCard.addEventListener('click', this.open ); 
        buttonEditProfile.addEventListener('click', this.open ); 
        this.templatePopup = this.templatePopup.bind(this);
    }

    open = (event) => {
        if (event.target.classList.contains('user-info__button')){
            this.popup = this.templatePopup(popupNew);
            this.popup.classList.add('popup_is-opened');
            this.render();
            this.form = document.forms.new;
            form = this.form;
            this.form.querySelector("#error-name").textContent="";
            this.form.querySelector("#error-link").textContent="";
            this.form.querySelector('.button').classList.remove("popup__button_is-active");  
            this.addListeners('new');
        }
        if (event.target.classList.contains('user-info__edit')){
            this.popup = this.templatePopup(popupEdit);
            this.popup.classList.add('popup_is-opened');
            this.render();
            this.form = document.forms.edit;
            form = this.form;
            this.form.querySelector("#error-name").textContent="";
            this.form.querySelector("#error-job").textContent="";
            form.elements.name.value = document.querySelector('.user-info__name').textContent;
            form.elements.job.value = document.querySelector('.user-info__job').textContent; 
            this.addListeners('edit');
        }
        if (event.target.classList.contains('user-info__photo')){
            this.popup = this.templatePopup(popupChangeAvatar);
            this.popup.classList.add('popup_is-opened');
            this.render();
            this.form = document.forms.formChangeAvatar;
            form = this.form;
            this.form.querySelector("#error-link").textContent="";
            this.form.querySelector('.button').classList.remove("popup__button_is-active");  
            this.addListeners('avatar');
        }
    }

    render(){
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.container.appendChild(this.popup);
    }

    templatePopup(htmlCode) {
        const templatePopup = htmlCode;
        let tempElement = document.createElement("div");
        tempElement.insertAdjacentHTML('beforeend', templatePopup.trim());
        return tempElement.firstChild;
    }

    addListeners(popup){
        if (popup === "new") {
            this.form.addEventListener('input', inputToFormAdd);
            this.form.addEventListener('submit', this.addCard);
        }
        if (popup === "edit"){
            this.form.addEventListener('submit', this.editProfile);
            this.form.addEventListener('input', inputToFormEdit);
        }
        this.popup.querySelector('.popup__close').addEventListener('click', this.closePopup);
    }
    
    removeListeners(){
        this.popup.querySelector('.popup__close').removeEventListener('click', this.closePopup);
        this.form.removeEventListener('input', inputToFormAdd);
        this.form.removeEventListener('input', inputToFormEdit);
        this.form.removeEventListener('submit', this.addCard);
        this.form.removeEventListener('submit', this.editProfile);
    }

    closePopup = () => {
        this.popup.classList.remove('popup_is-opened');
        this.removeListeners();
    }

    addCard = (event) => {
        event.preventDefault();
        this.renderLoading(true,getButton(event));
        api.sendNewCard(this.form.elements.name.value,this.form.elements.link.value).then((resJson) => {
            album.addNewCard(resJson);
            this.closePopup();
            album.render();
        }).finally(()=>{this.renderLoading(false,getButton(event));})
    }

    editProfile = (event) => {
        event.preventDefault();
        this.renderLoading(true,getButton(event));
        api.sendDataProfile(form.elements.name.value,form.elements.job.value).then((res) => {
            if (res) {
                document.querySelector('.user-info__name').textContent = form.elements.name.value;
                document.querySelector('.user-info__job').textContent = form.elements.job.value;
                this.closePopup();
                this.renderLoading(false,getButton(event));
            };
        }).finally(()=>{this.renderLoading(false,getButton(event));})
    }

    renderLoading(isLoading,button) {
        if(isLoading) {
            button.textContent = "Загрузка...";
        } else {
            button.textContent = "Сохранить";
        };
    }

}


