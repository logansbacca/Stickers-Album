

export class Card {
  constructor(data, album, image, series, events, comics,uniqueID) {
    this.data = data;
    this.album = album;
    this.image = image;
    this.series = series.sort((a, b) => a.name.length - b.name.length);
    this.events = events.sort((a, b) => a.name.length - b.name.length);
    this.comics = comics.sort((a, b) => a.name.length - b.name.length);
    this.uniqueID = uniqueID;
  }
 
  createCard() {
    const $card = document.createElement("div");
    $card.dataset.id = this.uniqueID;
    const $exchange = document.createElement("i");
    $exchange.classList.add("fa-solid", "fa-right-left", "fa-xl");
    $exchange.style.color = "#43b5cb";
    $exchange.style.margin = "20px";
    $exchange.onmouseover = function () {
      this.style.color = "grey";
    };
    $exchange.onmouseout= function () {
      this.style.color = "#43b5cb";
    };


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
    $card.appendChild($name);
    $card.appendChild($exchange);
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
      $exchange,
      $image,
      $description,
      $seriesList,
      $comicsList,
      $eventsList
    );
    return $card;
  }

  _fillCard(
    name,
    exchange,
    image,
    description,
    $seriesList,
    $comicsList,
    $eventsList
  ) {
    
    name.innerText = this.getName();
    exchange.setAttribute("src", "../assets/scambio.png");
    exchange.style.height = "20px";
    exchange.style.width = "20px";
    image.src = this.getImage();
    description.innerText = this.getDescription();
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
      identification: this.getID(),
      uniqueID : this.uniqueID,
      series: this.series,
      events: this.events,
      comics: this.comics,
      satus: "default"
    };
    return card;
  }
  
}
