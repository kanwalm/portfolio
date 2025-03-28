# Kanwal Mukhtar - Early Childhood Educator Portfolio

A lightweight, responsive HTML/CSS portfolio website designed for Kanwal Mukhtar, an early childhood educator and English language specialist.

**[View Live Website](https://kanwalm.github.io/portfolio)**

## Features

- Clean, modern design with colors and themes suitable for early childhood education
- Fully responsive layout that works on all device sizes
- Simple HTML and CSS only - no JavaScript dependencies
- Fast loading and lightweight
- Sections for About, Experience, Education, Volunteering, Certifications, and Contact

## Setup Instructions

1. Clone or download this repository
2. Open `index.html` in your web browser to view the website
3. To modify content, edit the `index.html` file
4. To change styling, edit the `styles.css` file

## GitHub Pages Deployment

This website is automatically deployed to GitHub Pages. Any changes pushed to the main branch will trigger a new deployment.

The live website can be accessed at: [https://kanwalm.github.io/portfolio](https://kanwalm.github.io/portfolio)

## Customization

### Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` section of the CSS file:

```css
:root {
    --primary-color: #6c63ff; /* Soft purple */
    --secondary-color: #4ecdc4; /* Teal */
    --accent-color: #ff6b6b; /* Soft coral */
    --background-color: #f9f7fe; /* Very light purple */
    --text-color: #333333;
    --light-color: #ffffff;
    /* ... */
}
```

### Fonts

The website uses Google Fonts:
- 'Quicksand' for body text
- 'Varela Round' for headings

To change fonts, modify the Google Fonts link in the `<head>` section of `index.html` and update the font-family properties in `styles.css`.

### Images

The hero background uses an SVG pattern. You can replace it with an image by changing the `background` property of the `.hero` class in the CSS file.

## Contact Form Functionality

The contact form in this template is for display purposes only. To make it functional:

1. Add a form handling service like Formspree, Netlify Forms, or set up your own backend
2. Modify the `<form>` tag in the HTML to point to your form handling endpoint

## License

This project is available for personal and commercial use. 