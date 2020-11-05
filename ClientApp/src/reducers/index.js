import { combineReducers } from "redux";
import { admin } from "./admin";
import { teacher } from "./teacher";
import { student } from "./student";
import { user } from "./user";
import { classes } from "./classes";
import { teacherclasses } from "./teacherclasses";
import { schoolyears } from "./schoolyears";

export const reducers = combineReducers({
    admin, teacher, user, classes, teacherclasses, schoolyears,student
})