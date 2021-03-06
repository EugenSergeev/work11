import {Card} from "./card";

export class CardList {
     constructor (container,arrayCards){
        this.container = container;
        this.arrayCards = arrayCards;
    }

    render() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.arrayCards.forEach (element => this.addCard(element));
    }
    
    addCard (element) {
         const card = new Card(element, this.container);
         card.render();
    }

    addNewCard (element) {
        this.addCard(element);
        this.arrayCards.unshift(element);
    }


 }