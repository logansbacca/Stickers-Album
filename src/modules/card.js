export class Card {
  constructor(data, album, image, series, events, comics) {
    this.data = data;
    this.album = album;
    this.image = image;
    this.series = series;
    this.events = events;
    this.comics = comics;
  }
 
   createCard() {
    const $card = document.createElement("div");
    const $name = document.createElement("h1");
    const $description = document.createElement("p");
    const $image = document.createElement("img");
    const $seriesList = document.createElement("ul");
    const $eventsList = document.createElement("ul");
    const $comicsList = document.createElement("ul");
    const id = "";
    $card.appendChild($name);
    $card.appendChild($image);
    $card.appendChild($description);
    $card.appendChild($seriesList);
    $card.appendChild($eventsList);
    $card.appendChild($comicsList);
    $card.classList.add("card");
    this.album.insertBefore($card, this.album.firstChild);
    this._fillCard(
      $name,
      $image,
      $description,
      id,
      $seriesList,
      $comicsList,
      $eventsList
    );
    return $card;
  }

  _fillCard(name, image, description, id,$seriesList, $comicsList, $eventsList) {
    name.innerText = this.getName();
    image.src = this.getImage();
    description.innerText = this.getDescription();
    id = this.getID();
    //LOOPING OVER SERIES/EVENT/ COMICS OBJ ARRAY AND CREATING FOR EACH LIST ELEMENT
     for (let i = 0; i<this.series.length; i++) {
      const $series = document.createElement("li");
      $series.innerText = this.series[i].name;
      $seriesList.appendChild($series);
      /* $series.style.display = "none"; */
    } 
    for (let i = 0; i<this.comics.length; i++) {
      const $comics = document.createElement("li");
      $comics.innerText = this.comics[i].name;
      $comicsList.appendChild($comics);
      /* $series.style.display = "none"; */
    } 
    for (let i = 0; i<this.events.length; i++) {
      const $events = document.createElement("li");
      $events.innerText = this.events[i].name;
      $eventsList.appendChild($events);
      /* $series.style.display = "none"; */
    } 
      
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
      series : this.series,
      events : this.events,
      comics : this.comics
    };
    return card;
  } 
}

