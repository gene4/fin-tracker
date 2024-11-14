export type Category = {
    id: string;
    name: string;
};

export type Expanse = {
    id: string;
    amount: number;
    name: string;
    category: string;
    date: Date;
    is_recurring: boolean;
    user_id: string;
};
