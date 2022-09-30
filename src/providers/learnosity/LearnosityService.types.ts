//! These types follow the Learnosity SDK documentation: https://github.com/Learnosity/learnosity-sdk-nodejs/blob/master/REFERENCE.md#init-arguments

export interface ILearnosityInitConfig {
  [key: string]: any;
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
  activity_template_id: string; // reference of the Activity to retrieve from the Item bank. The Activity defines which Items will be served in this assessment.
  session_id: string; // uniquely identifies this specific assessment attempt for save/resume, data retrieval and reporting purposes. Here, we're using the Uuid helper to auto-generate a unique session id.
  activity_id: string; // a string you define, used solely for analytics to allow you run reporting and compare results of users submitting the same assessment.
  rendering_type: LearnosityRenderingType; // selects a rendering mode, assess mode is a "standalone" mode (loading a complete assessment player for navigation, as opposed to inline for embedding without).
  type: LearnosityStudentResponseStorageType; // selects the context for the student response storage. submit_practice mode means the student responses will be stored in the Learnosity cloud, allowing for grading and review.
  name: string; // human-friendly display name to be shown in reporting, via Reports API and Data API.
  state?: LearnosityInitStates; // - Optional. Can be set to initial, resume or review. initial is the default.
  config?: ILearnosityInitConfig; // Optional. A set of config values that can override the Activity configuration. For a full list of overridable configuration options, visit the Activities developer docs.
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

export type LearnosityRequestTypes =
  | ILearnosityDataRequestPayload
  | ILearnosityQuestionRequestPayload
  | ILearnosityActivityRequestPayload;

export interface ILearnosityResponse {
  request: ILearnosityResponseRequest;
}

export interface ILearnosityResponseRequest {
  security: ILearnosityRequestResponseSecurity;
  request: Record<string, unknown>;
}

export interface ILearnosityRequestResponseSecurity {
  consumer_key: string;
  domain: string;
  user_id: string;
  timestamp: string;
  signature: string;
}
