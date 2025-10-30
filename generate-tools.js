const fs = require('fs');
const path = require('path');

// Generate slug from tool name
function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Tool categories data
const categories = [
  {
    id: 'calculators',
    title: 'Calculators',
    tools: [
      ['Percentage Calculator','Quick percent calculations','%'],
      ['Age Calculator','Calculate exact age from DOB','🎂'],
      ['BMI Calculator','Body Mass Index calculator','⚖️'],
      ['Loan EMI Calculator','Monthly EMI estimates','🏦'],
      ['Simple Interest Calculator','Simple interest on principal','📈'],
      ['Compound Interest Calculator','Compound interest estimates','🔁'],
      ['Discount Calculator','Calculate discounts easily','💸'],
      ['Tip Calculator','Split tips and bills','🍽️'],
      ['GST Calculator','GST tax calculations','🧾'],
      ['Unit Converter','Length/weight/volume units','🔧']
    ]
  },
  {
    id: 'text-tools',
    title: 'Text & Writing Tools',
    tools: [
      ['Uppercase Converter','Convert text to UPPERCASE','🔠'],
      ['Lowercase Converter','Convert text to lowercase','🔡'],
      ['Word Counter','Count words in text','🔢'],
      ['Character Counter','Count characters','🔣'],
      ['Reverse Text','Reverse the characters','↩️']
    ]
  },
  {
    id: 'developer-tools',
    title: 'Developer Tools',
    tools: [
      ['Password Generator','Generate secure passwords','🔐'],
      ['JSON Formatter','Pretty-print JSON','{}'],
      ['Color Picker','Pick color values','🎨']
    ]
  }
];

// Get tool-specific JavaScript
function getToolScript(toolName) {
  const slug = generateSlug(toolName);
  
  const scripts = {
    'percentage-calculator': `
function calculatePercentage() {
    const value = parseFloat(document.getElementById('value').value);
    const total = parseFloat(document.getElementById('total').value);
    
    if (isNaN(value) || isNaN(total) || total === 0) {
        document.getElementById('result').innerHTML = '<p class="text-red-500">Please enter valid numbers</p>';
        return;
    }
    
    const percentage = (value / total) * 100;
    document.getElementById('result').innerHTML = \`
        <div class="text-center">
            <div class="text-4xl font-bold text-indigo-600">\${percentage.toFixed(2)}%</div>
            <p class="mt-2 text-gray-600">\${value} is \${percentage.toFixed(2)}% of \${total}</p>
        </div>
    \`;
}`,
    'age-calculator': `
function calculateAge() {
    const dob = document.getElementById('dob').value;
    if (!dob) {
        document.getElementById('result').innerHTML = '<p class="text-red-500">Please select your date of birth</p>';
        return;
    }
    
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    document.getElementById('result').innerHTML = \`
        <div class="text-center">
            <div class="text-4xl font-bold text-indigo-600">\${age} years old</div>
            <p class="mt-2 text-gray-600">Next birthday in \${daysUntilBirthday} days</p>
        </div>
    \`;
}`,
    'bmi-calculator': `
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById('result').innerHTML = '<p class="text-red-500">Please enter valid values</p>';
        return;
    }
    
    const bmi = weight / (height * height);
    let category = '';
    let color = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-600';
    } else if (bmi < 25) {
        category = 'Normal weight';
        color = 'text-green-600';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = 'text-yellow-600';
    } else {
        category = 'Obese';
        color = 'text-red-600';
    }
    
    document.getElementById('result').innerHTML = \`
        <div class="text-center">
            <div class="text-4xl font-bold text-indigo-600">\${bmi.toFixed(1)}</div>
            <p class="mt-2 text-lg \${color} font-semibold">\${category}</p>
        </div>
    \`;
}`,
    'uppercase-converter': `
function convertText() {
    const input = document.getElementById('input').value;
    const result = input.toUpperCase();
    document.getElementById('output').value = result;
}

function copyResult() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    showToast('Copied to clipboard!');
}`,
    'lowercase-converter': `
function convertText() {
    const input = document.getElementById('input').value;
    const result = input.toLowerCase();
    document.getElementById('output').value = result;
}

function copyResult() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    showToast('Copied to clipboard!');
}`,
    'word-counter': `
function countWords() {
    const text = document.getElementById('input').value;
    const words = text.trim().split(/\\s+/).filter(w => w.length > 0);
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\\n+/).filter(p => p.trim().length > 0).length;
    
    document.getElementById('result').innerHTML = \`
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-3xl font-bold text-indigo-600">\${words.length}</div>
                <div class="text-sm text-gray-600">Words</div>
            </div>
            <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-3xl font-bold text-indigo-600">\${chars}</div>
                <div class="text-sm text-gray-600">Characters</div>
            </div>
            <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-3xl font-bold text-indigo-600">\${sentences}</div>
                <div class="text-sm text-gray-600">Sentences</div>
            </div>
            <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-3xl font-bold text-indigo-600">\${paragraphs}</div>
                <div class="text-sm text-gray-600">Paragraphs</div>
            </div>
        </div>
    \`;
}`,
    'password-generator': `
function generatePassword() {
    const length = parseInt(document.getElementById('length').value) || 12;
    const includeUpper = document.getElementById('uppercase').checked;
    const includeLower = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    let chars = '';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (chars === '') {
        document.getElementById('result').innerHTML = '<p class="text-red-500">Please select at least one character type</p>';
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('password-output').value = password;
    document.getElementById('result').classList.remove('hidden');
}

function copyPassword() {
    const output = document.getElementById('password-output');
    output.select();
    document.execCommand('copy');
    showToast('Password copied to clipboard!');
}`
  };
  
  return scripts[slug] || `
function performAction() {
    showToast('Feature coming soon!');
}`;
}

