import { auth } from "./index";
import { Request, Response, NextFunction } from "express";

describe("auth", () => {
  it("returns unauthorized when user is not authenticated", () => {
    const req = {
      headers: {
        authorization: undefined,
      },
    } as Partial<Request>; // Using Partial<Request> for a partial mock
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response; // Using unknown and type assertion to mock Response
    const next = jest.fn() as unknown as NextFunction; // Using unknown and type assertion to mock NextFunction
    auth(req as Request, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });
});
