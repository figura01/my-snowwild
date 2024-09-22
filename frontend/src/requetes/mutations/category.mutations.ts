import { gql } from "@apollo/client";

export const CREATE_CATEGORY_ADMIN = gql`
mutation CreateCategory($data: CreateCategoryInput!) {
  createCategory(data: $data) {
    id
    name
  }
}
`