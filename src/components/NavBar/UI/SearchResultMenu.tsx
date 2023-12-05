import { Card, CardContent, Avatar, Typography } from "@mui/material";

interface Data {
    message? : string,
    username: string,
    avatar: string
}

interface SearchBarType{
    searchResult: Data[] | undefined
}

function SearchResultMenu({searchResult}:SearchBarType) {
    if (!searchResult || searchResult.length === 0) {
        return <div>No results found</div>;
    }

    return (
        <div className="absolute border-2 border-gray-300 w-full rounded-xl p-4 bg-gray-50">
            {searchResult.map((item, index) => (
                <Card key={index} className="mb-4">
                    <CardContent className="flex flex-row items-center">
                        <Avatar src={item.avatar} alt={`Avatar of ${item.username}`} className="mr-2" />
                        <Typography variant="body1">{item.username}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default SearchResultMenu