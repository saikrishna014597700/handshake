import { SAVE_EXPERIENCE,FETCH_PROFILE, SAVE_EDUCATION, SAVE_STUD_OBJECT} from "../constants/action-types";

const initiaState = {
              studentObject : [],
              studentExperience:[],
              stduentEducation:[],
              isExpSaveEnabled : false,
              isEduSaveEnabled:false,
              isObjSaveEnabled:false,
              isContactSaveEnabled : false,
              isSkillsSaveEnabled :false
  }
export default function profileReducer(state = initiaState, action){
    switch(action.type){
         case FETCH_PROFILE:
            return {
                ...state,
                studentObject: [].concat(action.payload.studentObject),
                studentExperience: [].concat(action.payload.studentExperience),
               stduentEducation : [].concat(action.payload.stduentEducation)
            };
        case SAVE_EDUCATION:
            return {
                ...state
            };
        case SAVE_EXPERIENCE:
            return {
                ...state
            };
        case SAVE_STUD_OBJECT:
            return{
                ...state
            };

        default:
            return state;
    }
}