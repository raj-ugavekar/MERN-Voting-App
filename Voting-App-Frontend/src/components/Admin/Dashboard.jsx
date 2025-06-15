import VoteDetails from "./Pages/VoteDetails";
import UserVoteDetails from "./Pages/UserVoteDetails";

function Dashboard(){

    return <>
    <div className="flex flex-col gap-4">
        <VoteDetails />
        <UserVoteDetails />
    </div>
    </>
}

export default Dashboard