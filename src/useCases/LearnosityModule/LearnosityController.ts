import { LearnosityService } from "@providers/learnosity/LearnosityService";
import { Request, Response } from "express";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";
import { v4 as uuidv4 } from "uuid";

@controller("/learnosity")
export class LearnosityController implements interfaces.Controller {
  constructor(private learnosityService: LearnosityService) {}

  @httpGet("/")
  private index(@request() req: Request, @response() res: Response): Response {
    return res.status(200).send({
      message: "Hello learnosity!",
    });
  }

  @httpGet("/init")
  private init(@request() req: Request, @response() res: Response): Response {
    try {
      // generate dummy user id and session id
      const userId = uuidv4();
      const sessionId = uuidv4();

      const request = this.learnosityService.init(userId, "items", {
        activity_template_id: "quickstart_examples_activity_template_001",
        session_id: sessionId,
        activity_id: "quickstart_examples_activity_001",
        rendering_type: "assess",
        type: "submit_practice",
        name: "Items API Quickstart",
        state: "initial",
        config: {
          regions: "main",
        },
      });

      return res.status(200).send({ request });
    } catch (error) {
      console.error(error);
    }
  }
}
