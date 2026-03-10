import { ValidationResult, AppointmentInsert } from '@/types/database';

/**
 * Sanitizes generic user input string.
 * Strips out script and HTML tags, leaving standard text intact.
 */
export function sanitizeString(input?: string): string {
    if (!input) return '';
    let sanitized = input.trim();
    // Remove all HTML tags and potentially dangerous script tags
    sanitized = sanitized.replace(/<[^>]*>?/gm, '');
    return sanitized;
}

const VALID_SERVICES = [
    "Maladies de la peau et du cuir chevelu",
    "Maladies des ongles",
    "Maladies Sexuellement Transmissibles",
    "Chirurgie Cutanée",
    "Cosmétologie et Peeling",
    "Botox · Collagène · Acide Hyaluronique",
    "PRP Visage",
    "PRP Cheveux",
    "Laser Épilation et Vasculaire",
    "Dermatologue",
    "Vénérologue"
];

export function validateAppointmentInput(data: Partial<AppointmentInsert>, lang: 'fr' | 'ar'): ValidationResult {
    const errors: Record<string, string> = {};

    // First Name
    if (!data.first_name || data.first_name.trim().length === 0) {
        errors.first_name = lang === 'fr' ? 'Le prénom est requis.' : 'الاسم الشخصي مطلوب.';
    } else if (data.first_name.length > 50) {
        errors.first_name = lang === 'fr' ? 'Le prénom ne doit pas dépasser 50 caractères.' : 'الاسم الشخصي يجب ألا يتجاوز 50 حرفًا.';
    }

    // Last Name
    if (!data.last_name || data.last_name.trim().length === 0) {
        errors.last_name = lang === 'fr' ? 'Le nom est requis.' : 'الاسم العائلي مطلوب.';
    } else if (data.last_name.length > 50) {
        errors.last_name = lang === 'fr' ? 'Le nom ne doit pas dépasser 50 caractères.' : 'الاسم العائلي يجب ألا يتجاوز 50 حرفًا.';
    }

    // Phone
    if (!data.phone || data.phone.trim().length === 0) {
        errors.phone = lang === 'fr' ? 'Le numéro de téléphone est requis.' : 'رقم الهاتف مطلوب.';
    } else if (data.phone.length > 20) {
        errors.phone = lang === 'fr' ? 'Le numéro de téléphone est trop long.' : 'رقم الهاتف طويل جدًا.';
    }

    // Email (Optional)
    if (data.email && data.email.trim().length > 0) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.email = lang === 'fr' ? 'Adresse email invalide.' : 'عنوان البريد الإلكتروني غير صالح.';
        }
    }

    // Service
    if (!data.service || data.service.trim().length === 0) {
        errors.service = lang === 'fr' ? 'Le motif de consultation est requis.' : 'سبب الاستشارة مطلوب.';
    } else if (!VALID_SERVICES.includes(data.service)) {
        errors.service = lang === 'fr' ? 'Motif de consultation non valide.' : 'سبب الاستشارة غير صالح.';
    }

    // Message (Optional)
    if (data.message && data.message.length > 500) {
        errors.message = lang === 'fr' ? 'Le message ne doit pas dépasser 500 caractères.' : 'يجب ألا تتجاوز الرسالة 500 حرف.';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}
