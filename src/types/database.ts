export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Appointment {
    id: string;
    created_at: string;
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
    service: string;
    message?: string;
    status: AppointmentStatus;
    lang: 'fr' | 'ar';
    ip_hash?: string;
    user_agent?: string;
}

export interface AppointmentInsert {
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
    service: string;
    message?: string;
    lang: 'fr' | 'ar';
    ip_hash?: string;
    user_agent?: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export interface SkinAdvisorSession {
    id: string;
    created_at: string;
    session_id: string;
    lang: 'fr' | 'ar';
    messages: ChatMessage[];
    skin_type?: string;
    main_concern?: string;
    total_messages: number;
    last_message_at: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: Record<string, string>;
}
