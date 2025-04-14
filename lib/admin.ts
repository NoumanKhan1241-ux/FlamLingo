import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2vbj4WMjHz4RR7wBmkqARZHVqmU",
    "user_2uXtf7TF4WghovvBYFJuYAdAwYt"

]

export const getIsAdmin = async () => {
    const {userId} = await auth();
    if(!userId){
        return false;
    }

    return adminIds.indexOf(userId) !== -1
}