export class UrlService {
    
    static setPreviousUrl(url: string) {
        localStorage.setItem('previous-url', url);
    }

    static getPreviousUrl() {
        const previous = localStorage.getItem('previous-url');
        return previous === 'null' ? null : previous;
    }

}