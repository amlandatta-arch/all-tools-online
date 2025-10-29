"""
Tool page templates and JavaScript generators
This module contains templates for generating individual tool pages
"""

import re

def generate_slug(name):
    """Convert tool name to URL-friendly slug"""
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = slug.strip('-')
    return slug

def get_tool_content(tool_name):
    """Generate tool-specific content, FAQs, and about section"""
    
    # Default content that can be customized per tool
    content = {
        'about': f"The {tool_name} is a free online tool that helps you perform calculations and conversions quickly and accurately. No installation or sign-up required - simply enter your values and get instant results.",
        'how_it_works': f"This tool uses advanced algorithms to process your input and provide accurate results. Simply fill in the required fields and click the calculate or convert button to see your results instantly.",
        'faqs': [
            {
                'q': f'Is the {tool_name} free to use?',
                'a': 'Yes, this tool is completely free to use with no hidden charges or subscription fees.'
            },
            {
                'q': 'Do I need to create an account?',
                'a': 'No, you can use this tool without creating an account or providing any personal information.'
            },
            {
                'q': 'Is my data secure?',
                'a': 'Yes, all calculations are performed locally in your browser. We do not store or transmit your data to any servers.'
            },
            {
                'q': 'Can I use this tool on mobile devices?',
                'a': 'Yes, this tool is fully responsive and works on all devices including smartphones and tablets.'
            }
        ]
    }
    
    return content

def get_tool_script(tool_name):
    """Generate tool-specific JavaScript functionality"""
    
    slug = generate_slug(tool_name)
    
    # Map tool names to their specific implementations
    tool_scripts = {
        # Calculators
        'percentage-calculator': '''
function calculatePercentage() {
    const value = parseFloat(document.getElementById('value').value);
    const total = parseFloat(document.getElementById('total').value);
    
    if (isNaN(value) || isNaN(total) || total === 0) {
        document.getElementById('result').innerHTML = '<p class="text-red-500">Please enter valid numbers</p>';
        return;
    }
    
    const percentage = (value / total) * 100;
    document.getElementById('result').innerHTML = `
        <div class="text-center">
            <div class="text-4xl font-bold text-indigo-600">${percentage.toFixed(2)}%</div>
            <p class="mt-2 text-gray-600">${value} is ${percentage.toFixed(2)}% of ${total}</p>
        </div>
    `;
}
''',
        'age-calculator': '''
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
    
    document.getElementById('result').innerHTML = `
        <div class="text-center">
            <div class="text-4xl font-bold text-indigo-600">${age} years old</div>
            <p class="mt-2 text-gray-600">Next birthday in ${daysUntilBirthday} days</p>
        </div>
    `;
}
''',
        'bmi-calculator': '''
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to m
    
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
    
    document.getElementById('result').innerHTML = `
        <div class="text-center">
            <div class="text-4xl font-bold text-indigo-600">${bmi.toFixed(1)}</div>
            <p class="mt-2 text-lg ${color} font-semibold">${category}</p>
        </div>
    `;
}
''',
        # Text Tools
        'uppercase-converter': '''
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
}
''',
        'lowercase-converter': '''
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
}
''',
        'word-counter': '''
function countWords() {
    const text = document.getElementById('input').value;
    const words = text.trim().split(/\\s+/).filter(w => w.length > 0);
    const chars = text.length;
    const charsNoSpaces = text.replace(/\\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\\n+/).filter(p => p.trim().length > 0).length;
    
    document.getElementById('result').innerHTML = `
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-3xl font-bold text-indigo-600">${words.length}</div>
                <div class="text-sm text-gray-600">Words</div>
            </div>
            <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-3xl font-bold text-indigo-600">${chars}</div>
                <div class="text-sm text-gray-600">Characters</div>
            </div>
            <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-3xl font-bold text-indigo-600">${sentences}</div>
                <div class="text-sm text-gray-600">Sentences</div>
            </div>
            <div class="text-center p-4 bg-indigo-50 rounded-lg">
                <div class="text-3xl font-bold text-indigo-600">${paragraphs}</div>
                <div class="text-sm text-gray-600">Paragraphs</div>
            </div>
        </div>
    `;
}
''',
        'password-generator': '''
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
}
''',
    }
    
    # Return specific script or generic placeholder
    return tool_scripts.get(slug, '''
function performAction() {
    // Tool-specific functionality will be implemented here
    showToast('Feature coming soon!');
}
''')

def get_tool_html_form(tool_name):
    """Generate tool-specific HTML form"""
    
    slug = generate_slug(tool_name)
    
    # Map tool names to their specific form HTML
    tool_forms = {
        'percentage-calculator': '''
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
</div>
''',
        'age-calculator': '''
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Date of Birth</label>
        <input type="date" id="dob" class="tool-input">
    </div>
    <button onclick="calculateAge()" class="tool-button w-full">Calculate Age</button>
    <div id="result" class="result-box hidden"></div>
</div>
''',
        'bmi-calculator': '''
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
</div>
''',
        'uppercase-converter': '''
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
</div>
''',
        'lowercase-converter': '''
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
</div>
''',
        'word-counter': '''
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Enter or Paste Your Text</label>
        <textarea id="input" class="tool-textarea" placeholder="Type or paste your text here..." oninput="countWords()" style="min-height: 200px;"></textarea>
    </div>
    <div id="result" class="result-box"></div>
</div>
''',
        'password-generator': '''
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
</div>
''',
    }
    
    # Return specific form or generic placeholder
    return tool_forms.get(slug, '''
<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium mb-2">Input</label>
        <textarea id="input" class="tool-textarea" placeholder="Enter your input here"></textarea>
    </div>
    <button onclick="performAction()" class="tool-button w-full">Process</button>
    <div id="result" class="result-box hidden">
        <p>Result will appear here</p>
    </div>
</div>
''')

