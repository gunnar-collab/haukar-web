import os
import re

directory = "/home/ylmur/Agency_OS_2026/03_IT_and_Infrastructure/haukar-web/src"

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith((".jsx", ".js", ".tsx", ".ts")):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace heavy rounded corners with rounded-sm
            new_content = re.sub(r'rounded-\[2\.5rem\]', 'rounded-sm', content)
            new_content = re.sub(r'rounded-3xl', 'rounded-sm', new_content)
            new_content = re.sub(r'rounded-2xl', 'rounded-sm', new_content)
            # We don't replace rounded-full because those are usually buttons, avatars, or decorative elements.
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
