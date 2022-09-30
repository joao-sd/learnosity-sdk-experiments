import { appEnv } from "@constants/appEnv";
import { provide } from "inversify-binding-decorators";

import Learnosity from "learnosity-sdk-nodejs";
import {
  ILearnosityResponse,
  ILearnositySecurityCredentials,
  LearnosityAvailableAPIs,
  LearnosityDataActions,
  LearnosityRequestTypes,
} from "./LearnosityService.types";

const DEFAULT_SECURITY_CREDENTIALS = {
  consumer_key: appEnv.learnosity.consumerKey,
  domain: appEnv.learnosity.domain,
};

@provide(LearnosityService)
export class LearnosityService {
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
