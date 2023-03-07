export class Card {
  constructor(data, album, image, series, events, comics) {
    this.data = data;
    this.album = album;
    this.image = image;
    this.series = series.sort((a, b) => a.name.length - b.name.length);
    this.events = events.sort((a, b) => a.name.length - b.name.length);
    this.comics = comics.sort((a, b) => a.name.length - b.name.length);
  }

  createCard() {
    const $card = document.createElement("div");
    const $name = document.createElement("h1");
    const $descriptionDescription = document.createElement("h2");
    $descriptionDescription.setAttribute("id", "description");
    const $description = document.createElement("p");
    const $image = document.createElement("img");
    const $seriesTitle = document.createElement("h2");
    $seriesTitle.setAttribute("id", "seriesTitle");
    const $seriesList = document.createElement("ul");
    $seriesList.setAttribute("id", "seriesList");
    const $eventsTitle = document.createElement("h2");
    $eventsTitle.setAttribute("id", "eventsTitle");
    const $eventsList = document.createElement("ul");
    $eventsList.setAttribute("id", "eventsList");
    const $comicsTitle = document.createElement("h2");
    $comicsTitle.setAttribute("id", "comicsTitle");
    const $comicsList = document.createElement("ul");
    $comicsList.setAttribute("id", "comicsList");
    const id = "";
    $card.appendChild($name);
    $card.appendChild($image);
    $card.appendChild($descriptionDescription);
    $card.appendChild($description);
    $card.appendChild($seriesTitle);
    $card.appendChild($seriesList);
    $card.appendChild($eventsTitle);
    $card.appendChild($eventsList);
    $card.appendChild($comicsTitle);
    $card.appendChild($comicsList);
    $card.classList.add("card");
    $comicsList.style.display = "none";
    $eventsList.style.display = "none";
    $seriesList.style.display = "none";
    $descriptionDescription.innerText = "Description";
    $descriptionDescription.style.display = "none";
    $comicsTitle.innerText = "Comics";
    $eventsTitle.innerText = "Events";
    $seriesTitle.innerText = "Series";
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

  _fillCard(
    name,
    image,
    description,
    id,
    $seriesList,
    $comicsList,
    $eventsList
  ) {
    name.innerText = this.getName();
    image.src = this.getImage();
    description.innerText = this.getDescription();
    id = this.getID();
    //LOOPING OVER SERIES/EVENT/ COMICS OBJ ARRAY AND CREATING FOR EACH LIST ELEMENT
    for (let i = 0; i < this.series.length; i++) {
      const $series = document.createElement("li");
      $series.innerText = this.series[i].name;
      $seriesList.appendChild($series);
    }
    for (let i = 0; i < this.comics.length; i++) {
      const $comics = document.createElement("li");
      $comics.innerText = this.comics[i].name;
      $comicsList.appendChild($comics);
    }
    for (let i = 0; i < this.events.length; i++) {
      const $events = document.createElement("li");
      $events.innerText = this.events[i].name;
      $eventsList.appendChild($events);
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
      series: this.series,
      events: this.events,
      comics: this.comics,
    };
    return card;
  }
}
