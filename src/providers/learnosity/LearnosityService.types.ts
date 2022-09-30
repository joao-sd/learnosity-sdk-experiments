export interface ILearnosityInitConfig {
  regions: string;
}

export type LearnosityInitStates = "initial" | "resume" | "review";
export type LearnosityRenderingType = "assess" | "inline";
export type LearnosityStudentResponseStorageType = "submit_practice" | "local_practice";
export type LearnosityAvailableAPIs = "assess" | "author" | "data" | "events" | "items" | "questions" | "reports";
export type LearnosityDataActions = "get" | "set" | "update" | "delete";

export interface ILearnositySecurityCredentials {
  consumer_key: string;
  domain: string;
  user_id?: string;
  timestamp?: string; // optional, SDK will generate this for you
}

// Request types

export interface ILearnosityActivityRequestPayload {
  activity_template_id: string;
  session_id: string;
  activity_id: string;
  rendering_type: LearnosityRenderingType;
  type: LearnosityStudentResponseStorageType;
  name: string;
  state: LearnosityInitStates;
  config: ILearnosityInitConfig;
}

interface ILearnosityQuestion {
  response_id: string;
  type: string;
  stimulus: string;
  stimulus_list: string[];
  possible_responses: string[];
  validation: {
    score: number;
    value: string[];
  };
}

export interface ILearnosityQuestionRequestPayload {
  type: LearnosityStudentResponseStorageType;
  state: LearnosityInitStates;
  questions: ILearnosityQuestion[];
}

export interface ILearnosityDataRequestPayload {
  references: string[];
}
