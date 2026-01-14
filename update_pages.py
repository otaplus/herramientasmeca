import os
import re

directory = r"C:\Users\Win10Ltsc\Downloads\herramientasmeca-main\herramientasmeca-main"
button_html = """
<div style="margin: 10px 0;">
    <a href="index.html" style="display: inline-flex; align-items: center; text-decoration: none; color: #333; font-weight: 500; font-family: 'Roboto', sans-serif;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 8px;">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        Volver al Inicio
    </a>
</div>
"""

count = 0

for filename in os.listdir(directory):
    if filename.endswith(".html") and filename != "index.html":
        filepath = os.path.join(directory, filename)
        
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Check if button acts already exist (simple check)
        if "Volver al Inicio" in content:
            print(f"Skipping {filename}, already has back button.")
            continue

        # Try to insert before <h1>
        if "<h1>" in content:
            new_content = content.replace("<h1>", button_html + "<h1>", 1)
            print(f"Inserted before <h1> in {filename}")
        # If no h1, try to insert after <div class="container">
        elif '<div class="container">' in content:
            new_content = content.replace('<div class="container">', '<div class="container">' + button_html, 1)
            print(f"Inserted after container in {filename}")
        # Fallback: Insert after <body>
        else:
            new_content = re.sub(r'(<body[^>]*>)', r'\1' + button_html, content, 1)
            print(f"Inserted after body in {filename}")

        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
        else:
            print(f"Could not find insertion point for {filename}")

print(f"Updated {count} files.")
