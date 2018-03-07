import { Injectable }    from '@angular/core';
import { ServiceMainLocator } from '../../service-locator-main';


@Injectable()
export class LocatorEditorialService {
	
	constructor(private serviceLocator: ServiceMainLocator){}
	
	    getUrlList(): string{
	        return 'https://api.mockaroo.com/api/generate.json';
	    }


    
    

	



}