# InvoGen 📝💻

Welcome to **InvoGen**, an open-source tool for generating professional PDF quotes. This tool offers customizable themes, multilingual support, and easy-to-use CLI (Command Line Interface) for creating personalized invoices or quotes.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Themes](#themes)
- [Languages](#languages)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **CLI-based Input**: Simple and interactive command line input for user-friendly experience.
- **Multilingual Support**: Create PDF quotes in different languages (currently supports English and French).
- **Custom Themes**: Easily switch between different themes to personalize the appearance of your quotes.
- **Open-source**: Fully customizable, contribute and modify as per your needs.

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/YuketsuSh/InvoGen.git
   ```

2. Navigate to the project directory:

   ```bash
   cd invogen
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

---

## Usage

1. **Start the CLI:**

   To start creating your quote, run the following command:

   ```bash
   node src/cli.js
   ```

2. **Follow the prompts**:
   - Enter your company details, client information, project details, and choose a theme and language.
   - The PDF will be generated in the project directory as `generated_invoice.pdf`.

---

## Themes

You can customize the look of your PDF by selecting different themes. Themes are defined as JSON files in the `themes/` directory. By default, the project includes:

- **Classic**: A simple and clean layout with classic font and colors.
- **Modern**: A sleek and modern design with bold colors and fonts.

You can create your own themes by adding a new JSON file in the `themes/` folder. Simply copy one of the existing themes and modify the values like font, colors, and margins.

Example of a theme JSON file:

```json
{
  "fontFamily": "NotoSans",
  "fontSize": 14,
  "titleFontSize": 18,
  "textColor": [50, 50, 50],
  "titleColor": [0, 128, 128],
  "margin": {
    "top": 40,
    "bottom": 40,
    "left": 40,
    "right": 40
  }
}
```

---

## Languages

**InvoGen** supports multiple languages for the text displayed in the PDF. You can switch between languages by choosing during the CLI prompt.

Currently supported languages:
- **English** (en)
- **French** (fr)

You can add support for more languages by adding a new JSON file in the `langs/` folder. Example of a language file:

```json
{
   "companyInfoTitle": "Company Information",
   "clientInfoTitle": "Client Information",
   "projectDetailsTitle": "Project Details",
   "itemsServices": "Items/Services",
   "qty": "Quantity",
   "unitPrice": "Unit Price",
   "total": "Total",
   "address": "Address",
   "company": "Company",
   "email": "Email",
   "phone": "Phone",
   "totalAmount": "Total Amount",
   "siret": "Business Registration Number",
   "ape": "Industry Code",
   "totalPrice": "Total Price"
}

```

---

## Contributing

Contributions are welcome! If you want to improve the project, add features, or fix bugs, feel free to create a pull request or open an issue.

To contribute:
1. Fork the repository.
2. Create a new branch with your feature or bug fix.
3. Submit a pull request with a clear description of the changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
