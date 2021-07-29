import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export function handleNotAcceptable(
    response: Response
) {
    return response
        .status(HttpStatus.NOT_ACCEPTABLE)
        .send();
}

export function handleNotFound(response: Response) {
    return response
        .status(HttpStatus.NOT_FOUND)
        .send();
}

export function handleInternalServerError(response: Response) {
    return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send();
}