const express = require('express');
const app = express();

app.get('/key-event', (req, res) => {
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
