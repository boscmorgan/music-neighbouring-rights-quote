### Project Structure
```
music-neighbouring-rights/
│
├── index.html
├── styles.css
└── script.js
```

### 1. `index.html`
This is the main HTML file that will structure your web application.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Neighbouring Rights Agency Quotes</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Music Neighbouring Rights Agency</h1>
            <p>Your source for music rights information</p>
        </header>
        <main>
            <button id="quoteButton">Get a Quote</button>
            <div id="quoteDisplay" class="quote-display"></div>
        </main>
        <footer>
            <p>&copy; 2023 Music Neighbouring Rights Agency</p>
        </footer>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 2. `styles.css`
This CSS file will style your web application to give it a clean and modern look.

```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 20px;
}

h1 {
    font-size: 2.5em;
    color: #007BFF;
}

p {
    font-size: 1.2em;
}

main {
    text-align: center;
}

button {
    padding: 10px 20px;
    font-size: 1.2em;
    color: #fff;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.quote-display {
    margin-top: 20px;
    font-size: 1.5em;
    font-style: italic;
    color: #555;
}

footer {
    text-align: center;
    margin-top: 20px;
    font-size: 0.9em;
}
```

### 3. `script.js`
This JavaScript file will handle the functionality of fetching and displaying quotes.

```javascript
document.getElementById('quoteButton').addEventListener('click', function() {
    // Simulated quote fetching
    const quotes = [
        "Music is the shorthand of emotion.",
        "Without music, life would be a mistake.",
        "The music is not in the notes, but in the silence between.",
        "Where words fail, music speaks.",
        "Music can change the world because it can change people."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteDisplay').innerText = randomQuote;
});
```

### How to Run the Application
1. Create a folder named `music-neighbouring-rights`.
2. Inside this folder, create three files: `index.html`, `styles.css`, and `script.js`.
3. Copy the respective code snippets into each file.
4. Open `index.html` in a web browser.

### Additional Notes
- This application currently simulates fetching quotes from the Music Neighbouring Rights Agency by using a predefined array of quotes. You can replace this with an actual API call if the agency provides one.
- The design is responsive and should look good on both desktop and mobile devices.
- You can further enhance the application by adding more features, such as a search function, user-submitted quotes, or integrating with a backend service for dynamic content.