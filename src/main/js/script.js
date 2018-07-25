"use strict";

import config from "./config.js";

// Model
const model = {
  events: [],
  keyEventMinutes: [],
  keyEvents: [],
  events: []
};

// View
const view = {
  renderKeyEvent: (type, event, minute, player) => {
    const p = document.createElement('p');
    const img = document.createElement('img');
    const span = document.createElement('span');
    img.src = `images/icons/${type}.svg`;
    img.className = 'mr-2';
    img.height = '16';
    img.width = '16';
    p.appendChild(img);
    span.textContent = `${event} '${minute} - ${player}`;
    span.id = minute;
    p.appendChild(span);
    const elm = document.getElementById('keyEvents');
    elm.appendChild(p);
  },
  createEvent: (minute, type, text) => {
    const row = document.createElement('div');
    row.className = 'row live';
    row.id = `commentary-${minute}`
    const col1 = document.createElement('div');
    col1.className = 'col-1';
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.textContent = minute;
    col1.appendChild(circle);
    const col2 = document.createElement('div');
    col2.className = 'col-1';
    const img = document.createElement('img');
    img.className = 'mt-1';
    img.src = `images/icons/${type}.svg`;
    img.height = '16';
    img.width = '16';
    col2.appendChild(img);
    const col3 = document.createElement('div');
    col3.className = 'col-10 px-0 pt-1';
    col3.textContent = text;
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    return row;
  },
  renderEvents: () => {
    const elm = document.getElementById('events');    
    model.events[0].forEach( (event) => {
      elm.appendChild(view.createEvent(event.minute, event.type, event.text));
    })
  },
  setupEventListener: function () {
    const keyEvents = document.querySelector('#keyEvents');
    keyEvents.addEventListener('click', this.clicked)
  },
  clicked: (event) => {
    const elmClicked = event.target;
    handlers.scroll(elmClicked.id);
  }
}

// Controller
const handlers = {
  initialise: function () {
    model.keyEventMinutes = config.keyEventMinutes;
    model.keyEventMinutes.forEach( (minute) => {
      this.getKeyEvent(minute);
    } );
    this.getEvents();
    view.setupEventListener();
  },
  getEvents: () => {
    fetch(`${config.eventsUrl}`, {
      method: "GET",
      mode: "cors"
    }
  )
    .then(res => res.json())
    .then(json => {
      model.events.push(json.events);
      view.renderEvents();
    })
  },
  getKeyEvent: (minute) => {
    fetch(`${config.keyEventUrl}?minute=${minute}`, {
      method: "GET",
      mode: "cors"
    }
  )
    .then(res => res.json())
    .then(json => {
      model.keyEvents.push(json);
      view.renderKeyEvent(json.type, json.event, json.minute, json.player);
    })
  },
  scroll: function(minute) {
    $('html, body').animate({
      scrollTop: $(`#commentary-${minute}`).offset().top
    }, 1000);
    return false;
  }
}

handlers.initialise();
