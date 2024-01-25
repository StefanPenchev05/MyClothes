import { Card, CardContent, Avatar, Typography } from "@mui/material";

interface Data {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

interface SearchBarType{
    searchResult: Data[] | undefined
}

function SearchResultMenu({searchResult}:SearchBarType) {

    const visitProfilePage = (userID: string) => {
        window.location.href = `/user/profile/${userID}`
    }

    return (
        <div className="absolute border-2 border-gray-300 w-full rounded-xl p-4 bg-gray-50">
           {Array.isArray(searchResult) ? (
             searchResult.map((item, index) => (
                console.log(item),
                <Card key={index} className="mb-4" onClick={() => visitProfilePage(item.id)}>
                    <CardContent className="flex flex-row items-center">
                        <Avatar src={item.avatar} alt={`Avatar of ${item.firstName} ${item.lastName}`} className="mr-2" />
                        <Typography variant="body1">{item.firstName} {item.lastName}</Typography>
                    </CardContent>
                </Card>
             ))
            ) : (
                <div className="flex flex-row justify-center items-center">
                    <Typography variant="body1">No results</Typography>
                </div>  
            )}
        </div>
    )
}

export default SearchResultMenu