def get_tool_template(tool_name, tool_desc, tool_icon, category_id, category_title, similar_tools):
    """Generate complete HTML page for a tool"""
    
    slug = generate_slug(tool_name)
    content = get_tool_content(tool_name)
    form_html = get_tool_html_form(tool_name)
    script_js = get_tool_script(tool_name)
    
    # Generate similar tools HTML
    similar_html = ''
    for similar in similar_tools:
        similar_name, similar_desc, similar_icon = similar
        similar_slug = generate_slug(similar_name)
        similar_html += f'''
        <a href="{similar_slug}.html" class="tool-card group block bg-white dark:bg-[#071022] border border-gray-100 dark:border-gray-800 rounded-2xl p-4 transition">
            <div class="flex items-start gap-3">
                <div class="text-2xl">{similar_icon}</div>
                <div class="flex-1">
                    <div class="font-semibold text-sm">{similar_name}</div>
                    <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">{similar_desc}</div>
                </div>
                <div class="ml-3 text-gray-300 group-hover:text-indigo-500">›</div>
            </div>
        </a>
        '''
    
    # Generate FAQs HTML
    faqs_html = ''
    for i, faq in enumerate(content['faqs']):
        faqs_html += f'''
        <div class="faq-item">
            <div class="faq-question">
                <span>{faq['q']}</span>
                <span class="faq-icon text-xl">+</span>
            </div>
            <div class="faq-answer">
                <p>{faq['a']}</p>
            </div>
        </div>
        '''
    
    # Complete HTML template
    html = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{tool_name} - Free Online Tool | AllToolsOnline</title>

  <!-- Primary SEO -->
  <meta name="description" content="{tool_desc}. Free online {tool_name.lower()} with instant results. No sign-up required." />
  <meta name="keywords" content="{tool_name.lower()}, online {tool_name.lower()}, free {tool_name.lower()}, {category_title.lower()}" />
  <meta name="author" content="AllToolsOnline" />
  <link rel="canonical" href="https://www.alltoolsonline.example/tools/{category_id}/{slug}.html" />

  <!-- JSON-LD Tool Schema -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "{tool_name}",
    "description": "{tool_desc}",
    "url": "https://www.alltoolsonline.example/tools/{category_id}/{slug}.html",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {{
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }}
  }}
  </script>

  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){{w[l]=w[l]||[];w[l].push({{'gtm.start':
  new Date().getTime(),event:'gtm.js'}});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  }})(window,document,'script','dataLayer','GTM-WJ7765FV');</script>
  <!-- End Google Tag Manager -->

  <!-- Google Analytics (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-9NLEW4JXY4"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
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
        <li><a href="../../categories.html#{category_id}" class="hover:text-indigo-600">{category_title}</a></li>
        <li>›</li>
        <li class="text-gray-900 font-medium">{tool_name}</li>
      </ol>
    </nav>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Main Tool Area -->
      <div class="lg:col-span-2">
        <!-- Tool Header -->
        <div class="mb-6">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-4xl">{tool_icon}</span>
            <h1 class="text-3xl font-bold">{tool_name}</h1>
          </div>
          <p class="text-gray-600">{tool_desc}</p>
        </div>

        <!-- Tool Interface -->
        <div class="bg-white dark:bg-[#071022] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          {form_html}
        </div>

        <!-- About Section -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">About {tool_name}</h2>
          <div class="prose max-w-none">
            <p class="text-gray-700 dark:text-gray-300 mb-4">{content['about']}</p>
            
            <h3 class="text-xl font-semibold mb-3 mt-6">How It Works</h3>
            <p class="text-gray-700 dark:text-gray-300">{content['how_it_works']}</p>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div class="bg-white dark:bg-[#071022] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            {faqs_html}
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Similar Tools -->
        <div class="bg-white dark:bg-[#071022] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-20">
          <h3 class="text-lg font-semibold mb-4">Similar Tools</h3>
          <div class="space-y-3">
            {similar_html}
          </div>
          <a href="../../categories.html#{category_id}" class="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all {category_title} →
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
    {script_js}
    
    // Show result box when there's content
    document.addEventListener('DOMContentLoaded', function() {{
      const resultBox = document.getElementById('result');
      if (resultBox) {{
        const observer = new MutationObserver(function(mutations) {{
          if (resultBox.innerHTML.trim() !== '') {{
            resultBox.classList.remove('hidden');
          }}
        }});
        observer.observe(resultBox, {{ childList: true, subtree: true }});
      }}
    }});
  </script>
</body>
</html>
'''
    
    return html