// Get tool-specific HTML form
function getToolForm(toolName) {
  const slug = generateSlug(toolName);
  
  const forms = {
    'percentage-calculator': `
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Value</label>
        <input type="number" id="value" class="tool-input" placeholder="Enter value" step="any">
    </div>
    <div>
        <label class="block text-sm font-medium mb-2">Total</label>
        <input type="number" id="total" class="tool-input" placeholder="Enter total" step="any">
    </div>
    <button onclick="calculatePercentage()" class="tool-button w-full">Calculate Percentage</button>
    <div id="result" class="result-box hidden"></div>
</div>`,
    'age-calculator': `
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Date of Birth</label>
        <input type="date" id="dob" class="tool-input">
    </div>
    <button onclick="calculateAge()" class="tool-button w-full">Calculate Age</button>
    <div id="result" class="result-box hidden"></div>
</div>`,
    'bmi-calculator': `
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Weight (kg)</label>
        <input type="number" id="weight" class="tool-input" placeholder="Enter weight in kg" step="0.1">
    </div>
    <div>
        <label class="block text-sm font-medium mb-2">Height (cm)</label>
        <input type="number" id="height" class="tool-input" placeholder="Enter height in cm" step="0.1">
    </div>
    <button onclick="calculateBMI()" class="tool-button w-full">Calculate BMI</button>
    <div id="result" class="result-box hidden"></div>
</div>`,
    'uppercase-converter': `
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Input Text</label>
        <textarea id="input" class="tool-textarea" placeholder="Enter text to convert to uppercase"></textarea>
    </div>
    <button onclick="convertText()" class="tool-button w-full">Convert to UPPERCASE</button>
    <div>
        <label class="block text-sm font-medium mb-2">Output</label>
        <textarea id="output" class="tool-textarea" readonly></textarea>
    </div>
    <button onclick="copyResult()" class="tool-button-secondary tool-button w-full">Copy to Clipboard</button>
</div>`,
    'lowercase-converter': `
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Input Text</label>
        <textarea id="input" class="tool-textarea" placeholder="Enter text to convert to lowercase"></textarea>
    </div>
    <button onclick="convertText()" class="tool-button w-full">Convert to lowercase</button>
    <div>
        <label class="block text-sm font-medium mb-2">Output</label>
        <textarea id="output" class="tool-textarea" readonly></textarea>
    </div>
    <button onclick="copyResult()" class="tool-button-secondary tool-button w-full">Copy to Clipboard</button>
</div>`,
    'word-counter': `
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Enter or Paste Your Text</label>
        <textarea id="input" class="tool-textarea" placeholder="Type or paste your text here..." oninput="countWords()" style="min-height: 200px;"></textarea>
    </div>
    <div id="result" class="result-box"></div>
</div>`,
    'password-generator': `
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Password Length</label>
        <input type="number" id="length" class="tool-input" value="12" min="4" max="64">
    </div>
    <div class="space-y-2">
        <label class="flex items-center gap-2">
            <input type="checkbox" id="uppercase" checked class="rounded">
            <span class="text-sm">Include Uppercase Letters (A-Z)</span>
        </label>
        <label class="flex items-center gap-2">
            <input type="checkbox" id="lowercase" checked class="rounded">
            <span class="text-sm">Include Lowercase Letters (a-z)</span>
        </label>
        <label class="flex items-center gap-2">
            <input type="checkbox" id="numbers" checked class="rounded">
            <span class="text-sm">Include Numbers (0-9)</span>
        </label>
        <label class="flex items-center gap-2">
            <input type="checkbox" id="symbols" checked class="rounded">
            <span class="text-sm">Include Symbols (!@#$%^&*)</span>
        </label>
    </div>
    <button onclick="generatePassword()" class="tool-button w-full">Generate Password</button>
    <div id="result" class="result-box hidden">
        <div class="flex gap-2">
            <input type="text" id="password-output" class="tool-input flex-1" readonly>
            <button onclick="copyPassword()" class="tool-button">Copy</button>
        </div>
    </div>
</div>`
  };
  
  return forms[slug] || `
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Input</label>
        <textarea id="input" class="tool-textarea" placeholder="Enter your input here"></textarea>
    </div>
    <button onclick="performAction()" class="tool-button w-full">Process</button>
    <div id="result" class="result-box hidden">
        <p>Result will appear here</p>
    </div>
</div>`;
}

