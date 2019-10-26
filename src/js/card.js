'use strict'

class Card {
    constructor(element, container) {
        this.name = element.name;
        this.link = element.link;
        this.container = container;
        this.like  = this.isLikeForMe(element.likes);
        this.likes = element.likes.length;
        this._id = element._id;
        this.user = element.owner._id;
        this.element = null;
        this.likesOwners = element.likes;

        this.likeCard = this.likeCard.bind(this);
        this.showImage = this.showImage.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    isLikeForMe (owners) {
        return owners.some(el => el._id === myId);
    }

    createCard() {
        const templateCard = `<div class="place-card">
                                <div class="place-card__image" style="background-image: url(${this.link})">
                                    <button class="place-card__delete-icon ${this.user!==myId?"place-card__delete-icon_off":""}"></button>
                                </div>
                                <div class="place-card__description">
                                    <h3 class="place-card__name">${this.name}</h3>
                                    <div class="place-card__like-container">
                                    <button class="place-card__like-icon${this.like?" place-card__like-icon_liked":""}"></button>
                                    <p class="place-card__like-counter">${this.likes}</p>
                                    </div>
                                </div>
                            </div>`;
        var tempElement = document.createElement("div");
        tempElement.insertAdjacentHTML('beforeend', templateCard.trim());
        return tempElement.firstChild;
    }

    render() {
        this.element = this.createCard();
        this.container.appendChild(this.element);
        this.addListeners();
    }
    
    deleteCard () {
        if (window.confirm("Удалить карточку? \nP.S. Действие отменить нельзя!")) {
                api.deleteCardFromServer(this._id).then((res) => {
                    this.element.remove();
                    this.removeListeners();
            })
        }
    }

    likeCard (event) {
        if (!this.like) {
            api.likedCard(this._id).then(resJson => {
                this.likes  = resJson.likes.length;
                this.element.querySelector(".place-card__like-counter").textContent=this.likes;
            }).catch(() => {
                this.returnLike(event)
            });
        this.setLike(this.likes+1);
        }else {
            api.unlikedCard(this._id).then(resJson => {
                this.likes  = resJson.likes.length;
                this.element.querySelector(".place-card__like-counter").textContent=this.likes;
            }).catch(() => {
                this.returnLike(event)
            });
            this.setLike(this.likes-1);
        }
        this.like = !this.like;
        event.target.classList.toggle('place-card__like-icon_liked')
    }

    returnLike(event) {
        this.like = !this.like;
        this.setLike(this.likes);
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    setLike(total) {
        this.element.querySelector(".place-card__like-counter").textContent=total;
    }


    showImage(event){
        if (event.target.classList.contains('place-card__image')){
            picContainer.querySelector("#image").src = this.link;
            picContainer.classList.add('pic-container_is-open');
            picContainer.querySelector('#popupPicClose').addEventListener('click', this.closeImage);
        }
    }

    closeImage(event) {
        picContainer.querySelector('#popupPicClose').removeEventListener('click', this.closeImage);
        picContainer.classList.remove('pic-container_is-open');
    }

    addListeners() {
        this.element.querySelector('.place-card__delete-icon').addEventListener('click', this.deleteCard);
        this.element.querySelector('.place-card__image').addEventListener('click', this.showImage);
        this.element.querySelector('.place-card__like-icon').addEventListener('click', this.likeCard);
    }
    removeListeners() {
        this.element.querySelector('.place-card__delete-icon').removeEventListener('click', this.deleteCard);
        this.element.querySelector('.place-card__image').removeEventListener('click', this.showImage);
        this.element.querySelector('.place-card__like-icon').removeEventListener('click', this.likeCard);
    }
}