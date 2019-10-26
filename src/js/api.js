'use strict'

class Api {
    constructor (url, token){
        this.url = url;
        this.token = token;
    }

    getProfileInfo(){
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: this.token
            }       
        })
        .then(res => this.checkRes(res))
        .catch(err => this.alertError(err,"загрузке информации о профиле"))
    }

    getCardArray(){
        return fetch(`${this.url}/cards`, {
            headers: {
                authorization: this.token
            }
        })
        .then(res => this.checkRes(res))
        .catch(err => this.alertError(err, "загрузке карточек"))
    }

    deleteCardFromServer(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
                },
        })
        .then(res => this.checkRes(res))
        .catch(err => this.alertError(err, "удалении карточки"))
    }
    
    sendDataProfile(name,about) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,about})
        })
        .then(res => this.checkRes(res))
        .catch(err => this.alertError(err, "отправке информации о профиле"))
        
    }
    
    sendNewCard (name,link) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, link})
        })
        .then(res => this.checkRes(res))
        .catch(err => this.alertError(err, "отправке новой карточки"))
    }

    likedCard (cardId){
        return fetch(`${this.url}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => this.checkRes(res))
        .catch(err => this.alertError(err, "отправки данных лайка"))
    }

    unlikedCard (cardId) {
        return fetch(`${this.url}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => this.checkRes(res))
        .catch(err => this.alertError(err, "удалении данных лайка"))
    }

//http://95.216.175.5/cohortId/users/me/${url}

    changeAvatar(avatar) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({avatar})
        })
        .then(res => this.checkRes(res))
        .catch(err => this.alertError(err, "отправке ссылки на аватар"))
        
    }

    checkRes(res) {
        if (res.ok) return res.json();
            return Promise.reject(res);
    }
    
    alertError(err,text) {
        alert(`Что то не так с сетью.\n
        Возникла ошибка при загрузке ${text}.\n
        Ошибка: ${err.status} - ${err.statusText}.`);
    }
}




/**
 * Надо исправить
 * 
 * Для запросов нужен отдельный класс Api
 * 
 * внутри конструктор адреса и токена и методы получения данных
 * которые возвращают fetch и res.json иначе Promise.reject(res.status)
 * 
 * Работа с данными размещается в других классах
 * const url = http://95.216.175.5/cohort2
 * const token = 386c8238-7cc6-475d-b7c2-fb29c9264cb1
 * const api = new Api(url, token)
 * 
 * дальнейшее использование примерно такое
 * 
 * api.getCards().then(cards => new cardList(el, cards))
 */