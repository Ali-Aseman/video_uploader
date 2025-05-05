const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/videos', express.static(path.join(__dirname, 'videos'))); 

app.get('/', (req, res) => {
  const videoFolder = path.join(__dirname, 'videos');
  fs.readdir(videoFolder, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading video files');
    }
    
    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    
    res.render('index', { videos: videoFiles });
  });
});

app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
