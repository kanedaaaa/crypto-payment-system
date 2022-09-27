"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.upsertEmployee = exports.getEmployeeByAddress = exports.getAllEmployees = void 0;
const graphql_tag_1 = require("graphql-tag");
const getAllEmployees = (0, graphql_tag_1.gql) `
    query getAllEmployes {
        employees {
        salaryAmount
        walletAddress
        }
    }
`;
exports.getAllEmployees = getAllEmployees;
const getEmployeeByAddress = (0, graphql_tag_1.gql) `
    query getEmployeeByAddress($address: String!) {
        employees(where: {walletAddress: {_eq: $address}}) {
        salaryAmount
        walletAddress
        }
    }
`;
exports.getEmployeeByAddress = getEmployeeByAddress;
const upsertEmployee = (0, graphql_tag_1.gql) `
    mutation upsertEmployee($address: String!, $amount: numeric!) {
        insert_employees(objects: {salaryAmount: $amount, walletAddress: $address}, on_conflict: {constraint: employees_pkey, update_columns: salaryAmount}) {
        affected_rows
        }
    }
`;
exports.upsertEmployee = upsertEmployee;
const deleteEmployee = (0, graphql_tag_1.gql) `
    mutation deleteEmployee($address: String!) {
        delete_employees(where: {walletAddress: {_eq: $address}}) {
        affected_rows
        }
    }
`;
exports.deleteEmployee = deleteEmployee;
