const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  res.status(200).send(JSON.stringify({
    events: [
      {
        minute: 12,
        type: 'booking',
        text: 'Dier goes into the book in what is the first yellow card of the game'
      },
      {
        minute: 14,
        type: 'commentary',
        text: 'Kane is desparate to catch Liverpool\'s Salah in the race for the Golden Boot, but he won\'t do it like that - the England man has just hammered a wild shot from range well off target.'
      },
      {
        minute: 17,
        type: 'booking',
        text: 'Now Alli gets a booking as he checks Sterling and the visitors have a free-kick.'
      },
      {
        minute: 21,
        type: 'goal',
        text: 'AND THERE IS THE GOAL! No mistake from Kane, as - after initially missing Son\'s cross - he gets back up off the turf to cushion in Trippier\'s pinpoint cut-back.'
      },
      {
        minute: 34,
        type: 'commentary',
        text: 'Kane is desparate to catch Liverpool\'s Salah in the race for the Golden Boot, but he won\'t do it like that - the England man has just hammered a wild shot from range well off target.'
      },
      {
        minute: 42,
        type: 'commentary',
        text: 'Kane is desparate to catch Liverpool\'s Salah in the race for the Golden Boot, but he won\'t do it like that - the England man has just hammered a wild shot from range well off target.'
      },
      {
        minute: 46,
        type: 'commentary',
        text: 'Kane is desparate to catch Liverpool\'s Salah in the race for the Golden Boot, but he won\'t do it like that - the England man has just hammered a wild shot from range well off target.'
      }
    ],
  }));
});

app.get('/key-events', (req, res) => {
  const minute = Number(req.query.minute);
  if (minute === 12) {
    res.status(200).send(JSON.stringify({
      'key-event': {
        type: 'booking',
        minute: minute,
        name: 'Dier'
      }
    }));
  }
  else if (minute === 17) {
    res.status(200).send(JSON.stringify({
      'key-event': {
        type: 'booking',
        minute: minute,
        name: 'Alli'
      }
    }));
  }
  else if (minute === 21) {
    res.status(200).send(JSON.stringify({
      'key-event': {
        type: 'booking',
        minute: minute,
        name: 'Kane'
      }
    }));
  }
  else {
    res.status(403).send(JSON.stringify({
        error: 'Invalid response, should be /key-event?minute=...'
    }));
  }
});

export default app;
