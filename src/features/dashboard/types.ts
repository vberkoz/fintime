export type Card = {
  title: string;
  valueCaption1: string;
  value1: string;
  valueCaption2: string;
  value2: string;
}

export type Expense = {
  name: string;
  value: number;
  category: string;
}

export type Incomes = {
  name: string;
  value: number;
  category: string;
}

export type TimeCategory = {
  name: string;
  value: number;
  color: string;
}

export type Activity = {
  date: string;
  amount: number;
  category: string;
}

export type Deadline = {
  date: string;
  description: string;
  status: string;
}