// Generate complete tool page HTML
function generateToolPage(toolName, toolDesc, toolIcon, categoryId, categoryTitle, similarTools) {
  const slug = generateSlug(toolName);
  const formHTML = getToolForm(toolName);
  const scriptJS = getToolScript(toolName);
  
  // Generate similar tools HTML
  let similarHTML = '';
  for (const [simName, simDesc, simIcon] of similarTools) {
    const simSlug = generateSlug(simName);
    similarHTML += `
        <a href="${simSlug}.html" class="tool-card group block bg-white dark:bg-[#071022] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 transition">
            <div class="flex items-start gap-3">
                <div class="text-2xl">${simIcon}</div>
                <div class="flex-1">
                    <div class="font-semibold text-sm">${simName}</div>
                    <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">${simDesc}</div>
                </div>
                <div class="ml-3 text-gray-300 group-hover:text-indigo-500">›</div>
            </div>
        </a>`;
  }
  
  const faqs = [
    { q: `Is the ${toolName} free to use?`, a: 'Yes, this tool is completely free to use with no hidden charges or subscription fees.' },
    { q: 'Do I need to create an account?', a: 'No, you can use this tool without creating an account or providing any personal information.' },
    { q: 'Is my data secure?', a: 'Yes, all calculations are performed locally in your browser. We do not store or transmit your data to any servers.' },
    { q: 'Can I use this tool on mobile devices?', a: 'Yes, this tool is fully responsive and works on all devices including smartphones and tablets.' }
  ];
  
  let faqsHTML = '';
  for (const faq of faqs) {
    faqsHTML += `
        <div class="faq-item">
            <div class="faq-question">
                <span>${faq.q}</span>
                <span class="faq-icon text-xl">+</span>
            </div>
            <div class="faq-answer">
                <p>${faq.a}</p>
            </div>
        </div>`;
  }
  
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${toolName} - Free Online Tool | AllToolsOnline</title>

  <!-- Primary SEO -->
  <meta name="description" content="${toolDesc}. Free online ${toolName.toLowerCase()} with instant results. No sign-up required." />
  <meta name="keywords" content="${toolName.toLowerCase()}, online ${toolName.toLowerCase()}, free ${toolName.toLowerCase()}, ${categoryTitle.toLowerCase()}" />
  <meta name="author" content="AllToolsOnline" />
  <link rel="canonical" href="https://www.alltoolsonline.example/tools/${categoryId}/${slug}.html" />

  <!-- JSON-LD Tool Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${toolName}",
    "description": "${toolDesc}",
    "url": "https://www.alltoolsonline.example/tools/${categoryId}/${slug}.html",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>

  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-WJ7765FV');</script>
  <!-- End Google Tag Manager -->

  <!-- Google Analytics (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-9NLEW4JXY4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-9NLEW4JXY4');
  </script>

  <!-- Tailwind (CDN) -->
  <script src="https://cdn.tailwindcss.com"></script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../../assets/css/common.css">
</head>

<body class="min-h-screen text-gray-800" data-theme="light">
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJ7765FV"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->

  <!-- HEADER -->
  <div id="header-placeholder"></div>

  <!-- MAIN CONTENT -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <nav class="text-sm mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-gray-600">
        <li><a href="../../index.html" class="hover:text-indigo-600">Home</a></li>
        <li>›</li>
        <li><a href="../../categories.html#${categoryId}" class="hover:text-indigo-600">${categoryTitle}</a></li>
        <li>›</li>
        <li class="text-gray-900 font-medium">${toolName}</li>
      </ol>
    </nav>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Main Tool Area -->
      <div class="lg:col-span-2">
        <!-- Tool Header -->
        <div class="mb-6">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-4xl">${toolIcon}</span>
            <h1 class="text-3xl font-bold">${toolName}</h1>
          </div>
          <p class="text-gray-600">${toolDesc}</p>
        </div>

        <!-- Tool Interface -->
        <div class="bg-white dark:bg-[#071022] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          ${formHTML}
        </div>

        <!-- About Section -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">About ${toolName}</h2>
          <div class="prose max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-4">The ${toolName} is a free online tool that helps you perform calculations and conversions quickly and accurately. No installation or sign-up required - simply enter your values and get instant results.</p>
            
            <h3 class="text-xl font-semibold mb-3 mt-6">How It Works</h3>
            <p class="text-gray-700 dark:text-gray-300">This tool uses advanced algorithms to process your input and provide accurate results. Simply fill in the required fields and click the calculate or convert button to see your results instantly.</p>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div class="bg-white dark:bg-[#071022] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            ${faqsHTML}
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Similar Tools -->
        <div class="bg-white dark:bg-[#071022] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-20">
          <h3 class="text-lg font-semibold mb-4">Similar Tools</h3>
          <div class="space-y-3">
            ${similarHTML}
          </div>
          <a href="../../categories.html#${categoryId}" class="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all ${categoryTitle} →
          </a>
        </div>
      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <div id="footer-placeholder"></div>

  <!-- SCRIPTS -->
  <script src="../../assets/js/common.js"></script>
  <script>
    ${scriptJS}
    
    // Show result box when there's content
    document.addEventListener('DOMContentLoaded', function() {
      const resultBox = document.getElementById('result');
      if (resultBox) {
        const observer = new MutationObserver(function(mutations) {
          if (resultBox.innerHTML.trim() !== '') {
            resultBox.classList.remove('hidden');
          }
        });
        observer.observe(resultBox, { childList: true, subtree: true });
      }
    });
  </script>
</body>
</html>`;
}

// Main execution
console.log('Generating tool pages...\n');

const toolsDir = path.join(__dirname, 'tools');
let totalCount = 0;

for (const category of categories) {
  const catDir = path.join(toolsDir, category.id);
  
  // Create category directory
  if (!fs.existsSync(catDir)) {
    fs.mkdirSync(catDir, { recursive: true });
  }
  
  for (const tool of category.tools) {
    const [toolName, toolDesc, toolIcon] = tool;
    const slug = generateSlug(toolName);
    
    // Get similar tools (same category, exclude current)
    const similarTools = category.tools.filter(t => t[0] !== toolName).slice(0, 4);
    
    // Generate HTML
    const html = generateToolPage(toolName, toolDesc, toolIcon, category.id, category.title, similarTools);
    
    // Write file
    const filePath = path.join(catDir, `${slug}.html`);
    fs.writeFileSync(filePath, html, 'utf8');
    
    totalCount++;
  }
  
  console.log(`✓ Generated ${category.tools.length} tools for ${category.title}`);
}

console.log(`\n✅ Successfully generated ${totalCount} tool pages!`);
console.log(`📁 Location: ${toolsDir}`);
