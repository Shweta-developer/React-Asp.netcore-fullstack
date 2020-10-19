import { combineReducers } from "redux";
import { admin } from "./admin";
import { teacher } from "./teacher";
import { user } from "./user";

export const reducers = combineReducers({
    admin,teacher,user
})