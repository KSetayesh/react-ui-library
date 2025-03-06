import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js';

enum PrismLang {
    JavaScript = 'javascript',
    TypeScript = 'typescript',
    JSX = 'jsx',
    TSX = 'tsx',
    HTML = 'html',
    CSS = 'css',
    SCSS = 'scss',
    JSON = 'json',
    Python = 'python',
    Bash = 'bash',
    Java = 'java',
    C = 'c',
    CPP = 'cpp',
}

const langMap: Record<string, PrismLang> = {
    js: PrismLang.JavaScript,
    ts: PrismLang.TypeScript,
    jsx: PrismLang.JSX,
    tsx: PrismLang.TSX,
    html: PrismLang.HTML,
    css: PrismLang.CSS,
    scss: PrismLang.SCSS,
    json: PrismLang.JSON,
    py: PrismLang.Python,
    python: PrismLang.Python,
    bash: PrismLang.Bash,
    sh: PrismLang.Bash,
    java: PrismLang.Java,
    c: PrismLang.C,
    cpp: PrismLang.CPP,
};

export { PrismLang, langMap };

export interface CodeHighlighterProps {
    code: string;
    language: string;
    showLineNumbers?: boolean;
    className?: string;
    maxHeight?: string;
    maxWidth?: string;
    showCopyButton?: boolean;
    editable?: boolean;
    onCodeChange?: (newCode: string) => void;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
    code,
    language,
    showLineNumbers = true,
    className = '',
    maxHeight = '1500px',
    maxWidth = '800px',
    showCopyButton = true,
    editable = false,
    onCodeChange,
}) => {
    const [copied, setCopied] = useState(false);
    const [internalCode, setInternalCode] = useState(code);

    useEffect(() => {
        setInternalCode(code);
    }, [code]);

    useEffect(() => {
        if (!editable) {
            Prism.highlightAll();
        }
    }, [internalCode, language, editable]);

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        setInternalCode(newCode);
        onCodeChange && onCodeChange(newCode);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(internalCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Normalize language for Prism
    const normalizeLanguage = (lang: string): string => {
        return langMap[lang.toLowerCase()] || lang.toLowerCase();
    };

    return (
        <div
            className={`code-highlighter-container ${className}`}
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: maxWidth
            }}
        >
            {showCopyButton && (
                <button
                    onClick={copyToClipboard}
                    className="copy-button"
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(30, 30, 30, 0.8)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        color: 'white',
                        fontSize: '12px',
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            )}

            {editable ? (
                <textarea
                    value={internalCode}
                    onChange={handleCodeChange}
                    className={`editable-code ${className}`}
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        height: maxHeight,
                        padding: '16px',
                        margin: 0,
                        borderRadius: '6px',
                        backgroundColor: '#282c34',
                        color: '#abb2bf',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        border: 'none',
                        resize: 'vertical',
                        outline: 'none',
                        overflowY: 'auto',
                    }}
                />
            ) : (
                <pre
                    className={showLineNumbers ? 'line-numbers' : ''}
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight,
                        overflow: 'auto',
                        margin: 0,
                        borderRadius: '6px',
                        padding: '16px',
                        backgroundColor: '#282c34',
                    }}
                >
                    <code className={`language-${normalizeLanguage(language)}`}>
                        {internalCode}
                    </code>
                </pre>
            )}
        </div>
    );
};

export default CodeHighlighter;