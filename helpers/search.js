module.exports = (query) => {
    let objectSearch = {
        keyword : "",
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }

    return objectSearch;
}

// trả về 1 object gồm keyword và title
// query = req.query