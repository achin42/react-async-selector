
import axios from "axios";

module.exports = class SubjectOptionsManager {
    constructor(selectedOptions = [], searchTerm="") {
        this.selectedOptions = selectedOptions == null ? [] : selectedOptions;
        this.hasSelectedInitialOptions = selectedOptions != null;
        this.searchTerm = "";
        this.pagesFetched = 0;
    }

    initiateSelectedOptions(selectedOptions) {
        if(selectedOptions !=  null) {
            this.selectedOptions = selectedOptions
        }

        this.hasSelectedInitialOptions = true
    }

    loadOptions = async (search, prevOptions) => {
        
        if(search != null && search != this.searchTerm) {
            this.pagesFetched = 0;
        }

        this.searchTerm = search;
        const pageToFetch = this.pagesFetched + 1;

        const headers = {
          'app-token':"574616d1ee6f7c43dc05da487e5197cd503c430fd9953364f2bfa60d2070bf3c",
          'language':'en',
          'build-number':'1'
        }
      
        const res = await axios.get('https://uat.ulesson.com/api/v2/content/subjects',{
            params:{
              page:`${pageToFetch}`
            },
            headers: headers
        })
      
        this.pagesFetched = pageToFetch;

        const pageSubjects = res.data.data
        const currentPage = res.data.meta.current_page;
        const lastPage = res.data.meta.last_page;
        const hasMore = currentPage < lastPage
      
        return {
          options: pageSubjects,
          hasMore
        };  
      };
}