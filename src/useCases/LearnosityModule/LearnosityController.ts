import { Request, Response } from "express";
import { controller, httpGet, interfaces, request, response } from "inversify-express-utils";

@controller("/learnosity")
export class LearnosityController implements interfaces.Controller {
  constructor() {}

  @httpGet("/init")
  private init(@request() req: Request, @response() res: Response): Response {
    return res.status(200).send({
      message: "Learnosity init",
    });
  }
}
