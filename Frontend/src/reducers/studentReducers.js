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
  COMPANY_LOGIN,
  STUDENT_REGISTER,
  COMPANY_REGISTER,
  FETCH_COMPANY_PROFILE,
  FETCH_JOB_POSTINGS,
  FETCH_EVENTS,
  REGISTER_STUDENT_EVENT,
  REGISTERED_EVENTS,
  UPCOMING_EVENTS,
  SEARCH_EVENTS,
  EDIT_STUDENT_PROFILE,
  FETCH_ALL_STUDENTS,
  STUDENT_SEARCH_COMP,
  JOB_SEARCH_NAME,
  JOB_SEARCH_NAME_AND_CAT,
  FETCH_PARTICULAR_JOB,
  FETCH_PARTICULAR_COMPANY,
  COMPANY_PROFILEPIC_FILEPATH,
  STUDENT_PROFILE_FILEPATH,
  COMPANY_EVENTS,
  COMPANY_JOBS,
  SEARCH_EVENTS_COMPANY,
  EVENT_REGISTERED_STUDENTS,
  POST_EVENT,
  POST_JOB,
  SEARCH_JOBS_COMPANY,
  COMPANY_JOB_SEARCH_NAME_AND_CAT,
  JOB_APPLIED_STUDENTS,
  UPDATE_COMPANY_PROFILE
} from "../actions/types";

const initialState = {
  studentObject: [],
  studentExperience: [],
  studentEducation: [],
  studentBasicDetails: [],
  companyProfile: [],
  allStudents: [],
  jobPostingsRes: [],
  events: [],
  job: [],
  company: [],
  filePath: [],
  postEvent: [],
  postJob: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENTDETAILS:
      return {
        ...state,
        studentBasicDetails: [].concat(action.payload)
      };
    case STUDENT_SEARCH_COMP:
      return {
        ...state,
        allStudents: [].concat(action.payload)
      };
    case FETCH_ALL_STUDENTS:
      return {
        ...state,
        allStudents: [].concat(action.payload)
      };
    case FETCH_STUDENT:
      return {
        ...state,
        studentObject: [].concat(action.payload)
      };
    case EVENT_REGISTERED_STUDENTS:
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
    case COMPANY_LOGIN:
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
    case COMPANY_REGISTER:
      return {
        ...state,
        signupResponse: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case FETCH_COMPANY_PROFILE:
      return {
        ...state,
        companyProfile: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case FETCH_JOB_POSTINGS:
      return {
        ...state,
        jobPostingsRes: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case REGISTER_STUDENT_EVENT:
      return {
        ...state,
        studentEventsReg: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case REGISTERED_EVENTS:
      return {
        ...state,
        events: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case UPCOMING_EVENTS:
      return {
        ...state,
        events: action.payload

        // studentExperience: [].concat(action.payload)
      };

    case SEARCH_EVENTS:
      return {
        ...state,
        events: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case EDIT_STUDENT_PROFILE:
      return {
        ...state,
        studentProfileUpdate: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case JOB_SEARCH_NAME:
      return {
        ...state,
        jobPostingsRes: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case JOB_SEARCH_NAME_AND_CAT:
      return {
        ...state,
        jobPostingsRes: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case COMPANY_JOB_SEARCH_NAME_AND_CAT:
      return {
        ...state,
        jobPostingsRes: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case FETCH_PARTICULAR_JOB:
      return {
        ...state,
        job: [].concat(action.payload)

        // studentExperience: [].concat(action.payload)
      };
    case FETCH_PARTICULAR_COMPANY:
      return {
        ...state,
        company: [].concat(action.payload)

        // studentExperience: [].concat(action.payload)
      };
    case UPDATE_COMPANY_PROFILE:
      return {
        ...state,
        company: [].concat(action.payload)

        // studentExperience: [].concat(action.payload)
      };
    case STUDENT_PROFILE_FILEPATH:
      return {
        ...state,
        filePath: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case COMPANY_PROFILEPIC_FILEPATH:
      return {
        ...state,
        filePath: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case COMPANY_JOBS:
      return {
        ...state,
        jobPostingsRes: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case COMPANY_EVENTS:
      return {
        ...state,
        events: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case SEARCH_EVENTS_COMPANY:
      return {
        ...state,
        events: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case POST_EVENT:
      return {
        ...state,
        events: action.payload

        // studentExperience: [].concat(action.payload)
      };
    case POST_JOB:
      return {
        ...state,
        jobPostingsRes: [].concat(action.payload)

        // studentExperience: [].concat(action.payload)
      };
    case SEARCH_JOBS_COMPANY:
      return {
        ...state,
        jobPostingsRes: [].concat(action.payload)

        // studentExperience: [].concat(action.payload)
      };
    case JOB_APPLIED_STUDENTS:
      return {
        ...state,
        allStudents: [].concat(action.payload)

        // studentExperience: [].concat(action.payload)
      };
    default:
      return state;
  }
}
