import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { sendResponse } from '../formats/handler';
import { getUserProfileBasePath, getUserProfileRootPath } from '../routing';
import { toJsonUserProfile } from './user-profile.json';
import { UserProfileService } from './user-profile.service';

@Controller(getUserProfileBasePath())
export class UserProfileController {

    constructor(
        private userProfileService: UserProfileService
    ) { }

    @Get(getUserProfileRootPath())
    async getUserProfile(
        @Res() response: Response
    ) {
        const userProfile = await this.userProfileService.getUserProfile();

        return sendResponse(response, {
            json: toJsonUserProfile(userProfile)
        })
    }
}
