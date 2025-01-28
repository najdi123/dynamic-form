export interface Form {
    id: string;
    name: string;
    elements: Element[];
}

export interface Element {
    id: string;
    type: 'text' | 'checkbox';
    label: string;
    isRequired?: boolean;
    choices?: Choice[];
}

export interface Choice {
    id: string;
    name: string;
}

export interface Condition<T> {
    targetElementId: string;
    valueToMatch: T;
}