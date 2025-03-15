export interface Product {
    id: number;
    name: string;
    description?: string;
    date: string;
    status: 'inicial' | 'pendiente' | 'completado';
  }
  