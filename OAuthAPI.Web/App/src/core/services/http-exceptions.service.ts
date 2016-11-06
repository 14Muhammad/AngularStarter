import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response} from "@angular/http";
import {BadTokenRequest} from "../models/bad-token-request";
import {BadRequest} from "../models/bad-request";

@Injectable()
export class HttpExceptionService{

    public handleError (res: Response) {
        //TODO: add logging here

        const error = new Error(res.statusText);
        error['response'] = res;

        switch (res.status){
            case 400:
                return this.handleBadRequest(res);
            case 500:
                return this.handleInternalServerError(res);
            default:
                Observable.throw(["an Unhandled error occured"])
        }
    }

    public handleInternalServerError(res: Response){
        console.log(res);

        return Observable.throw(res);
    }
    public handleTokenBadRequest(res: Response) {
        let badRequest = res.json() as BadTokenRequest;
        let error = badRequest.error_description;

        //need to put it in an array since that's what's expected everywhere to kee pit consistant
        return Observable.throw([error])
    }

    private handleBadRequest(res: Response) {
        let badRequest = res.json() as BadRequest;
        let errors = badRequest.modelState[""];

        return Observable.throw(errors)
    }
}