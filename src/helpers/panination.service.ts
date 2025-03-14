import { Injectable } from "@nestjs/common";

@Injectable()
export class PaninationService{

    calcPanination(page: number, limit: number): {skip: number, take: number}{

        page = page > 0 ? page : 1;
        limit = limit> 0 ? limit : 10;

        const skip = (page - 1) * limit;
        const take = limit;
        return{skip,take};
    }

    calcTotalPage(totalItems: number, limit: number): number{
        return Math.ceil(totalItems/limit);
    }

    nextPage(page: number, totalPage: number): number{
        return page < totalPage ? page +1 : totalPage;
    }

    prevPage(page: number): number{
        return page > 1 ? page - 1 : 1;
    }
}