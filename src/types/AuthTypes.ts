export interface Login {
    email: string;
    password: string;
}

export interface Verification {
    email: string;
    code: string;
}

export interface RegisterForm {
    name: string;
    password: string;
    phone_number: string;
}