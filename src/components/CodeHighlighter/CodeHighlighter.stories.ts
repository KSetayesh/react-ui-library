import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CodeHighlighterComponent, { CodeHighlighterProps, PrismLang } from './CodeHighlighter';

// Create a wrapper component that manages its own state
const CodeHighlighterWithState = (args: CodeHighlighterProps) => {
    const [copied, setCopied] = useState(false);
    const [code, setCode] = useState(args.code);

    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(code);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
        if (args.onCodeChange) {
            args.onCodeChange(newCode);
        }
    };

    // Return a regular JavaScript object instead of JSX directly
    const props = {
        ...args,
        code,
        copied,
        handleCopy,
        onCodeChange: handleCodeChange
    };

    // Render the component with the modified props
    return React.createElement(CodeHighlighterComponent, props);
};

// Code examples for different languages
const codeExamples = {
    typescript: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function fetchUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    });
}`,

    javascript: `function sumArray(arr) {
  // Input validation
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }
  
  // Using reduce to sum all values in the array
  return arr.reduce((sum, current) => {
    // Check if the current element is a number
    if (typeof current !== 'number' || isNaN(current)) {
      throw new TypeError('All elements in the array must be numbers');
    }
    
    return sum + current;
  }, 0);
}`,

    jsx: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;`,

    python: `def fibonacci(n):
    """
    Calculate the nth Fibonacci number using dynamic programming.
    """
    if n <= 0:
        return 0
    elif n == 1:
        return 1
        
    # Initialize array to store Fibonacci numbers
    fib = [0] * (n + 1)
    fib[1] = 1
    
    # Calculate each Fibonacci number
    for i in range(2, n + 1):
        fib[i] = fib[i-1] + fib[i-2]
        
    return fib[n]

# Test with first 10 Fibonacci numbers
for i in range(10):
    print(f"Fibonacci({i}) = {fibonacci(i)}")`,

    bash: `#!/bin/bash

# Simple script to back up a directory
SOURCE_DIR="$1"
BACKUP_DIR="$2"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

if [ -z "$SOURCE_DIR" ] || [ -z "$BACKUP_DIR" ]; then
  echo "Usage: $0 <source_directory> <backup_directory>"
  exit 1
fi

# Create backup filename
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

# Create the backup
tar -czf "$BACKUP_FILE" "$SOURCE_DIR"

echo "Backup created: $BACKUP_FILE"`,

    json: `{
  "name": "code-highlighter",
  "version": "1.0.0",
  "description": "A syntax highlighter component for React",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "prismjs": "^1.29.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`
};

const meta = {
    title: 'Components/CodeHighlighter',
    component: CodeHighlighterWithState,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: 'Code Syntax Highlighter Component',
        layout: 'centered',
        docs: {
            description: {
                component: 'A Prism.js based code syntax highlighter component with support for multiple programming languages and customization options.'
            }
        }
    },
    argTypes: {
        code: {
            control: 'text',
            description: 'The code string to be highlighted',
            table: {
                type: { summary: 'string' },
            }
        },
        language: {
            control: 'select',
            options: Object.values(PrismLang),
            description: 'Programming language of the code',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: PrismLang.JavaScript },
            }
        },
        showLineNumbers: {
            control: 'boolean',
            description: 'Whether to display line numbers',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            }
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            }
        },
        maxHeight: {
            control: 'text',
            description: 'Maximum height of the code block before scrolling',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '500px' },
            }
        },
        maxWidth: {
            control: 'text',
            description: 'Maximum width of the code block',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '800px' },
            }
        },
        showCopyButton: {
            control: 'boolean',
            description: 'Whether to display the copy button',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            }
        },
        editable: {
            control: 'boolean',
            description: 'Whether the code block should be editable',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            }
        },
        onCodeChange: {
            action: 'codeChanged',
            description: 'Function called when the code is edited (only when editable is true)'
        },
    },
} as Meta<typeof CodeHighlighterComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic code highlighter with default settings
export const Default: Story = {
    args: {
        code: codeExamples.typescript,
        language: PrismLang.TypeScript,
    },
    parameters: {
        docs: {
            storyDescription: 'Basic code highlighter with TypeScript example',
        }
    },
};

// JavaScript example
export const JavaScript: Story = {
    args: {
        code: `function calculateTotal(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

const cart = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 15 },
  { id: 3, name: 'Product 3', price: 20 }
];

console.log(\`Total: $\${calculateTotal(cart)}\`);`,
        language: PrismLang.JavaScript,
        showLineNumbers: true,
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with JavaScript example',
        }
    },
};

// JSX example
export const ReactJSX: Story = {
    args: {
        code: codeExamples.jsx,
        language: PrismLang.JSX,
        showLineNumbers: true,
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with React JSX example',
        }
    },
};

// Python example
export const Python: Story = {
    args: {
        code: codeExamples.python,
        language: PrismLang.Python,
        showLineNumbers: true,
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with Python example',
        }
    },
};

// Bash example
export const Bash: Story = {
    args: {
        code: codeExamples.bash,
        language: PrismLang.Bash,
        showLineNumbers: true,
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with Bash script example',
        }
    },
};

// JSON example
export const JSON: Story = {
    args: {
        code: codeExamples.json,
        language: PrismLang.JSON,
        showLineNumbers: true,
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with JSON example',
        }
    },
};

// Without line numbers
export const WithoutLineNumbers: Story = {
    args: {
        code: codeExamples.typescript,
        language: PrismLang.TypeScript,
        showLineNumbers: false,
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter without line numbers',
        }
    },
};

// Without copy button
export const WithoutCopyButton: Story = {
    args: {
        code: codeExamples.typescript,
        language: PrismLang.TypeScript,
        showCopyButton: false,
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter without the copy button',
        }
    },
};

// With limited height (shorter than default)
export const LimitedHeight: Story = {
    args: {
        code: codeExamples.python,
        language: PrismLang.Python,
        maxHeight: '200px',
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with limited height to demonstrate scrolling',
        }
    },
};

// With custom class name
export const CustomClassName: Story = {
    args: {
        code: codeExamples.typescript,
        language: PrismLang.TypeScript,
        className: 'custom-highlighter',
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with a custom CSS class name applied',
        }
    },
};

// Editable code
export const Editable: Story = {
    args: {
        code: codeExamples.typescript,
        language: PrismLang.TypeScript,
        editable: true,
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter in editable mode where users can modify the code',
        }
    },
};

// Editable with custom width and height
export const EditableCustomSize: Story = {
    args: {
        code: codeExamples.javascript,
        language: PrismLang.JavaScript,
        editable: true,
        maxWidth: '1000px',
        maxHeight: '400px',
    },
    parameters: {
        docs: {
            storyDescription: 'Editable code highlighter with custom width and height',
        }
    },
};

// Wider code display
export const WiderDisplay: Story = {
    args: {
        code: codeExamples.json,
        language: PrismLang.JSON,
        maxWidth: '1200px',
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with a wider display area',
        }
    },
};

// Long code example to demonstrate scrolling
export const LongCode: Story = {
    args: {
        code: `${codeExamples.typescript}\n\n${codeExamples.jsx}\n\n${codeExamples.python}`,
        language: PrismLang.TypeScript,
        maxHeight: '300px',
    },
    parameters: {
        docs: {
            storyDescription: 'Code highlighter with a long code example to demonstrate scrolling behavior',
        }
    },
};