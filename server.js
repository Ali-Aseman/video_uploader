const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// تنظیمات برای استفاده از فایل‌های استاتیک (CSS و ویدئوها)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));  // دسترسی به فیلم‌ها

// رندر کردن صفحه اصلی که فیلم‌ها رو از پوشه `videos` می‌خونه
app.get('/', (req, res) => {
  const videoFolder = path.join(__dirname, 'videos');
  fs.readdir(videoFolder, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading video files');
    }
    
    // فقط فیلم‌هایی که پسوند mp4 دارند را می‌گیریم
    const videoFiles = files.filter(file => file.endsWith('.mp4'));
    
    res.render('index', { videos: videoFiles });
  });
});

// تنظیمات سرور
app.set('view engine', 'ejs');  // اگر از EJS برای قالب‌بندی استفاده می‌کنید

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
