import {
  FETCH_STUDENTDETAILS,
  FETCH_EDUCATION,
  FETCH_WORKEXP,
  FETCH_STUDENT,
  EDIT_MYJOURNEY,
  EDIT_MYSKILLS,
  EDIT_CONTACTDETAILS,
  EDIT_MYEDU,
  EDIT_MYWORK,
  ADD_EDU,
  ADD_WORK,
  REMOVE_MYEDU,
  REMOVE_MYWORK,
  EDIT_PERSONALINFO,
  LOGIN,
  STUDENT_REGISTER
} from "../actions/types";

const initialState = {
  studentObject: [],
  studentExperience: [],
  studentEducation: [],
  studentBasicDetails: []
  // isExpSaveEnabled: false,
  // isEduSaveEnabled: false,
  // isObjSaveEnabled: false,
  // isContactSaveEnabled: false,
  // isSkillsSaveEnabled: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENTDETAILS:
      return {
        ...state,
        studentBasicDetails: [].concat(action.payload)
      };
    case FETCH_STUDENT:
      return {
        ...state,
        studentObject: [].concat(action.payload)
      };
    case FETCH_EDUCATION:
      return {
        ...state,
        studentEducation: [].concat(action.payload)
      };
    case FETCH_WORKEXP:
      return {
        ...state,
        studentExperience: [].concat(action.payload)
      };
    case EDIT_MYJOURNEY:
      return {
        ...state
        // studentBasicDetails: [].concat(action.payload)
      };
    case EDIT_MYSKILLS:
      return {
        ...state
        // studentObject: [].concat(action.payload)
      };
    case EDIT_CONTACTDETAILS:
      return {
        ...state
        // studentEducation: [].concat(action.payload)
      };
    case EDIT_MYEDU:
      return {
        ...state
        // studentExperience: [].concat(action.payload)
      };
    case EDIT_MYWORK:
      return {
        ...state
        // studentBasicDetails: [].concat(action.payload)
      };
    case ADD_EDU:
      return {
        ...state
        // studentObject: [].concat(action.payload)
      };
    case ADD_WORK:
      return {
        ...state
        // studentEducation: [].concat(action.payload)
      };
    case REMOVE_MYEDU:
      return {
        ...state
        // studentExperience: [].concat(action.payload)
      };
    case REMOVE_MYWORK:
      return {
        ...state
        // studentEducation: [].concat(action.payload)
      };
    case EDIT_PERSONALINFO:
      return {
        ...state
        // studentExperience: [].concat(action.payload)
      };
    case LOGIN:
      return {
        ...state,
        loginResponse: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case STUDENT_REGISTER:
      return {
        ...state,
        signupResponse: action.payload

        // studentExperience: [].concat(action.payload)
      };

    default:
      return state;
  }
}
