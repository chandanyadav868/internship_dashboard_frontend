
class ApiClass {
    url: string = '';
    headers: Headers | Record<string, string> = {};
    constructor(url?: string) {
        this.url = url??'http://localhost:3000';
        this.headers = { "Content-Type": "application/json" };
    }

    async get(url: string) {
        const response = await fetch(`${this.url}${url}`, {
            credentials: "include",
            method: "GET",
            headers: {
                ...this.headers
            }
        });
        const responseJson = await response.json();

        // if got as i want then return that data
        if (response.status === 200) {
            return responseJson
        }

        // otherwise throw that json because it is holding error object
        throw new Error(JSON.stringify(responseJson))

    }

    async delete(url: string) {
        const response = await fetch(`${this.url}${url}`, {
            credentials: "include",
            method: "DELETE",
            headers: {
                ...this.headers
            }
        });
        const responseJson = await response.json();

        // if got as i want then return that data
        if (response.status === 200) {
            return responseJson
        }

        // otherwise throw that json because it is holding error object
        throw new Error(JSON.stringify(responseJson))
    }

    async post(givenPart: string,body:Record<string,any>) {
        const urlLi = `${this.url}${givenPart}`;
        console.log("urlLi:- ",urlLi);
        
        const response = await fetch(urlLi, {
            credentials: "include",
            method: "POST",
            headers: {
                ...this.headers
            },
            body:JSON.stringify(body)
        });
        
        const responseJson = await response.json();        

        // if got as i want then return that data
        if (response.status === 200) {
            return responseJson
        }

        console.log(responseJson);
        
        // otherwise throw that json because it is holding error object
        throw new Error(JSON.stringify(responseJson))

    }
    async put(givenPart: string,body:Record<string,any>) {
        const urlLi = `${this.url}${givenPart}`;
        console.log("urlLi:- ",urlLi);
        
        const response = await fetch(urlLi, {
            credentials: "include",
            method: "PUT",
            headers: {
                ...this.headers
            },
            body:JSON.stringify(body)
        });
        
        const responseJson = await response.json();        

        // if got as i want then return that data
        if (response.status === 200) {
            return responseJson
        }

        console.log(responseJson);
        
        // otherwise throw that json because it is holding error object
        throw new Error(JSON.stringify(responseJson))

    }
}

export const apiClass = new ApiClass()