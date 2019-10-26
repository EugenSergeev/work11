class Popup {
    constructor(container) {
        this.container = container;
        this.popup = null;
        this.form = null;
        buttonAddCard.addEventListener('click', this.open ); 
        buttonEditProfile.addEventListener('click', this.open ); 
        this.templatePopup = this.templatePopup.bind(this);
    }

    open = (event) => {
		console.log(this);
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

