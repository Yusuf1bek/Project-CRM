export interface ICustomer{
    _id: string;
    fname: string;
    lname: string;
    phone_primary: string;
    budget: number;
    address: string;
    pin: boolean;
    isPaidToday: string;
}
export interface Product {
    _id: number;
    title: string;
    category: string;
    price: number;
    quantity: number;
  } 