/**
 * Enum representing different types of input fields
 * Used for form generation, validation, and display formatting
 */
export enum InputType {
    // Basic input types
    TEXT = 'text',
    NUMBER = 'number',
    EMAIL = 'email',
    PASSWORD = 'password',
    SEARCH = 'search',
    URL = 'url',
    TEL = 'tel',

    // Rich text types
    TEXTAREA = 'textarea',
    RICH_TEXT = 'richText',
    MARKDOWN = 'markdown',

    // Selection types
    SELECT = 'select',
    MULTI_SELECT = 'multiSelect',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    SWITCH = 'switch',

    // Date and time types
    DATE = 'date',
    TIME = 'time',
    DATETIME = 'datetime',
    DATE_RANGE = 'dateRange',

    // File types
    FILE = 'file',
    IMAGE = 'image',
    MULTI_FILE = 'multiFile',

    // Special types
    COLOR = 'color',
    SLIDER = 'slider',
    RANGE = 'range',
    RATING = 'rating',
    AUTOCOMPLETE = 'autocomplete',

    // Complex types
    ADDRESS = 'address',
    PHONE = 'phone',
    MONEY = 'money',
    PERCENTAGE = 'percentage',

    // Hidden or computed
    HIDDEN = 'hidden',
    COMPUTED = 'computed',

    // Read-only display
    DISPLAY = 'display',
    CODE = 'code',

    // Custom types
    CUSTOM = 'custom'
};
