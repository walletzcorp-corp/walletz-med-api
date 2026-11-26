export declare enum CnpjSituation {
    NULA = "NULA",
    ATIVA = "ATIVA",
    SUSPENSA = "SUSPENSA",
    INAPTA = "INAPTA",
    BAIXADA = "BAIXADA"
}
export declare class ValidationCnpj {
    cnpjDigits: string;
    LegalName: string;
    tradeName: string;
    status: CnpjSituation;
}
