export class Card {
  constructor(data, album, image) {
    this.data = data;
    this.album = album;
    this.image = image;
  }

  createCard() {
    const $card = document.createElement("div");
    const $name = document.createElement("h1");
    const $description = document.createElement("p");
    const $image = document.createElement("img");
    const $series = document.createElement("ul");
    const $seriesElement = $series.appendChild(document.createElement("li"));
    const id = "";
    $card.appendChild($name);
    $card.appendChild($image);
    $card.appendChild($description);
    $card.appendChild($series);
    this.album.insertBefore($card, this.album.firstChild);
    this._fillCard($name, $image, $description, id, $seriesElement);
    return $card;
  }

  _fillCard(name, image, description, id, $seriesElement) {
    name.innerText = this.getName();
    image.src = this.getImage();
    description.innerText = this.getDescription();
    id = this.getID();
 
 
  }

  getName() {
    const name = this.data.name;
    return name;
  }



  getImage() {
    const image = this.image;
    return image;
  }

  getDescription() {
    const description = this.data.description;
    return description;
  }

  getID() {
    const id = this.data.id;
    return id;
  }

  getCard() {
    let card = {
      name: this.getName(),
      image: this.getImage(),
      description: this.getDescription(),
      id: this.getID(),
    };
    return card;
  }
}
