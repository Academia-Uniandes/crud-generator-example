import { Injectable }    from '@angular/core';
import { ServiceMainLocator } from '../../service-locator-main';
import { CREATEREVIEW,UPDATEREVIEW,GETREVIEW,SEARCHREVIEW,TOTALNUMREVIEW,DELETEREVIEW, BASE_URL } from './urlService'

@Injectable()
export class LocatorReviewService {
	
	constructor(private serviceLocator: ServiceMainLocator){}
	
	    getUrlList(): string{
	        return this.getHost() + BASE_URL + SEARCHREVIEW;
	    }        

	    getUrlCreate(): string{
return this.getHost() + BASE_URL + CREATEREVIEW;
	    }

	    getUrlUpdate(): string{
return this.getHost() + BASE_URL + UPDATEREVIEW;
	    }
    
	    getUrlGetItem(): string{
return this.getHost() + BASE_URL + GETREVIEW;
	    }
    

	    getUrlListNum(): string{
return this.getHost() + BASE_URL + TOTALNUMREVIEW;
	    }
	
	    getUrlDeleteItem(): string{
return this.getHost() + BASE_URL + DELETEREVIEW;
	    }

	    public getHost(): string{
	        let host = this.serviceLocator.getHost();
	        return host;
	    }


}