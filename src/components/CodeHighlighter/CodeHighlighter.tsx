import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    styled
} from '@mui/material';
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

// Styled components
const CodeContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
}));

const CopyButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 10,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(50, 50, 50, 0.8)',
    },
}));

const CodeTextarea = styled('textarea')(({ theme }) => ({
    width: '100%',
    maxWidth: '100%',
    padding: theme.spacing(2),
    margin: 0,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#282c34',
    color: '#abb2bf',
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: 1.5,
    border: 'none',
    resize: 'vertical',
    outline: 'none',
    overflowY: 'auto',
}));

const CodePre = styled('pre')(({ theme }) => ({
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    overflow: 'auto',
    margin: 0,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    backgroundColor: '#282c34',
}));

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
        <CodeContainer
            className={`code-highlighter-container ${className}`}
            sx={{ maxWidth }}
        >
            {showCopyButton && (
                <CopyButton
                    onClick={copyToClipboard}
                    className="copy-button"
                    size="small"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </CopyButton>
            )}

            {editable ? (
                <CodeTextarea
                    value={internalCode}
                    onChange={handleCodeChange}
                    className={`editable-code ${className}`}
                    sx={{
                        maxHeight,
                        height: maxHeight
                    }}
                />
            ) : (
                <CodePre
                    className={showLineNumbers ? 'line-numbers' : ''}
                    sx={{
                        maxHeight,
                    }}
                >
                    <code className={`language-${normalizeLanguage(language)}`}>
                        {internalCode}
                    </code>
                </CodePre>
            )}
        </CodeContainer>
    );
};

export default CodeHighlighter;