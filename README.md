# AllToolsOnline - 200+ Free Online Tools & Calculators

A comprehensive collection of free online tools and calculators across multiple categories. No sign-ups required, fast, and completely free to use.

## 🚀 Features

- **200+ Tools** across 10 categories
- **100% Free** - No hidden charges or premium tiers
- **No Sign-Up Required** - Use any tool instantly
- **Privacy First** - Most tools run entirely in your browser
- **Mobile Friendly** - Fully responsive design
- **SEO Optimized** - Proper meta tags and structured data
- **Analytics Integrated** - Google Analytics & GTM ready

## 📁 Project Structure

```
AllToolsOnline/
├── index.html                 # Homepage with all categories
├── about.html                 # About page
├── contact.html               # Contact page
├── categories.html            # All categories page
├── privacy.html               # Privacy policy
├── terms.html                 # Terms of service
├── assets/
│   ├── css/
│   │   └── common.css        # Shared styles
│   └── js/
│       ├── common.js         # Shared JavaScript (header/footer)
│       └── tools-data.js     # Tools data structure
├── tools/
│   ├── calculators/          # 30 calculator tools
│   ├── text-tools/           # 30 text manipulation tools
│   ├── developer-tools/      # 25 developer utilities
│   ├── design-tools/         # 20 design utilities
│   ├── file-tools/           # 15 file conversion tools
│   ├── utility-tools/        # 25 everyday utilities
│   ├── seo-tools/            # 15 SEO tools
│   ├── education-tools/      # 20 educational tools
│   ├── fun-tools/            # 15 entertainment tools
│   └── misc-tools/           # 15 miscellaneous tools
├── generate-tools.js         # Node.js script to generate tool pages
└── README.md                 # This file
```

## 🛠️ Tool Categories

### 1. Calculators (30 tools)
- Percentage Calculator
- Age Calculator
- BMI Calculator
- Loan EMI Calculator
- And 26 more...

### 2. Text & Writing Tools (30 tools)
- Uppercase/Lowercase Converter
- Word Counter
- Character Counter
- JSON Formatter
- And 26 more...

### 3. Developer Tools (25 tools)
- Password Generator
- HTML/CSS/JS Minifier
- Regex Tester
- Color Picker
- And 21 more...

### 4. Design & Visual Tools (20 tools)
- Gradient Generator
- Color Contrast Checker
- Image Resizer
- And 17 more...

### 5. File & Conversion Tools (15 tools)
- Image to Base64 Converter
- PDF to Text Extractor
- CSV Viewer
- And 12 more...

### 6. Utility Tools (25 tools)
- Stopwatch
- Timer
- Random Number Generator
- And 22 more...

### 7. SEO & Content Tools (15 tools)
- Keyword Density Checker
- Meta Description Counter
- Slug Generator
- And 12 more...

### 8. Education & Learning Tools (20 tools)
- GPA Calculator
- Typing Test
- Flashcard Maker
- And 17 more...

### 9. Fun & Entertainment Tools (15 tools)
- Random Joke Generator
- Love Percentage Calculator
- Fortune Cookie Generator
- And 12 more...

### 10. Misc / Advanced Tools (15 tools)
- UUID Generator
- Hash Generator
- Diff Checker
- And 12 more...

## 🔧 Setup & Deployment

### Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process required - it's all static HTML/CSS/JS

### Hosting

This is a static website and can be hosted on:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload all files to your hosting provider.

## 📊 Analytics Setup

The website is pre-configured with:

- **Google Analytics ID**: `G-9NLEW4JXY4`
- **Google Tag Manager ID**: `GTM-WJ7765FV`

Both tracking codes are included in:
- All tool pages
- All static pages (About, Contact, etc.)
- Homepage

## 🎨 Customization

### Changing Colors

Edit `assets/css/common.css` to modify the color scheme:

```css
:root { 
  --bg: #f7fafc; 
  --card: #ffffff; 
  --muted: #6b7280; 
}
```

### Adding New Tools

1. Create a new HTML file in the appropriate category folder under `tools/`
2. Use existing tool pages as templates
3. Update `assets/js/tools-data.js` to include the new tool in the category list

### Regenerating All Tool Pages

If you need to regenerate all tool pages (requires Node.js):

```bash
node generate-tools.js
```

## 🔐 Privacy & Security

- Most tools run entirely in the browser
- No data is sent to external servers
- User inputs are processed locally
- See `privacy.html` for full privacy policy

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Suggestions and feedback are welcome! Contact us through the contact form on the website.

## 📄 License

All rights reserved © 2024 AllToolsOnline

## 📧 Contact

- Email: support@alltoolsonline.example
- Website: https://www.alltoolsonline.example

---

**Built with ❤️ by AllToolsOnline**
