import { appEnv } from "@constants/appEnv";
import { provide } from "inversify-binding-decorators";

import Learnosity from "learnosity-sdk-nodejs";
import {
  ILearnosityInitConfig,
  ILearnosityResponse,
  ILearnositySecurityCredentials,
  LearnosityAvailableAPIs,
  LearnosityDataActions,
  LearnosityInitStates,
  LearnosityRenderingType,
  LearnosityRequestTypes,
} from "./LearnosityService.types";

const DEFAULT_SECURITY_CREDENTIALS = {
  consumer_key: appEnv.learnosity.consumerKey,
  domain: appEnv.learnosity.domain,
};

@provide(LearnosityService)
export class LearnosityService {
  /**
   * Initialize Learnosity API
   * @param  {string} userId - unique student identifier. Note: we never send or save student's names or other personally identifiable information in these requests. The unique identifier should be used to look up the entry in a database of students accessible within your system only
   * @param  {string} sessionId - uniquely identifies this specific assessment attempt for save/resume, data retrieval and reporting purposes. Here, we're using the Uuid helper to auto-generate a unique session id.
   * @param  {string} activityTemplateId - reference of the Activity to retrieve from the Item bank. The Activity defines which Items will be served in this assessment.
   * @param  {string} activityId - a string you define, used solely for analytics to allow you run reporting and compare results of users submitting the same assessment.
   * @param  {LearnosityRenderingType} renderingType - selects a rendering mode, assess mode is a "standalone" mode (loading a complete assessment player for navigation, as opposed to inline for embedding without).
   * @param {LearnosityStudentResponseStorageType} studentResponseStorageType -  selects the context for the student response storage. submit_practice mode means the student responses will be stored in the Learnosity cloud, allowing for grading and review.
   * @param {string} name: human-friendly display name to be shown in reporting, via Reports API and Data API.
   * @param {LearnosityInitStates} state - Optional. Can be set to initial, resume or review. initial is the default.
   * @param {ILearnosityInitConfig} config - Optional. A set of config values that can override the Activity configuration. For a full list of overridable configuration options, visit the Activities developer docs.
   * @param {ILearnositySecurityCredentials} securityCredentials: An object^ that includes your consumer_key but does not include your secret. T
   * @param {LearnosityDataActions} dataAction: An optional string used only if integrating with the Data API.
   * @return void
   */

  public init(
    userId: string,
    accessApi: LearnosityAvailableAPIs,
    requestPayload: LearnosityRequestTypes,
    securityCredentials: ILearnositySecurityCredentials = { ...DEFAULT_SECURITY_CREDENTIALS, user_id: userId },
    dataAction?: LearnosityDataActions
  ): ILearnosityResponse {
    const learnositySdk = new Learnosity(); // Instantiate the SDK

    return learnositySdk.init(
      accessApi,
      securityCredentials,
      appEnv.learnosity.consumerSecret,
      requestPayload,
      dataAction
    );
  }
}
