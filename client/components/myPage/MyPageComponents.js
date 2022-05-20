
import MyBooks from "./MyBooks"
import MyLists from "./MyLists"
import MyDiscussions from "./MyDiscussions"

export default function MyPageComponents({ pageContent, userId }) {
    //console.log(pageContent)
    return (<div className="myPageContainer">
        <MyLists/>
        <MyBooks userId={userId} owned_books={pageContent.books_owned}/>
        <MyDiscussions userId={userId} discussions_owned={pageContent.discussions_owned}/>
        </div>)
}