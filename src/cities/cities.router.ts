import express from 'express';
import { Request, Response } from "express-serve-static-core";
import { body, param, validationResult } from "express-validator";
import { City } from "./cities.model";
import { create, update } from "./cities.service";
