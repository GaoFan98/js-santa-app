export interface Message {
    childId: string;
    message: string;
    childName: string;
    childAddress: string;
}

export interface ValidationResult {
    isValid: boolean;
    error?: string;
    childName?: string;
    childAddress?: string;
}

export interface EmailData {
    from: string;
    to: string;
    subject: string;
    text: string;
}
