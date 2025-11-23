
export interface Book {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    coverImages: {
        src: string;
        srcSet?: string;
        alt: string;
    }[];
    amazonLink: string;
    sampleLink: string;
    status: string;
    tags: string[];
}

export interface Scenario {
    id: number;
    title: string;
    context: string;
    prompt: string;
}

export interface SneakPeek {
    title: string;
    excerpt: string;
    chapter: string;
}

export interface ChatMessage {
    role: 'user' | 'char';
    text: string;
    status?: 'sent' | 'delivered' | 'read';
    timestamp?: number;
}

export interface Subscriber {
    id: string;
    email: string;
    timestamp: any;
}