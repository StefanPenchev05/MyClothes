import { Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SearchResultMenuType {
  searchResult: UserType[] | undefined;
}

function SearchResultMenu({ searchResult }: SearchResultMenuType) {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        {Array.isArray(searchResult) ? (
          searchResult.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() =>
                navigate(`user/profile/${item.id}`, {
                  state: { avatar: item.avatar },
                })
              }
            >
              <Avatar
                src={item.avatar}
                alt={`Avatar of ${item.firstName} ${item.lastName}`}
                className="mr-2"
              />
              <Typography variant="body1">
                {item.firstName} {item.lastName}
              </Typography>
            </div>
          ))
        ) : (
          <div className="flex flex-row justify-center items-center">
            <Typography variant="body1">No results</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultMenu;