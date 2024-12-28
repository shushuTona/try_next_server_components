type GetToken = {
    token: string
}

const getTokne = async (): Promise<GetToken> => {
    const res = await fetch('http://backend:8080/api/getcsrftoken', {cache: 'no-store'})
    return res.json();
}

export { getTokne }
