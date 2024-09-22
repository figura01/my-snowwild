export interface RegisterInput{
    firstName: String!;
    lastName: String!;
    email: String!;
    password: String!;
    phone: String!;
}

export interface InputLogin{
    email: String!; 
    password: String!; 
}