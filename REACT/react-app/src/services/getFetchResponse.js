export default function getFetchResponse ( APIurl ) {
    return fetch(APIurl)
            .then(res => res.json())
            .then(response => {
                return response
            }).catch(err => { console.log(err) });
}

