import { gql } from "graphql-tag";

const getAllEmployees = gql`
    query getAllEmployes {
        employees {
        salaryAmount
        walletAddress
        }
    }
`

const getEmployeeByAddress = gql`
    query getEmployeeByAddress($address: String!) {
        employees(where: {walletAddress: {_eq: $address}}) {
        salaryAmount
        walletAddress
        }
    }
`

const upsertEmployee = gql`
    mutation upsertEmployee($address: String!, $amount: numeric!) {
        insert_employees(objects: {salaryAmount: $amount, walletAddress: $address}, on_conflict: {constraint: employees_pkey, update_columns: salaryAmount}) {
        affected_rows
        }
    }
`

const deleteEmployee = gql`
    mutation deleteEmployee($address: String!) {
        delete_employees(where: {walletAddress: {_eq: $address}}) {
        affected_rows
        }
    }
`

export { getAllEmployees, getEmployeeByAddress, upsertEmployee, deleteEmployee }